import { XMLBuilder } from "fast-xml-parser";
import type { XmlBuilderOptions } from "fast-xml-parser";

export interface JsonToXmlOptions {
  rootName?: string;
  declaration?: boolean;
  attributePrefix?: string;
  pretty?: boolean;
  indent?: number;
}

export type JsonToXmlResult = { ok: true; output: string } | { ok: false; error: string };

/**
 * Converts JSON to XML format
 * @param inputJson - The JSON object to convert
 * @param options - Conversion options
 * @returns Result object with XML string or error
 */
export function jsonToXml(inputJson: unknown, options?: JsonToXmlOptions): JsonToXmlResult {
  if (inputJson === null || inputJson === undefined) {
    return { ok: false, error: "Input is null or undefined" };
  }

  const rootName = options?.rootName ?? "root";
  const declaration = options?.declaration ?? false;
  const attributePrefix = options?.attributePrefix ?? "@_";
  const pretty = options?.pretty ?? true;
  const indent = options?.indent ?? 2;

  try {
    const builderOptions: XmlBuilderOptions = {
      attributeNamePrefix: attributePrefix,
      ignoreAttributes: false,
      format: pretty,
      indentBy: " ".repeat(indent),
      suppressEmptyNode: false,
      suppressBooleanAttributes: false,
    };

    const builder = new XMLBuilder(builderOptions);

    // Wrap data in root element - arrays get wrapped with 'item' key to preserve structure
    const dataToConvert = {
      [rootName]: Array.isArray(inputJson) ? { item: inputJson } : inputJson,
    };

    let xmlOutput = builder.build(dataToConvert);

    // Add XML declaration if requested
    if (declaration) {
      xmlOutput = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlOutput;
    }

    return { ok: true, output: xmlOutput };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
