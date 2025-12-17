import { describe, it, expect } from "vitest";
import { validateJson } from "../../utils/validateJson";

describe("validateJson", () => {
  it("should validate valid JSON against a simple schema", () => {
    const data = { name: "John", age: 30 };
    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
      required: ["name", "age"],
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it("should return errors for invalid data", () => {
    const data = { name: 123, age: "thirty" };
    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThan(0);
  });

  it("should validate required properties", () => {
    const data = { name: "John" };
    const schema = {
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
      required: ["name", "age"],
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.some(e => e.message.includes("age") || e.path.includes("age"))).toBe(true);
  });

  it("should validate email format", () => {
    const data = { email: "invalid-email" };
    const schema = {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(false);
  });

  it("should validate valid email format", () => {
    const data = { email: "test@example.com" };
    const schema = {
      type: "object",
      properties: {
        email: { type: "string", format: "email" },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(true);
  });

  it("should validate minimum value", () => {
    const data = { age: -5 };
    const schema = {
      type: "object",
      properties: {
        age: { type: "integer", minimum: 0 },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(false);
  });

  it("should validate maximum value", () => {
    const data = { age: 200 };
    const schema = {
      type: "object",
      properties: {
        age: { type: "integer", maximum: 120 },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(false);
  });

  it("should validate array items", () => {
    const data = { tags: ["valid", 123] };
    const schema = {
      type: "object",
      properties: {
        tags: {
          type: "array",
          items: { type: "string" },
        },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(false);
  });

  it("should validate enum values", () => {
    const data = { status: "unknown" };
    const schema = {
      type: "object",
      properties: {
        status: { type: "string", enum: ["active", "inactive", "pending"] },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(false);
  });

  it("should return error for null input", () => {
    const schema = { type: "object" };
    
    const result = validateJson(null, schema);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors![0].message).toBe("Input is null or undefined");
  });

  it("should return error for undefined input", () => {
    const schema = { type: "object" };
    
    const result = validateJson(undefined, schema);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors![0].message).toBe("Input is null or undefined");
  });

  it("should return error for null schema", () => {
    const data = { name: "John" };
    
    const result = validateJson(data, null);
    
    expect(result.valid).toBe(false);
    expect(result.errors![0].message).toBe("Schema is null or undefined");
  });

  it("should return error for non-object schema", () => {
    const data = { name: "John" };
    
    const result = validateJson(data, "invalid");
    
    expect(result.valid).toBe(false);
    expect(result.errors![0].message).toBe("Schema must be an object");
  });

  it("should validate nested objects", () => {
    const data = {
      person: {
        name: "John",
        address: {
          city: "NYC",
          zip: "invalid",
        },
      },
    };
    const schema = {
      type: "object",
      properties: {
        person: {
          type: "object",
          properties: {
            name: { type: "string" },
            address: {
              type: "object",
              properties: {
                city: { type: "string" },
                zip: { type: "number" },
              },
            },
          },
        },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(false);
    expect(result.errors!.some(e => e.path.includes("zip"))).toBe(true);
  });

  it("should include path in error messages", () => {
    const data = { items: [{ value: "string" }] };
    const schema = {
      type: "object",
      properties: {
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              value: { type: "number" },
            },
          },
        },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors![0].path).toContain("items");
  });

  it("should validate date-time format", () => {
    const data = { timestamp: "2023-01-01T12:00:00Z" };
    const schema = {
      type: "object",
      properties: {
        timestamp: { type: "string", format: "date-time" },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(true);
  });

  it("should validate URI format", () => {
    const data = { website: "https://example.com" };
    const schema = {
      type: "object",
      properties: {
        website: { type: "string", format: "uri" },
      },
    };
    
    const result = validateJson(data, schema);
    
    expect(result.valid).toBe(true);
  });
});
