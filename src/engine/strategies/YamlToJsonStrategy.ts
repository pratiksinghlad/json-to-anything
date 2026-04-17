import type { ConversionStrategy } from "../ConversionStrategy";
import type { YamlToJsonOptions, ConversionResult } from "../types";
import yaml from "js-yaml";

export class YamlToJsonStrategy implements ConversionStrategy<YamlToJsonOptions> {
  readonly format = "yaml-to-json" as const;

  convert(data: unknown): ConversionResult {
    try {
      if (typeof data !== "string") {
        return { ok: false, error: "YAML to JSON conversion requires string input." };
      }

      const parsed = yaml.load(data, { schema: yaml.JSON_SCHEMA });
      
      if (parsed === undefined) {
        return { ok: true, output: "{}" };
      }

      return { 
        ok: true, 
        output: JSON.stringify(parsed, null, 2)
      };
    } catch (e) {
      return { ok: false, error: `YAML parsing error: ${e instanceof Error ? e.message : String(e)}` };
    }
  }
}
