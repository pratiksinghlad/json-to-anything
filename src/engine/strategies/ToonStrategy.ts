/**
 * @file strategies/ToonStrategy.ts
 * Adapts the existing jsonToToon utility as a ConversionStrategy.
 */

import type { ConversionStrategy } from "../ConversionStrategy";
import type { ToonConversionOptions, ConversionResult } from "../types";
import { jsonToToon } from "../../utils/jsonToToon";

export class ToonStrategy implements ConversionStrategy<ToonConversionOptions> {
  readonly format = "toon" as const;

  convert(data: unknown, options: ToonConversionOptions): ConversionResult {
    try {
      const result = jsonToToon(data, options);
      return result.success
        ? { ok: true, output: result.output }
        : { ok: false, error: result.error };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
}
