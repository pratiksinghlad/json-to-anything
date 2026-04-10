import type { ConversionStrategy } from "../ConversionStrategy";
import type { ConversionResult } from "../types";
import yaml from "js-yaml";

export class YamlStrategy implements ConversionStrategy {
  readonly format = "yaml";

  convert(data: unknown): ConversionResult {
    try {
      if (typeof data !== "object" || data === null) {
        return { ok: false, error: "YAML conversion requires a JSON object or array as root." };
      }
      
      const output = yaml.dump(data, {
        indent: 2,
        lineWidth: -1, // Do not wrap lines
        noRefs: true,  // Don't use YAML aliases
      });
      
      return { ok: true, output };
    } catch (e) {
      return {
        ok: false,
        error: `YAML generation error: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}
