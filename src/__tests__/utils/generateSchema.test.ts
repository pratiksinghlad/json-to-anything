import { describe, it, expect } from "vitest";
import { generateSchemaFromJson } from "../../utils/generateSchema";

describe("generateSchemaFromJson", () => {
  it("should infer types for primitive values", () => {
    expect(generateSchemaFromJson(null)).toEqual({ type: "null" });
    expect(generateSchemaFromJson(123)).toEqual({ type: "integer" });
    expect(generateSchemaFromJson(12.34)).toEqual({ type: "number" });
    expect(generateSchemaFromJson(true)).toEqual({ type: "boolean" });
    expect(generateSchemaFromJson("hello")).toEqual({ type: "string" });
  });

  it("should detect email format", () => {
    expect(generateSchemaFromJson("test@example.com")).toEqual({
      type: "string",
      format: "email",
    });
  });

  it("should detect date-time format", () => {
    expect(generateSchemaFromJson("2023-08-01T12:00:00Z")).toEqual({
      type: "string",
      format: "date-time",
    });
  });

  it("should infer types for arrays", () => {
    expect(generateSchemaFromJson([])).toEqual({
      type: "array",
      items: {},
    });

    expect(generateSchemaFromJson([1, 2, 3])).toEqual({
      type: "array",
      items: { type: "integer" },
    });

    expect(generateSchemaFromJson([{ name: "John" }])).toEqual({
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
        },
        required: ["name"],
      },
    });
  });

  it("should infer types for objects and keep them sorted deterministically", () => {
    const data = {
      b: "second",
      a: 1,
      c: true,
    };

    const schema = generateSchemaFromJson(data);

    expect(schema).toEqual({
      type: "object",
      properties: {
        a: { type: "integer" },
        b: { type: "string" },
        c: { type: "boolean" },
      },
      required: ["a", "b", "c"],
    });

    // Keys in properties should be sorted alphabetically
    const keys = Object.keys(schema.properties as Record<string, unknown>);
    expect(keys).toEqual(["a", "b", "c"]);
  });

  it("should generate schemas for nested objects recursively", () => {
    const data = {
      user: {
        name: "Alice",
        contacts: ["email@test.com"],
      },
    };

    const schema = generateSchemaFromJson(data);

    expect(schema).toEqual({
      type: "object",
      properties: {
        user: {
          type: "object",
          properties: {
            contacts: {
              type: "array",
              items: { type: "string", format: "email" },
            },
            name: { type: "string" },
          },
          required: ["contacts", "name"],
        },
      },
      required: ["user"],
    });
  });
});
