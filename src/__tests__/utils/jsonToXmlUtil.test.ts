import { describe, it, expect } from "vitest";
import { jsonToXml } from "../../utils/jsonToXml";

describe("jsonToXml", () => {
  it("should convert simple object to XML", () => {
    const input = { name: "John", age: 30 };
    const result = jsonToXml(input);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("<root>");
      expect(result.output).toContain("<name>John</name>");
      expect(result.output).toContain("<age>30</age>");
      expect(result.output).toContain("</root>");
    }
  });

  it("should use custom root name", () => {
    const input = { name: "John" };
    const result = jsonToXml(input, { rootName: "person" });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("<person>");
      expect(result.output).toContain("</person>");
    }
  });

  it("should include XML declaration when requested", () => {
    const input = { name: "John" };
    const result = jsonToXml(input, { declaration: true });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    }
  });

  it("should not include XML declaration by default", () => {
    const input = { name: "John" };
    const result = jsonToXml(input);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).not.toContain("<?xml");
    }
  });

  it("should handle nested objects", () => {
    const input = {
      person: {
        name: "John",
        address: {
          city: "NYC",
        },
      },
    };
    const result = jsonToXml(input);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("<person>");
      expect(result.output).toContain("<address>");
      expect(result.output).toContain("<city>NYC</city>");
    }
  });

  it("should handle arrays", () => {
    const input = [{ name: "John" }, { name: "Jane" }];
    const result = jsonToXml(input);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("<item>");
      expect(result.output).toContain("<name>John</name>");
      expect(result.output).toContain("<name>Jane</name>");
    }
  });

  it("should handle attributes with prefix", () => {
    const input = { "@_id": "123", name: "John" };
    const result = jsonToXml(input, { attributePrefix: "@_" });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain('id="123"');
    }
  });

  it("should format output when pretty is true", () => {
    const input = { name: "John" };
    const result = jsonToXml(input, { pretty: true });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("\n");
    }
  });

  it("should not format output when pretty is false", () => {
    const input = { name: "John" };
    const result = jsonToXml(input, { pretty: false });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).not.toContain("\n");
    }
  });

  it("should use custom indent size", () => {
    const input = { name: "John" };
    const result = jsonToXml(input, { pretty: true, indent: 4 });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("    "); // 4 spaces
    }
  });

  it("should return error for null input", () => {
    const result = jsonToXml(null);
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is null or undefined");
    }
  });

  it("should return error for undefined input", () => {
    const result = jsonToXml(undefined);
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is null or undefined");
    }
  });

  it("should handle primitive values", () => {
    const result = jsonToXml("hello");
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("<root>hello</root>");
    }
  });

  it("should handle boolean values", () => {
    const input = { active: true, deleted: false };
    const result = jsonToXml(input);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("<active>true</active>");
      expect(result.output).toContain("<deleted>false</deleted>");
    }
  });
});
