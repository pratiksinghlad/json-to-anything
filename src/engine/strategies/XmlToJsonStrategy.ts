import type { ConversionStrategy } from "../ConversionStrategy";
import type { XmlToJsonOptions, ConversionResult } from "../types";
import { xmlToJson } from "../../utils/xmlToJson";

export class XmlToJsonStrategy implements ConversionStrategy<XmlToJsonOptions> {
  readonly format = "xml-to-json" as const;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  convert(data: unknown, _options: XmlToJsonOptions): ConversionResult {
    try {
      if (typeof data !== "string") {
        return { ok: false, error: "XML to JSON conversion requires string input." };
      }

      const result = xmlToJson(data);

      if (!result.ok) {
        return { ok: false, error: result.error || "Unknown XML parsing error" };
      }

      return { 
        ok: true, 
        output: JSON.stringify(result.output, null, 2)
      };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
}
