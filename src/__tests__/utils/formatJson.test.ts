import { describe, it, expect } from "vitest";
import { formatJson } from "../../utils/formatJson";

describe("formatJson", () => {
  it("should format valid JSON with default 2-space indent", () => {
    const input = '{"name":"John","age":30}';
    const result = formatJson(input);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toBe('{\n  "name": "John",\n  "age": 30\n}');
    }
  });

  it("should format valid JSON with 4-space indent", () => {
    const input = '{"name":"John"}';
    const result = formatJson(input, { indent: 4 });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toBe('{\n    "name": "John"\n}');
    }
  });

  it("should format valid JSON with tab indent", () => {
    const input = '{"name":"John"}';
    const result = formatJson(input, { indent: "tab" });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toBe('{\n\t"name": "John"\n}');
    }
  });

  it("should handle arrays", () => {
    const input = '[1,2,3]';
    const result = formatJson(input);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toBe('[\n  1,\n  2,\n  3\n]');
    }
  });

  it("should handle nested objects", () => {
    const input = '{"person":{"name":"John","address":{"city":"NYC"}}}';
    const result = formatJson(input);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain('"person"');
      expect(result.output).toContain('"address"');
    }
  });

  it("should return error for empty input", () => {
    const result = formatJson("");
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is empty");
    }
  });

  it("should return error for whitespace-only input", () => {
    const result = formatJson("   ");
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is empty");
    }
  });

  it("should return error for invalid JSON", () => {
    const result = formatJson("{invalid}");
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeTruthy();
    }
  });

  it("should return error for JSON with syntax errors", () => {
    const result = formatJson('{"name": "John",}');
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeTruthy();
    }
  });

  it("should handle primitive values", () => {
    expect(formatJson('"hello"').ok).toBe(true);
    expect(formatJson("123").ok).toBe(true);
    expect(formatJson("true").ok).toBe(true);
    expect(formatJson("null").ok).toBe(true);
  });
});
