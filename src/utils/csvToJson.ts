import Papa from "papaparse";

export interface CsvToJsonOptions {
  delimiter?: string;
  hasHeader?: boolean;
  outputType?: "array" | "lines";
  parseDates?: boolean;
}

export type CsvToJsonResult =
  | { ok: true; output: unknown[] | string[] }
  | { ok: false; error: string };

/**
 * Checks if a string value looks like an ISO date string
 * Handles various ISO 8601 formats including timezone and milliseconds
 */
const isIsoDateString = (value: string): boolean => {
  // Match ISO 8601 date formats:
  // 2023-01-15
  // 2023-01-15T12:30:00
  // 2023-01-15T12:30:00Z
  // 2023-01-15T12:30:00.123Z
  // 2023-01-15T12:30:00+05:30
  // 2023-01-15T12:30:00.123+05:30
  const isoDatePattern =
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{1,3})?(Z|[+-]\d{2}:\d{2})?)?$/;
  return isoDatePattern.test(value);
};

/**
 * Converts CSV input to JSON
 * @param input - The CSV string to parse
 * @param options - Parsing options
 * @returns Result object with parsed JSON array or error
 */
export function csvToJson(input: string, options?: CsvToJsonOptions): CsvToJsonResult {
  if (!input || input.trim() === "") {
    return { ok: false, error: "Input is empty" };
  }

  const delimiter = options?.delimiter ?? ",";
  const hasHeader = options?.hasHeader ?? true;
  const outputType = options?.outputType ?? "array";
  const parseDates = options?.parseDates ?? false;

  try {
    const result = Papa.parse(input, {
      delimiter,
      header: hasHeader,
      skipEmptyLines: true,
      dynamicTyping: true,
      transform: parseDates
        ? (value: string) => {
            // Only transform string values that look like dates
            if (typeof value === "string" && isIsoDateString(value)) {
              const date = new Date(value);
              if (!isNaN(date.getTime())) {
                return date.toISOString();
              }
            }
            return value;
          }
        : undefined,
    });

    if (result.errors && result.errors.length > 0) {
      const firstError = result.errors[0];
      const rowInfo = firstError.row !== undefined ? ` at row ${firstError.row + 1}` : "";
      return { ok: false, error: `${firstError.message}${rowInfo}` };
    }

    const data = result.data as unknown[];

    if (outputType === "lines") {
      const lines = data.map((row) => JSON.stringify(row));
      return { ok: true, output: lines };
    }

    return { ok: true, output: data };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}
