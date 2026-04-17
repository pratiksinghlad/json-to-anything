import type { ConversionStrategy } from "../ConversionStrategy";
import type { CsvToJsonOptions, ConversionResult } from "../types";
import { csvToJson } from "../../utils/csvToJson";

export class CsvToJsonStrategy implements ConversionStrategy<CsvToJsonOptions> {
  readonly format = "csv-to-json" as const;

  convert(data: unknown, options: CsvToJsonOptions): ConversionResult {
    try {
      if (typeof data !== "string") {
        return { ok: false, error: "CSV to JSON conversion requires string input." };
      }

      const result = csvToJson(data, {
        delimiter: options?.delimiter || ",",
        hasHeader: options?.hasHeader !== false,
        outputType: options?.outputType || "array"
      });

      if (!result.ok) {
        return { ok: false, error: result.error || "Unknown CSV parsing error" };
      }

      return { 
        ok: true, 
        output: options?.outputType === "lines" 
          ? (result.output as string[]).join("\n")
          : JSON.stringify(result.output, null, 2)
      };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
}
