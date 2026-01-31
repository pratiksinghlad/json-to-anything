/**
 * JSON to TOON (Token-Oriented Object Notation) Converter
 *
 * TOON is a data serialization format designed to reduce LLM token usage by 30-60%.
 * Key features:
 * - Tabular arrays: Declares keys once, then presents data in CSV-like format
 * - Smart quoting: Only quotes strings when necessary
 * - Indentation-based structure: Like YAML, uses indentation instead of braces
 * - Explicit array lengths: Includes array length for validation
 *
 * @see https://github.com/nicobytes/toon-format
 */

export interface ToonOptions {
  /** Delimiter for tabular data (default: comma) */
  delimiter?: "," | "\t" | "|";
  /** Indentation size in spaces (default: 2) */
  indentSize?: number;
  /** Include length markers for arrays (default: true) */
  includeLengthMarkers?: boolean;
}

const DEFAULT_OPTIONS: ToonOptions = {
  delimiter: ",",
  indentSize: 2,
  includeLengthMarkers: true,
};

/**
 * Check if a value is a primitive (string, number, boolean, null)
 */
function isPrimitive(value: unknown): value is string | number | boolean | null {
  return value === null || ["string", "number", "boolean"].includes(typeof value);
}

/**
 * Check if a string needs quoting in TOON format
 * Strings need quotes if they contain special characters
 */
function needsQuoting(value: string): boolean {
  if (value === "") return true;
  // Needs quoting if contains delimiter, newline, quote, or starts/ends with whitespace
  return /[,\t|\n\r"']|^\s|\s$/.test(value) || /^[0-9]/.test(value) || value === "true" || value === "false" || value === "null";
}

/**
 * Escape and optionally quote a string value for TOON
 */
function formatValue(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "";
  if (typeof value === "boolean") return value.toString();
  if (typeof value === "number") return value.toString();
  if (typeof value === "string") {
    if (needsQuoting(value)) {
      // Escape quotes and wrap in quotes
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return value;
  }
  // For objects/arrays that shouldn't be here, convert to JSON
  return JSON.stringify(value);
}

/**
 * Check if an array contains uniform objects (all have same keys)
 */
function isUniformArray(arr: unknown[]): arr is Record<string, unknown>[] {
  if (arr.length === 0) return false;
  if (!arr.every((item) => item && typeof item === "object" && !Array.isArray(item))) {
    return false;
  }

  const firstKeys = Object.keys(arr[0] as Record<string, unknown>).sort().join(",");
  return arr.every((item) => {
    const keys = Object.keys(item as Record<string, unknown>).sort().join(",");
    return keys === firstKeys;
  });
}

/**
 * Check if all values in objects are primitives (suitable for tabular format)
 */
function hasOnlyPrimitiveValues(arr: Record<string, unknown>[]): boolean {
  return arr.every((obj) => Object.values(obj).every(isPrimitive));
}

/**
 * Convert a uniform array of objects to tabular TOON format
 */
function arrayToTable(arr: Record<string, unknown>[], options: ToonOptions, indent: string): string {
  if (arr.length === 0) return "[]";

  const keys = Object.keys(arr[0]);
  const { delimiter, includeLengthMarkers } = options;

  const lines: string[] = [];

  // Length marker
  if (includeLengthMarkers) {
    lines.push(`${indent}[${arr.length}]`);
  }

  // Header row with keys
  lines.push(`${indent}${keys.join(delimiter!)}`);

  // Data rows
  for (const obj of arr) {
    const values = keys.map((key) => formatValue(obj[key]));
    lines.push(`${indent}${values.join(delimiter!)}`);
  }

  return lines.join("\n");
}

/**
 * Convert a value to TOON format recursively
 */
function valueToToon(value: unknown, options: ToonOptions, indentLevel: number): string {
  const childIndent = " ".repeat(options.indentSize! * (indentLevel + 1));

  if (isPrimitive(value)) {
    return formatValue(value);
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return "[]";
    }

    // Check if this is a uniform array of objects with primitive values
    if (isUniformArray(value) && hasOnlyPrimitiveValues(value)) {
      return "\n" + arrayToTable(value, options, childIndent);
    }

    // Handle mixed arrays or arrays with nested structures
    const lines: string[] = [];
    if (options.includeLengthMarkers) {
      lines.push(`[${value.length}]`);
    }
    
    for (const item of value) {
      if (isPrimitive(item)) {
        lines.push(`${childIndent}- ${formatValue(item)}`);
      } else {
        const converted = valueToToon(item, options, indentLevel + 1);
        if (converted.startsWith("\n")) {
          lines.push(`${childIndent}-${converted}`);
        } else {
          lines.push(`${childIndent}- ${converted}`);
        }
      }
    }
    return "\n" + lines.join("\n");
  }

  if (typeof value === "object" && value !== null) {
    const obj = value as Record<string, unknown>;
    const keys = Object.keys(obj);

    if (keys.length === 0) {
      return "{}";
    }

    const lines: string[] = [];
    for (const key of keys) {
      const val = obj[key];
      const formattedKey = needsQuoting(key) ? `"${key}"` : key;
      
      if (isPrimitive(val)) {
        lines.push(`${childIndent}${formattedKey}: ${formatValue(val)}`);
      } else {
        const converted = valueToToon(val, options, indentLevel + 1);
        if (converted.startsWith("\n")) {
          lines.push(`${childIndent}${formattedKey}:${converted}`);
        } else {
          lines.push(`${childIndent}${formattedKey}: ${converted}`);
        }
      }
    }
    return "\n" + lines.join("\n");
  }

  return formatValue(value);
}

/**
 * Convert JSON to TOON format
 *
 * @param json - The JSON string or parsed object to convert
 * @param options - Conversion options
 * @returns The TOON formatted string
 */
export function jsonToToon(
  json: string | unknown,
  options: Partial<ToonOptions> = {}
): { success: true; output: string } | { success: false; error: string } {
  const mergedOptions: ToonOptions = { ...DEFAULT_OPTIONS, ...options };

  try {
    // Parse JSON if string
    let data: unknown;
    if (typeof json === "string") {
      if (json.trim() === "") {
        return { success: false, error: "Input is empty" };
      }
      data = JSON.parse(json);
    } else {
      data = json;
    }

    // Convert to TOON
    const result = valueToToon(data, mergedOptions, 0);

    // Clean up leading newline if present
    const output = result.startsWith("\n") ? result.substring(1) : result;

    return { success: true, output };
  } catch (e) {
    if (e instanceof SyntaxError) {
      return { success: false, error: "Invalid JSON: " + e.message };
    }
    return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}

/**
 * Convert TOON back to JSON (for round-trip validation)
 * Note: This is a simplified parser for basic TOON structures
 */
export function toonToJson(
  toon: string
): { success: true; output: unknown } | { success: false; error: string } {
  try {
    if (toon.trim() === "") {
      return { success: false, error: "Input is empty" };
    }

    // For now, TOON to JSON conversion is complex
    // This is a placeholder - full implementation would require a proper parser
    // The main use case is JSON -> TOON for LLM prompt optimization
    return { success: false, error: "TOON to JSON conversion is not yet implemented" };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
  }
}
