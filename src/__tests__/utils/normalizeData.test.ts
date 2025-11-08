import { describe, it, expect } from "vitest";
import { normalizeData } from "../../utils/normalizeData";

describe("normalizeData", () => {
  it("should accept an array of objects", () => {
    const input = [{ id: 1 }, { id: 2 }];
    const result = normalizeData(input);
    expect(result.success).toBe(true);
    expect(result.data).toEqual(input);
  });

  it("should extract data from object with data property", () => {
    const input = { data: [{ id: 1 }, { id: 2 }] };
    const result = normalizeData(input);
    expect(result.success).toBe(true);
    expect(result.data).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it("should fail on empty array", () => {
    const result = normalizeData([]);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Array is empty");
  });

  it("should fail on array with non-object elements", () => {
    const result = normalizeData([1, 2, 3]);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Array must contain only objects");
  });

  it("should accept a single object and wrap it in an array", () => {
    const input = {
      name: "TechGizmo",
      location: {
        address: "123 Innovation Blvd",
        city: "Tech City",
        state: "CA",
        zip_code: "90001",
        country: "USA",
      },
    };
    const result = normalizeData(input);
    expect(result.success).toBe(true);
    expect(result.data).toEqual([input]);
  });

  it("should fail on empty data array", () => {
    const result = normalizeData({ data: [] });
    expect(result.success).toBe(false);
    expect(result.error).toBe("Data array is empty");
  });

  it("should fail on primitive values", () => {
    const result = normalizeData("string");
    expect(result.success).toBe(false);
  });

  it("should fail on null", () => {
    const result = normalizeData(null);
    expect(result.success).toBe(false);
  });

  it("should fail on array containing arrays", () => {
    const result = normalizeData([
      [1, 2],
      [3, 4],
    ]);
    expect(result.success).toBe(false);
    expect(result.error).toBe("Array must contain only objects");
  });
});
