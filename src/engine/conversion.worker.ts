// @ts-nocheck
/**
 * @file conversion.worker.ts
 * Format-agnostic Web Worker — imported via Vite's `?worker` syntax.
 *
 * Responsibilities:
 * 1. Decode the transferred ArrayBuffer back to a JSON string.
 * 2. Parse the JSON string.
 * 3. Select the appropriate strategy by format.
 * 4. Optionally delegate to WASM bridge for huge payloads.
 * 5. Post back a typed WorkerResponse.
 *
 * Adding a new format = add a new strategy to the registry below. Zero other changes.
 */

import type { WorkerRequest, WorkerResponse } from "./types";
import type { ConversionStrategy } from "./ConversionStrategy";

// -------------------------------------------------------------------------
// Strategy registry — OCP: add new strategies here without touching the rest
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// Strategy loader — dynamically imports to support code splitting
// -------------------------------------------------------------------------
const loadStrategy = async (format: string): Promise<ConversionStrategy | null> => {
  switch (format) {
    case "csv":
      return new (await import("./strategies/CsvStrategy")).CsvStrategy();
    case "xml":
      return new (await import("./strategies/XmlStrategy")).XmlStrategy();
    case "toon":
      return new (await import("./strategies/ToonStrategy")).ToonStrategy();
    case "json-pretty":
      return new (await import("./strategies/JsonPrettyStrategy")).JsonPrettyStrategy();
    case "json-minify":
      return new (await import("./strategies/JsonPrettyStrategy")).JsonMinifyStrategy();
    case "yaml":
      return new (await import("./strategies/YamlStrategy")).YamlStrategy();
    case "toml":
      return new (await import("./strategies/TomlStrategy")).TomlStrategy();
    case "graphql":
      return new (await import("./strategies/GraphqlStrategy")).GraphqlStrategy();
    case "markdown":
      return new (await import("./strategies/MarkdownStrategy")).MarkdownStrategy();
    default:
      return null;
  }
};

// -------------------------------------------------------------------------
// Message handler
// -------------------------------------------------------------------------

self.onmessage = async (event: MessageEvent<WorkerRequest>) => {
  const { id, format, payloadBuffer, options, useWasm } = event.data;

  const post = (msg: WorkerResponse) => self.postMessage(msg);

  try {
    // 1. Decode Transferable → string
    const decoder    = new TextDecoder();
    const jsonString = decoder.decode(payloadBuffer);

    // 2. Parse
    let parsedData: unknown;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (e) {
      post({ type: "error", id, message: `Invalid JSON: ${e instanceof Error ? e.message : String(e)}` });
      return;
    }

    // Progress: parsing done (10%)
    post({ type: "progress", id, percent: 10 });

    // 3. WASM path — only when explicitly requested.
    //    Do NOT force yaml/toml here: the wasm-bindgen output references `window`
    //    at module level which crashes the worker before the catch can fire.
    if (useWasm) {
      try {
        // Lazy-load WASM module (same lazy singleton as main thread)
        const { getWasmEngine } = await import("./wasmBridge");
        const wasm = await getWasmEngine();

        post({ type: "progress", id, percent: 50 });

        let output: string;
        if (format === "json-pretty") {
          const prettyOpts = options as { indent?: number };
          output = wasm.pretty_print_json(jsonString, prettyOpts?.indent ?? 2);
        } else if (format === "yaml") {
          output = wasm.json_to_yaml(jsonString);
        } else if (format === "toml") {
          output = wasm.json_to_toml(jsonString);
        } else {
          output = wasm.minify_json(jsonString);
        }

        post({ type: "progress", id, percent: 100 });
        post({ type: "result", id, output });
        return;
      } catch (err) {
        // WASM not available or error — fall through to JS strategy
        console.warn("WASM acceleration unavailable for %s, falling back to JS. Reason:", format, err);
      }
    }

    // 4. JS strategy path
    const strategy = await loadStrategy(format);
    if (!strategy) {
      post({ type: "error", id, message: `Unknown format: ${format}` });
      return;
    }

    post({ type: "progress", id, percent: 50 });
    
    const result = strategy.convert(parsedData, options as unknown);

    post({ type: "progress", id, percent: 100 });

    if (result.ok) {
      post({ type: "result", id, output: result.output });
    } else {
      post({ type: "error", id, message: result.error });
    }
  } catch (e) {
    post({
      type: "error",
      id,
      message: `Unexpected worker error: ${e instanceof Error ? e.message : String(e)}`,
    });
  }
};
