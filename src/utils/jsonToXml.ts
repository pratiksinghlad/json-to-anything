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

  // Smarter root handling
  // If rootName is not provided, we try to use the single key from inputJson if it's an object
  // Otherwise default to 'root'
  const rootNameInput = options?.rootName;
  const includeDeclaration = options?.declaration ?? true; // Default to true as requested
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let dataToConvert: any;

    if (Array.isArray(inputJson)) {
      // If root level is an array, we must wrap it
      const actualRootName = rootNameInput || "root";
      dataToConvert = { [actualRootName]: { item: inputJson } };
    } else if (typeof inputJson === "object" && inputJson !== null) {
      const keys = Object.keys(inputJson);

      const inputRecord = inputJson as Record<string, unknown>;
      const singleValue = keys.length === 1 ? inputRecord[keys[0]] : undefined;
      const canUseSingleKeyAsRoot =
        keys.length === 1 &&
        !rootNameInput &&
        singleValue !== null &&
        typeof singleValue === "object";

      if (canUseSingleKeyAsRoot) {
        // If there's only one key and no explicit rootName desired, use that key as root
        dataToConvert = inputJson;
      } else if (rootNameInput) {
        // Wrap in user-defined root
        dataToConvert = { [rootNameInput]: inputJson };
      } else {
        // Default wrap in 'root' if multiple keys and no root name
        dataToConvert = { root: inputJson };
      }
    } else {
      // Primitive values
      dataToConvert = { [rootNameInput || "root"]: inputJson };
    }

    let xmlOutput = builder.build(dataToConvert);

    // Ensure xmlOutput is a string and handle potential undefined/null from builder
    if (typeof xmlOutput !== "string") {
      xmlOutput = String(xmlOutput || "");
    }

    // Add XML declaration if requested and not already present
    if (includeDeclaration && !xmlOutput.trim().startsWith("<?xml")) {
      const declarationSeparator = pretty ? "\n" : "";
      xmlOutput = `<?xml version="1.0" encoding="UTF-8" ?>${declarationSeparator}${xmlOutput}`;
    }

    return { ok: true, output: xmlOutput };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
