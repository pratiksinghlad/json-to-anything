import { flattenObject, getAllKeys } from './flattenObject';

export interface CsvOptions {
  separator: ',' | ';' | '\t';
  includeHeader: boolean;
  trimEmptyColumns?: boolean;
}

/**
 * Escapes a CSV cell value according to RFC4180
 * - Enclose in quotes if the value contains separator, quote, or newline
 * - Double any quotes inside the value
 */
export function escapeCsvCell(value: unknown, separator: string): string {
  if (value === null || value === undefined) {
    return '';
  }

  const stringValue = String(value);
  
  // Check if we need to quote the value
  const needsQuoting = 
    stringValue.includes(separator) ||
    stringValue.includes('"') ||
    stringValue.includes('\n') ||
    stringValue.includes('\r');

  if (needsQuoting) {
    // Double all quotes and wrap in quotes
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export function jsonToCsv(
  data: Record<string, unknown>[],
  options: CsvOptions
): string {
  if (data.length === 0) {
    return '';
  }

  const { separator, includeHeader, trimEmptyColumns } = options;
  
  // Get all unique keys from all objects
  let columns = getAllKeys(data);

  // If trimEmptyColumns is true, remove columns that are empty in all rows
  if (trimEmptyColumns) {
    columns = columns.filter(col => {
      return data.some(row => {
        const flattened = flattenObject(row);
        const value = flattened[col];
        return value !== null && value !== undefined && value !== '';
      });
    });
  }

  const lines: string[] = [];

  // Add header row if requested
  if (includeHeader) {
    const headerRow = columns
      .map(col => escapeCsvCell(col, separator))
      .join(separator);
    lines.push(headerRow);
  }

  // Add data rows
  for (const obj of data) {
    const flattened = flattenObject(obj);
    const row = columns
      .map(col => escapeCsvCell(flattened[col], separator))
      .join(separator);
    lines.push(row);
  }

  return lines.join('\n');
}
