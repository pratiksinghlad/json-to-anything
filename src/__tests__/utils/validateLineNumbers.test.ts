import { describe, it, expect } from "vitest";
import { findLineNumberInJson, validateJson } from "../../utils/validateJson";

describe("findLineNumberInJson", () => {
  const json = `{
  "name": "John",
  "age": 30,
  "address": {
    "city": "NYC",
    "zip": 10001
  },
  "tags": ["a", "b"]
}`;

  it("should find line number for root properties", () => {
    expect(findLineNumberInJson(json, "/name")).toBe(2);
    expect(findLineNumberInJson(json, "/age")).toBe(3);
  });

  it("should find line number for nested properties", () => {
    expect(findLineNumberInJson(json, "/address/city")).toBe(5);
    expect(findLineNumberInJson(json, "/address/zip")).toBe(6);
  });

  it("should find line number for array elements", () => {
    expect(findLineNumberInJson(json, "/tags/0")).toBe(8);
    expect(findLineNumberInJson(json, "/tags/1")).toBe(8); // Simple search might find the same line for arrays if inline
  });

  it("should return 1 for root", () => {
    expect(findLineNumberInJson(json, "")).toBe(1);
    expect(findLineNumberInJson(json, "/")).toBe(1);
  });
});

describe("validateJson with line numbers", () => {
  const schema = {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number", minimum: 0 },
      address: {
        type: "object",
        properties: {
          zip: { type: "number" }
        }
      }
    },
    required: ["name"]
  };

  it("should include line numbers in errors", () => {
    const jsonStr = `{\n  "age": -5\n}`;
    const data = JSON.parse(jsonStr);
    const result = validateJson(data, schema, { jsonString: jsonStr });
    
    expect(result.valid).toBe(false);
    expect(result.errors?.[0].line).toBe(2);
  });
});
