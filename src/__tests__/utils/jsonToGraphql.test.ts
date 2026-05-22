import { describe, expect, it } from "vitest";
import { jsonToGraphql } from "../../utils/jsonToGraphql";

describe("jsonToGraphql", () => {
  it("creates type, interface, and input definitions from JSON objects", () => {
    const result = jsonToGraphql({
      id: 1,
      name: "Ada",
      active: true,
      profile: { email: "ada@example.com" },
    });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("interface RootFields");
      expect(result.output).toContain("type Root implements RootFields");
      expect(result.output).toContain("input RootInput");
      expect(result.output).toContain("id: Int!");
      expect(result.output).toContain("profile: RootProfile!");
    }
  });

  it("wraps root arrays in an items field", () => {
    const result = jsonToGraphql([{ id: 1 }, { id: 2, label: "two" }]);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("items: [RootItem!]!");
      expect(result.output).toContain("label: String");
    }
  });
});
