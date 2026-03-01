/**
 * @file strategies/XmlStrategy.ts
 * Adapts the existing jsonToXml utility as a ConversionStrategy.
 */

import type { ConversionStrategy } from "../ConversionStrategy";
import type { XmlConversionOptions, ConversionResult } from "../types";
import { jsonToXml } from "../../utils/jsonToXml";

export class XmlStrategy implements ConversionStrategy<XmlConversionOptions> {
  readonly format = "xml" as const;

  convert(data: unknown, options: XmlConversionOptions): ConversionResult {
    try {
      const result = jsonToXml(data, options);
      return result.ok
        ? { ok: true, output: result.output }
        : { ok: false, error: result.error };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
}
