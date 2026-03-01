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
import { CsvStrategy }       from "./strategies/CsvStrategy";
import { XmlStrategy }       from "./strategies/XmlStrategy";
import { ToonStrategy }      from "./strategies/ToonStrategy";
import { JsonPrettyStrategy, JsonMinifyStrategy } from "./strategies/JsonPrettyStrategy";

// -------------------------------------------------------------------------
// Strategy registry — OCP: add new strategies here without touching the rest
// -------------------------------------------------------------------------
const STRATEGY_REGISTRY = {
  csv:          new CsvStrategy(),
  xml:          new XmlStrategy(),
  toon:         new ToonStrategy(),
  "json-pretty": new JsonPrettyStrategy(),
  "json-minify": new JsonMinifyStrategy(),
} as const;

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

    // 3. WASM path for json-pretty / json-minify on huge payloads
    if (useWasm && (format === "json-pretty" || format === "json-minify")) {
      try {
        // Lazy-load WASM module (same lazy singleton as main thread)
        const { getWasmEngine } = await import("./wasmBridge");
        const wasm = await getWasmEngine();

        post({ type: "progress", id, percent: 50 });

        let output: string;
        if (format === "json-pretty") {
          const prettyOpts = options as { indent?: number };
          output = wasm.pretty_print_json(jsonString, prettyOpts?.indent ?? 2);
        } else {
          output = wasm.minify_json(jsonString);
        }

        post({ type: "progress", id, percent: 100 });
        post({ type: "result", id, output });
        return;
      } catch {
        // WASM not available (not compiled yet) — fall through to JS strategy
      }
    }

    // 4. JS strategy path
    const strategy = STRATEGY_REGISTRY[format as keyof typeof STRATEGY_REGISTRY];
    if (!strategy) {
      post({ type: "error", id, message: `Unknown format: ${format}` });
      return;
    }

    post({ type: "progress", id, percent: 50 });

    const result = strategy.convert(parsedData, options as any);

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
