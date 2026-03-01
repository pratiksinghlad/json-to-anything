import { XMLParser } from "fast-xml-parser";
import type { X2jOptions } from "fast-xml-parser";

export interface XmlToJsonOptions {
  parseAttributes?: boolean;
  explicitArray?: boolean;
  coerceTypes?: boolean;
}

export type XmlToJsonResult = { ok: true; output: unknown } | { ok: false; error: string };

/**
 * Converts XML to JSON format
 * @param input - The XML string to parse
 * @param options - Parsing options
 * @returns Result object with parsed JSON or error
 */
export function xmlToJson(input: string, options?: XmlToJsonOptions): XmlToJsonResult {
  if (!input || input.trim() === "") {
    return { ok: false, error: "Input is empty" };
  }

  const parseAttributes = options?.parseAttributes ?? true;
  const explicitArray = options?.explicitArray ?? false;
  const coerceTypes = options?.coerceTypes ?? true;

  try {
    const parserOptions: Partial<X2jOptions> = {
      ignoreAttributes: !parseAttributes,
      attributeNamePrefix: "@_",
      textNodeName: "#text",
      parseTagValue: coerceTypes,
      parseAttributeValue: coerceTypes,
      trimValues: true,
      processEntities: true,
      allowBooleanAttributes: true,
    };

    // Only add isArray if explicitArray is true
    if (explicitArray) {
      parserOptions.isArray = () => true;
    }

    const parser = new XMLParser(parserOptions);
    const result = parser.parse(input);

    return { ok: true, output: result };
  } catch (e) {
    if (e instanceof Error) {
      // Try to extract position info from error
      const match = e.message.match(/at line (\d+)/i);
      if (match) {
        return { ok: false, error: `Parse error at line ${match[1]}: ${e.message}` };
      }
      return { ok: false, error: e.message };
    }
    return { ok: false, error: String(e) };
  }
}
