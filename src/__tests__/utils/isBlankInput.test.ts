import { describe, expect, it } from "vitest";
import { isBlankInput } from "../../utils/isBlankInput";

describe("isBlankInput", () => {
  it("returns true for an empty string", () => {
    expect(isBlankInput("")).toBe(true);
  });

  it("returns true for whitespace-only content", () => {
    expect(isBlankInput("   \n\t  ")).toBe(true);
  });

  it("returns false when content exists", () => {
    expect(isBlankInput('{ "name": "Alice" }')).toBe(false);
  });
});
