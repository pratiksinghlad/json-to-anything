import { describe, it, expect } from "vitest";
import { xmlToJson } from "../../utils/xmlToJson";

describe("xmlToJson", () => {
  it("should convert simple XML to JSON", () => {
    const xml = `<root><name>John</name><age>30</age></root>`;
    const result = xmlToJson(xml);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toEqual({
        root: {
          name: "John",
          age: 30,
        },
      });
    }
  });

  it("should handle nested XML elements", () => {
    const xml = `<root>
      <person>
        <name>John</name>
        <address>
          <city>NYC</city>
        </address>
      </person>
    </root>`;
    const result = xmlToJson(xml);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, unknown>;
      expect(output.root).toBeDefined();
    }
  });

  it("should parse attributes when parseAttributes is true", () => {
    const xml = `<root><person id="123">John</person></root>`;
    const result = xmlToJson(xml, { parseAttributes: true });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, Record<string, Record<string, unknown>>>;
      expect(output.root.person["@_id"]).toBe(123);
    }
  });

  it("should ignore attributes when parseAttributes is false", () => {
    const xml = `<root><person id="123">John</person></root>`;
    const result = xmlToJson(xml, { parseAttributes: false });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, Record<string, unknown>>;
      expect(output.root.person).toBe("John");
    }
  });

  it("should coerce types when coerceTypes is true", () => {
    const xml = `<root><age>30</age><active>true</active></root>`;
    const result = xmlToJson(xml, { coerceTypes: true });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, Record<string, unknown>>;
      expect(output.root.age).toBe(30);
      expect(output.root.active).toBe(true);
    }
  });

  it("should not coerce types when coerceTypes is false", () => {
    const xml = `<root><age>30</age></root>`;
    const result = xmlToJson(xml, { coerceTypes: false });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, Record<string, unknown>>;
      expect(output.root.age).toBe("30");
    }
  });

  it("should handle XML with multiple same-named elements", () => {
    const xml = `<root><item>1</item><item>2</item><item>3</item></root>`;
    const result = xmlToJson(xml);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, Record<string, unknown>>;
      expect(output.root.item).toEqual([1, 2, 3]);
    }
  });

  it("should handle XML declaration", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?><root><name>John</name></root>`;
    const result = xmlToJson(xml);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, Record<string, string>>;
      expect(output.root.name).toBe("John");
    }
  });

  it("should return error for empty input", () => {
    const result = xmlToJson("");
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is empty");
    }
  });

  it("should return error for whitespace-only input", () => {
    const result = xmlToJson("   ");
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("Input is empty");
    }
  });

  it("should handle self-closing tags", () => {
    const xml = `<root><empty/></root>`;
    const result = xmlToJson(xml);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, Record<string, unknown>>;
      expect(output.root).toBeDefined();
    }
  });

  it("should handle CDATA sections", () => {
    const xml = `<root><data><![CDATA[Some <special> content]]></data></root>`;
    const result = xmlToJson(xml);
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, Record<string, string>>;
      expect(output.root.data).toContain("Some <special> content");
    }
  });

  it("should use explicitArray when enabled", () => {
    const xml = `<root><item>1</item></root>`;
    const result = xmlToJson(xml, { explicitArray: true });
    
    expect(result.ok).toBe(true);
    if (result.ok) {
      const output = result.output as Record<string, Record<string, unknown>>;
      expect(Array.isArray(output.root)).toBe(true);
    }
  });
});
