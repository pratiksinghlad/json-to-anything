/**
 * @file strategies/JsonPrettyStrategy.ts
 * Implements pretty-print and minify as ConversionStrategy.
 * These are the primary candidates for WASM acceleration on large payloads.
 */

import type { ConversionStrategy } from "../ConversionStrategy";
import type { ConversionResult, JsonMinifyOptions, JsonPrettyOptions } from "../types";

export class JsonPrettyStrategy implements ConversionStrategy<JsonPrettyOptions> {
  readonly format = "json-pretty" as const;

  convert(data: unknown, options: JsonPrettyOptions): ConversionResult {
    try {
      const indent = options?.indent === "tab" ? "\t" : (options?.indent ?? 2);
      const output = JSON.stringify(data, null, indent);
      return { ok: true, output };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
}

export class JsonMinifyStrategy implements ConversionStrategy<JsonMinifyOptions> {
  readonly format = "json-minify" as const;

  convert(data: unknown): ConversionResult {
    try {
      const output = JSON.stringify(data);
      return { ok: true, output };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
}
