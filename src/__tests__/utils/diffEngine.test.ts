import { describe, it, expect } from "vitest";
import { computeDiffData, computeCharParts, splitTextLines } from "../../engine/diffEngine";

describe("diffEngine", () => {
  describe("splitTextLines", () => {
    it("handles empty text", () => {
      expect(splitTextLines("")).toEqual([]);
    });

    it("splits Unix and Windows newlines properly", () => {
      expect(splitTextLines("line1\nline2\r\nline3")).toEqual(["line1", "line2", "line3"]);
    });
  });

  describe("computeCharParts", () => {
    it("detects character replacement (pratik vs pr@tik)", () => {
      const { leftParts, rightParts } = computeCharParts("pratik", "pr@tik");

      expect(leftParts).toEqual([
        { type: "equal", value: "pr" },
        { type: "removed", value: "a" },
        { type: "equal", value: "tik" },
      ]);

      expect(rightParts).toEqual([
        { type: "equal", value: "pr" },
        { type: "added", value: "@" },
        { type: "equal", value: "tik" },
      ]);
    });

    it("detects added characters within line", () => {
      const { leftParts, rightParts } = computeCharParts("hello world", "hello brave world");

      expect(leftParts).toEqual([
        { type: "equal", value: "hello " },
        { type: "equal", value: "world" },
      ]);

      expect(rightParts).toEqual([
        { type: "equal", value: "hello " },
        { type: "added", value: "brave " },
        { type: "equal", value: "world" },
      ]);
    });

    it("detects removed characters within line", () => {
      const { leftParts, rightParts } = computeCharParts("hello brave world", "hello world");

      expect(leftParts).toEqual([
        { type: "equal", value: "hello " },
        { type: "removed", value: "brave " },
        { type: "equal", value: "world" },
      ]);

      expect(rightParts).toEqual([
        { type: "equal", value: "hello " },
        { type: "equal", value: "world" },
      ]);
    });
  });

  describe("computeDiffData", () => {
    it("handles identical content", () => {
      const res = computeDiffData("hello\nworld", "hello\nworld");
      expect(res.additions).toBe(0);
      expect(res.deletions).toBe(0);
      expect(res.rows).toHaveLength(2);
      expect(res.rows[0].left.type).toBe("equal");
      expect(res.rows[0].right.type).toBe("equal");
      expect(res.rows[1].left.type).toBe("equal");
      expect(res.rows[1].right.type).toBe("equal");
    });

    it("handles character-level single-line replacement (pratik vs pr@tik)", () => {
      const res = computeDiffData("pratik", "pr@tik");
      expect(res.additions).toBe(1);
      expect(res.deletions).toBe(1);
      expect(res.rows).toHaveLength(1);

      const row = res.rows[0];
      expect(row.left.type).toBe("removed");
      expect(row.left.lineNumber).toBe(1);
      expect(row.left.content).toBe("pratik");
      expect(row.left.parts).toEqual([
        { type: "equal", value: "pr" },
        { type: "removed", value: "a" },
        { type: "equal", value: "tik" },
      ]);

      expect(row.right.type).toBe("added");
      expect(row.right.lineNumber).toBe(1);
      expect(row.right.content).toBe("pr@tik");
      expect(row.right.parts).toEqual([
        { type: "equal", value: "pr" },
        { type: "added", value: "@" },
        { type: "equal", value: "tik" },
      ]);
    });

    it("handles pure additions and pure deletions", () => {
      const original = "line1\nline2";
      const modified = "line1\nline_new\nline2";

      const res = computeDiffData(original, modified);
      expect(res.additions).toBe(1);
      expect(res.deletions).toBe(0);
      expect(res.rows).toHaveLength(3);

      expect(res.rows[1].left.type).toBe("empty");
      expect(res.rows[1].right.type).toBe("added");
      expect(res.rows[1].right.content).toBe("line_new");
    });

    it("shows whitespace differences when ignoreWhitespace is false (default)", () => {
      const original = "  const a = 1;";
      const modified = "    const a = 1;";

      const res = computeDiffData(original, modified, { ignoreWhitespace: false });
      expect(res.additions).toBe(1);
      expect(res.deletions).toBe(1);
      expect(res.rows[0].left.type).toBe("removed");
      expect(res.rows[0].right.type).toBe("added");
    });

    it("hides whitespace differences when ignoreWhitespace is true", () => {
      const original = "  const a = 1;";
      const modified = "    const a = 1;";

      const res = computeDiffData(original, modified, { ignoreWhitespace: true });
      expect(res.additions).toBe(0);
      expect(res.deletions).toBe(0);
      expect(res.rows).toHaveLength(1);
      expect(res.rows[0].left.type).toBe("equal");
      expect(res.rows[0].right.type).toBe("equal");
      expect(res.rows[0].left.content).toBe("  const a = 1;");
      expect(res.rows[0].right.content).toBe("    const a = 1;");
    });

    it("hides whitespace-only line additions/deletions when ignoreWhitespace is true", () => {
      const original = "line1\n   \nline2";
      const modified = "line1\nline2";

      const res = computeDiffData(original, modified, { ignoreWhitespace: true });
      expect(res.deletions).toBe(0);
      expect(res.additions).toBe(0);
    });

    it("correctly highlights non-whitespace changes when ignoreWhitespace is true", () => {
      const original = "  const a = 1;";
      const modified = "    const a = 2;";

      const res = computeDiffData(original, modified, { ignoreWhitespace: true });
      expect(res.additions).toBe(1);
      expect(res.deletions).toBe(1);

      const row = res.rows[0];
      expect(row.left.type).toBe("removed");
      expect(row.right.type).toBe("added");
      // Character 1 -> 2 is highlighted, leading whitespace is treated as equal
      const removedChars = row.left.parts?.filter((p) => p.type === "removed").map((p) => p.value);
      const addedChars = row.right.parts?.filter((p) => p.type === "added").map((p) => p.value);

      expect(removedChars).toContain("1");
      expect(addedChars).toContain("2");
    });
  });
});
