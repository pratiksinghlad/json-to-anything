import type { ConversionStrategy } from "../ConversionStrategy";
import type { ConversionResult } from "../types";
import { stringify } from "smol-toml";

export class TomlStrategy implements ConversionStrategy {
  readonly format = "toml";

  convert(data: unknown): ConversionResult {
    try {
      if (typeof data !== "object" || data === null || Array.isArray(data)) {
        return { ok: false, error: "TOML conversion requires a JSON object as root, arrays or primitives are not valid top-level structures." };
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const output = stringify(data as Record<string, any>);

      return { ok: true, output };
    } catch (e) {
      return {
        ok: false,
        error: `TOML generation error: ${e instanceof Error ? e.message : String(e)}`,
      };
    }
  }
}
