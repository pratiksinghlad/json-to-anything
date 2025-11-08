import { describe, it, expect } from "vitest";
import { escapeCsvCell, jsonToCsv, toPascalCase } from "../../utils/jsonToCsv";

describe("toPascalCase", () => {
  it("should convert snake_case to PascalCase", () => {
    expect(toPascalCase("first_name")).toBe("FirstName");
    expect(toPascalCase("user_email")).toBe("UserEmail");
    expect(toPascalCase("last_login_date")).toBe("LastLoginDate");
  });

  it("should convert dot notation to PascalCase", () => {
    expect(toPascalCase("user.profile.name")).toBe("UserProfileName");
    expect(toPascalCase("config.api.url")).toBe("ConfigApiUrl");
  });

  it("should convert kebab-case to PascalCase", () => {
    expect(toPascalCase("first-name")).toBe("FirstName");
    expect(toPascalCase("user-email")).toBe("UserEmail");
  });

  it("should handle space-separated words", () => {
    expect(toPascalCase("first name")).toBe("FirstName");
    expect(toPascalCase("user email address")).toBe("UserEmailAddress");
  });

  it("should handle mixed separators", () => {
    expect(toPascalCase("user_profile.first-name")).toBe("UserProfileFirstName");
    expect(toPascalCase("api.user_data.last-login")).toBe("ApiUserDataLastLogin");
  });

  it("should handle single words", () => {
    expect(toPascalCase("name")).toBe("Name");
    expect(toPascalCase("id")).toBe("Id");
  });

  it("should handle empty strings", () => {
    expect(toPascalCase("")).toBe("");
  });
});

describe("escapeCsvCell", () => {
  it("should return simple values as-is", () => {
    expect(escapeCsvCell("hello", ",")).toBe("hello");
    expect(escapeCsvCell(123, ",")).toBe("123");
    expect(escapeCsvCell(true, ",")).toBe("true");
  });

  it("should return empty string for null and undefined", () => {
    expect(escapeCsvCell(null, ",")).toBe("");
    expect(escapeCsvCell(undefined, ",")).toBe("");
  });

  it("should quote values containing separator", () => {
    expect(escapeCsvCell("hello,world", ",")).toBe('"hello,world"');
    expect(escapeCsvCell("hello;world", ";")).toBe('"hello;world"');
    expect(escapeCsvCell("hello\tworld", "\t")).toBe('"hello\tworld"');
  });

  it("should quote and double-quote values containing quotes", () => {
    expect(escapeCsvCell('hello "world"', ",")).toBe('"hello ""world"""');
    expect(escapeCsvCell('"quoted"', ",")).toBe('"""quoted"""');
  });

  it("should quote values containing newlines", () => {
    expect(escapeCsvCell("hello\nworld", ",")).toBe('"hello\nworld"');
    expect(escapeCsvCell("hello\r\nworld", ",")).toBe('"hello\r\nworld"');
  });

  it("should handle complex cases with multiple special characters", () => {
    expect(escapeCsvCell('say "hi", please\nnow', ",")).toBe('"say ""hi"", please\nnow"');
  });
});

describe("jsonToCsv", () => {
  it("should convert simple array of objects to CSV", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ];
    const csv = jsonToCsv(data, { separator: ",", includeHeader: true });
    const lines = csv.split("\n");
    expect(lines[0]).toBe("age,name");
    expect(lines[1]).toBe("30,Alice");
    expect(lines[2]).toBe("25,Bob");
  });

  it("should handle missing keys in some objects", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", email: "bob@example.com" },
    ];
    const csv = jsonToCsv(data, { separator: ",", includeHeader: true });
    const lines = csv.split("\n");
    expect(lines[0]).toBe("age,email,name");
    expect(lines[1]).toBe("30,,Alice");
    expect(lines[2]).toBe(",bob@example.com,Bob");
  });

  it("should flatten nested objects", () => {
    const data = [{ name: "Alice", profile: { role: "engineer" } }];
    const csv = jsonToCsv(data, { separator: ",", includeHeader: true });
    const lines = csv.split("\n");
    expect(lines[0]).toBe("name,profile.role");
    expect(lines[1]).toBe("Alice,engineer");
  });

  it("should convert arrays to JSON strings", () => {
    const data = [{ name: "Alice", tags: ["frontend", "react"] }];
    const csv = jsonToCsv(data, { separator: ",", includeHeader: true });
    const lines = csv.split("\n");
    expect(lines[0]).toBe("name,tags");
    expect(lines[1]).toBe('Alice,"[""frontend"",""react""]"');
  });

  it("should use specified separator", () => {
    const data = [{ name: "Alice", age: 30 }];
    const csv = jsonToCsv(data, { separator: ";", includeHeader: true });
    const lines = csv.split("\n");
    expect(lines[0]).toBe("age;name");
    expect(lines[1]).toBe("30;Alice");
  });

  it("should omit header when includeHeader is false", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
    ];
    const csv = jsonToCsv(data, { separator: ",", includeHeader: false });
    const lines = csv.split("\n");
    expect(lines.length).toBe(2);
    expect(lines[0]).toBe("30,Alice");
    expect(lines[1]).toBe("25,Bob");
  });

  it("should trim empty columns when requested", () => {
    const data = [
      { name: "Alice", age: 30, middleName: null },
      { name: "Bob", age: 25, middleName: null },
    ];
    const csv = jsonToCsv(data, { separator: ",", includeHeader: true, trimEmptyColumns: true });
    const lines = csv.split("\n");
    expect(lines[0]).toBe("age,name");
  });

  it("should not trim columns with some values when trimEmptyColumns is true", () => {
    const data = [
      { name: "Alice", age: 30, middleName: null },
      { name: "Bob", age: 25, middleName: "J" },
    ];
    const csv = jsonToCsv(data, { separator: ",", includeHeader: true, trimEmptyColumns: true });
    const lines = csv.split("\n");
    expect(lines[0]).toBe("age,middleName,name");
  });

  it("should handle empty array", () => {
    const csv = jsonToCsv([], { separator: ",", includeHeader: true });
    expect(csv).toBe("");
  });

  it("should properly escape complex values", () => {
    const data = [
      {
        name: "Alice",
        description: 'Works with "data"\nand analysis, sometimes',
      },
    ];
    const csv = jsonToCsv(data, { separator: ",", includeHeader: true });
    // Check that quotes are doubled (RFC4180 requirement)
    expect(csv).toContain('""data""');
    // Verify the description contains the newline character intact
    expect(csv).toContain("and analysis");
  });

  it("should handle the sample data from spec", () => {
    const data = [
      {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        profile: {
          role: "engineer",
          joined: "2023-04-12T08:00:00Z",
        },
        tags: ["frontend", "react"],
      },
      {
        id: 2,
        name: "Bob",
        email: "bob@example.com",
        profile: {
          role: "designer",
        },
        tags: [],
      },
    ];
    const csv = jsonToCsv(data, { separator: ",", includeHeader: true });
    const lines = csv.split("\n");

    // Check header
    expect(lines[0]).toContain("email");
    expect(lines[0]).toContain("id");
    expect(lines[0]).toContain("name");
    expect(lines[0]).toContain("profile.role");
    expect(lines[0]).toContain("tags");

    // Check first data row
    expect(lines[1]).toContain("alice@example.com");
    expect(lines[1]).toContain("1");
    expect(lines[1]).toContain("Alice");
    expect(lines[1]).toContain("engineer");
  });

  it("should convert headers to Pascal case when option is enabled", () => {
    const data = [
      { first_name: "Alice", user_email: "alice@example.com", "profile.role": "engineer" },
      { first_name: "Bob", user_email: "bob@example.com", "profile.role": "designer" },
    ];

    // Without Pascal case
    const csvNormal = jsonToCsv(data, {
      separator: ",",
      includeHeader: true,
      pascalCaseHeaders: false,
    });
    const normalLines = csvNormal.split("\n");
    expect(normalLines[0]).toBe("first_name,profile.role,user_email");

    // With Pascal case
    const csvPascal = jsonToCsv(data, {
      separator: ",",
      includeHeader: true,
      pascalCaseHeaders: true,
    });
    const pascalLines = csvPascal.split("\n");
    expect(pascalLines[0]).toBe("FirstName,ProfileRole,UserEmail");

    // Data rows should remain the same
    expect(pascalLines[1]).toBe("Alice,engineer,alice@example.com");
    expect(pascalLines[2]).toBe("Bob,designer,bob@example.com");
  });
});
