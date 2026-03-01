/**
 * @file strategies/CsvStrategy.ts
 * Adapts the existing jsonToCsv utility as a ConversionStrategy.
 * DRY: no logic is duplicated — this is a thin wrapper only.
 */

import type { ConversionStrategy } from "../ConversionStrategy";
import type { CsvConversionOptions, ConversionResult } from "../types";
import { jsonToCsv } from "../../utils/jsonToCsv";

export class CsvStrategy implements ConversionStrategy<CsvConversionOptions> {
  readonly format = "csv" as const;

  convert(data: unknown, options: CsvConversionOptions): ConversionResult {
    try {
      // Normalise input: jsonToCsv expects Record<string, unknown>[]
      let rows: Record<string, unknown>[];

      if (Array.isArray(data)) {
        rows = data as Record<string, unknown>[];
      } else if (data !== null && typeof data === "object") {
        rows = [data as Record<string, unknown>];
      } else {
        return { ok: false, error: "CSV conversion requires an object or array of objects." };
      }

      if (rows.length === 0) {
        return { ok: false, error: "Input array is empty." };
      }

      const output = jsonToCsv(rows, options);
      return { ok: true, output };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
}
