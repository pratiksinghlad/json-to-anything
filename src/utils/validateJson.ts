import Ajv from "ajv";
import type { ErrorObject } from "ajv";
import addFormats from "ajv-formats";

export interface ValidateJsonOptions {
  schemaDraft?: string;
  jsonString?: string;
}

export interface ValidationError {
  path: string;
  message: string;
  line?: number;
}

export interface ValidateJsonResult {
  valid: boolean;
  errors?: ValidationError[];
}

/**
 * Finds the line number of a JSON pointer in a JSON string
 * @param json - The raw JSON string
 * @param pointer - The JSON pointer (e.g., /foo/bar/0)
 * @returns The line number (1-indexed) or undefined if not found
 */
export function findLineNumberInJson(json: string, pointer: string): number | undefined {
  if (!pointer || pointer === "" || pointer === "/") return 1;

  const segments = pointer.split("/").filter((s) => s !== "");
  let currentIndex = 0;
  let currentLine = 1;

  for (const segment of segments) {
    // Escape backslashes and quotes to match JSON string escaping for keys
    const escapedSegment = segment
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"');
    
    // Search for the key or array index
    // We look for "key": or [index]
    // This is a simplified search that works for most valid JSON
    let searchIndex = -1;
    
    // Try finding "segment":
    const keyPattern = `"${escapedSegment}"`;
    searchIndex = json.indexOf(keyPattern, currentIndex);
    
    // If not found, it might be an array index without quotes
    if (searchIndex === -1 && /^\d+$/.test(segment)) {
      // For arrays, we just search for the next open bracket or comma
      // This is less precise but usually acceptable for validation errors
      searchIndex = json.indexOf(segment, currentIndex);
    }

    if (searchIndex !== -1) {
      // Count lines between previous index and found index
      const linesInProgress = json.substring(currentIndex, searchIndex).split("\n");
      currentLine += linesInProgress.length - 1;
      currentIndex = searchIndex;
    } else {
      // If we can't find a segment, we stop and return the current best estimate
      break;
    }
  }

  return currentLine;
}

/**
 * Validates JSON data against a JSON Schema
 * @param input - The JSON data to validate
 * @param schema - The JSON Schema to validate against
 * @param options - Validation options (can include the raw jsonString for line number mapping)
 * @returns Result object with validation status and errors
 */
export function validateJson(
  input: unknown,
  schema: unknown,
  options?: ValidateJsonOptions,
): ValidateJsonResult {
  if (input === null || input === undefined) {
    return {
      valid: false,
      errors: [{ path: "", message: "Input is null or undefined", line: 1 }],
    };
  }

  if (schema === null || schema === undefined) {
    return {
      valid: false,
      errors: [{ path: "", message: "Schema is null or undefined", line: 1 }],
    };
  }

  if (typeof schema !== "object") {
    return {
      valid: false,
      errors: [{ path: "", message: "Schema must be an object", line: 1 }],
    };
  }

  try {
    // Determine draft version from options or schema
    const draft = options?.schemaDraft;
    let ajvOptions: ConstructorParameters<typeof Ajv>[0] = {
      allErrors: true,
      verbose: true,
      strict: false,
    };

    // Adjust options based on draft version
    if (draft === "draft-04" || draft === "draft-06") {
      ajvOptions = { ...ajvOptions, validateSchema: false };
    }

    const ajv = new Ajv(ajvOptions);
    addFormats(ajv);

    const validate = ajv.compile(schema);
    const valid = validate(input);

    if (valid) {
      return { valid: true };
    }

    const errors: ValidationError[] = (validate.errors || []).map((err: ErrorObject) => {
      const path = err.instancePath || "";
      const line = options?.jsonString ? findLineNumberInJson(options.jsonString, path) : undefined;
      
      return {
        path: path,
        message: err.message || "Unknown validation error",
        line: line,
      };
    });

    return { valid: false, errors };
  } catch (e) {
    return {
      valid: false,
      errors: [{ path: "", message: e instanceof Error ? e.message : String(e), line: 1 }],
    };
  }
}
