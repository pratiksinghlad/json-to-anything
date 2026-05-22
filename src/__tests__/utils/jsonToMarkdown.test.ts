import { describe, expect, it } from "vitest";
import { jsonToMarkdownTable } from "../../utils/jsonToMarkdown";

describe("jsonToMarkdownTable", () => {
  it("flattens object rows into an aligned markdown table", () => {
    const result = jsonToMarkdownTable([
      { id: 1, user: { name: "Ada" } },
      { id: 2, user: { name: "Grace" } },
    ]);

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("| id  | user.name |");
      expect(result.output).toContain("| 1   | Ada       |");
      expect(result.output).toContain("| 2   | Grace     |");
    }
  });

  it("renders semantic HTML tables when requested", () => {
    const result = jsonToMarkdownTable([{ name: "<Ada>" }], { outputFormat: "html" });

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.output).toContain("<table");
      expect(result.output).toContain("<th");
      expect(result.output).toContain("&lt;Ada&gt;");
    }
  });
});
