/**
 * @file utils/generateSchema.ts
 *
 * Infers a JSON Schema draft-07 from a given JSON value.
 * Recursively maps types, structures, arrays, and objects.
 */

export function generateSchemaFromJson(data: unknown): Record<string, unknown> {
  if (data === null) {
    return { type: "null" };
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return {
        type: "array",
        items: {},
      };
    }
    // Infer items schema from the first element in the array
    return {
      type: "array",
      items: generateSchemaFromJson(data[0]),
    };
  }

  if (typeof data === "object") {
    const properties: Record<string, Record<string, unknown>> = {};
    const required: string[] = [];
    
    // Sort keys to make the schema generation deterministic
    const entries = Object.entries(data as Record<string, unknown>).sort((a, b) =>
      a[0].localeCompare(b[0]),
    );

    for (const [key, value] of entries) {
      properties[key] = generateSchemaFromJson(value);
      required.push(key);
    }

    const schema: Record<string, unknown> = {
      type: "object",
      properties,
    };

    if (required.length > 0) {
      schema.required = required;
    }

    return schema;
  }

  if (typeof data === "number") {
    return {
      type: Number.isInteger(data) ? "integer" : "number",
    };
  }

  if (typeof data === "boolean") {
    return {
      type: "boolean",
    };
  }

  if (typeof data === "string") {
    // Basic format detection for common string formats
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data);
    const isDateTime = !isNaN(Date.parse(data)) && data.includes("T") && data.includes(":");
    
    const schema: Record<string, unknown> = {
      type: "string",
    };

    if (isEmail) {
      schema.format = "email";
    } else if (isDateTime) {
      schema.format = "date-time";
    }

    return schema;
  }

  return {};
}
