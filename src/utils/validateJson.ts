import Ajv from "ajv";
import type { ErrorObject } from "ajv";
import addFormats from "ajv-formats";

export interface ValidateJsonOptions {
  schemaDraft?: string;
}

export interface ValidationError {
  path: string;
  message: string;
}

export interface ValidateJsonResult {
  valid: boolean;
  errors?: ValidationError[];
}

/**
 * Validates JSON data against a JSON Schema
 * @param input - The JSON data to validate
 * @param schema - The JSON Schema to validate against
 * @param options - Validation options
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
      errors: [{ path: "", message: "Input is null or undefined" }],
    };
  }

  if (schema === null || schema === undefined) {
    return {
      valid: false,
      errors: [{ path: "", message: "Schema is null or undefined" }],
    };
  }

  if (typeof schema !== "object") {
    return {
      valid: false,
      errors: [{ path: "", message: "Schema must be an object" }],
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

    const errors: ValidationError[] = (validate.errors || []).map((err: ErrorObject) => ({
      path: err.instancePath || "/",
      message: err.message || "Unknown validation error",
    }));

    return { valid: false, errors };
  } catch (e) {
    return {
      valid: false,
      errors: [{ path: "", message: e instanceof Error ? e.message : String(e) }],
    };
  }
}
