import { describe, it, expect } from "vitest";
import { csvToJson } from "../../utils/csvToJson";

describe("csvToJson", () => {
  it("should convert simple CSV with headers to JSON array", () => {
    const csv = `name,age,email
John,30,john@example.com
Jane,25,jane@example.com`;
    
    const result = csvToJson(csv);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual([
        { name: "John", age: 30, email: "john@example.com" },
        { name: "Jane", age: 25, email: "jane@example.com" },
      ]);
    }
  });

  it("should handle semicolon delimiter", () => {
    const csv = `name;age
John;30
Jane;25`;
    
    const result = csvToJson(csv, { delimiter: ";" });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual([
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
      ]);
    }
  });

  it("should handle tab delimiter", () => {
    const csv = `name\tage
John\t30`;
    
    const result = csvToJson(csv, { delimiter: "\t" });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual([{ name: "John", age: 30 }]);
    }
  });

  it("should handle CSV without header when hasHeader is false", () => {
    const csv = `John,30
Jane,25`;
    
    const result = csvToJson(csv, { hasHeader: false });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual([
        ["John", 30],
        ["Jane", 25],
      ]);
    }
  });

  it("should return JSON lines format when outputType is lines", () => {
    const csv = `name,age
John,30
Jane,25`;
    
    const result = csvToJson(csv, { outputType: "lines" });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual([
        '{"name":"John","age":30}',
        '{"name":"Jane","age":25}',
      ]);
    }
  });

  it("should handle quoted values with commas", () => {
    const csv = `name,description
John,"Hello, World"`;
    
    const result = csvToJson(csv);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual([
        { name: "John", description: "Hello, World" },
      ]);
    }
  });

  it("should handle quoted values with newlines", () => {
    const csv = `name,description
John,"Line1
Line2"`;
    
    const result = csvToJson(csv);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect((result.output as Record<string, unknown>[])[0].description).toBe("Line1\nLine2");
    }
  });

  it("should handle empty cells", () => {
    const csv = `name,age,email
John,,john@example.com`;
    
    const result = csvToJson(csv);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual([
        { name: "John", age: null, email: "john@example.com" },
      ]);
    }
  });

  it("should return error for empty input", () => {
    const result = csvToJson("");
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is empty");
    }
  });

  it("should return error for whitespace-only input", () => {
    const result = csvToJson("   ");
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is empty");
    }
  });

  it("should handle boolean values", () => {
    const csv = `name,active
John,true
Jane,false`;
    
    const result = csvToJson(csv);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual([
        { name: "John", active: true },
        { name: "Jane", active: false },
      ]);
    }
  });

  it("should handle numeric values", () => {
    const csv = `name,score,price
John,100,19.99`;
    
    const result = csvToJson(csv);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual([
        { name: "John", score: 100, price: 19.99 },
      ]);
    }
  });
});
