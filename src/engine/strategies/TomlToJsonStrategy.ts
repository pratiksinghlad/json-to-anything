import type { ConversionStrategy } from "../ConversionStrategy";
import type { TomlToJsonOptions, ConversionResult } from "../types";
import { parse } from "smol-toml";

export class TomlToJsonStrategy implements ConversionStrategy<TomlToJsonOptions> {
  readonly format = "toml-to-json" as const;

  convert(data: unknown): ConversionResult {
    try {
      if (typeof data !== "string") {
        return { ok: false, error: "TOML to JSON conversion requires string input." };
      }

      const parsed = parse(data);

      return { 
        ok: true, 
        output: JSON.stringify(parsed, null, 2)
      };
    } catch (e) {
      return { ok: false, error: `TOML parsing error: ${e instanceof Error ? e.message : String(e)}` };
    }
  }
}
