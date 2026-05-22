import { flattenObject, getAllKeys } from "./flattenObject";
import { normalizeData } from "./normalizeData";

export type JsonTableOutputFormat = "markdown" | "html";

export interface JsonToTableOptions {
  outputFormat?: JsonTableOutputFormat;
}

const stringifyCellValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "";
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
};

const escapeMarkdownCell = (value: string): string =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>");

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const alignMarkdownRows = (rows: string[][]): string => {
  const columnWidths = rows[0].map((_, columnIndex) =>
    Math.max(...rows.map((row) => row[columnIndex]?.length ?? 0)),
  );

  return rows
    .map((row) =>
      `| ${row
        .map((cell, columnIndex) => cell.padEnd(columnWidths[columnIndex]))
        .join(" | ")} |`,
    )
    .join("\n");
};

const toMarkdownTable = (rows: Record<string, unknown>[]): string => {
  const columns = getAllKeys(rows);
  const flattenedRows = rows.map((row) => flattenObject(row));
  const header = columns.map(escapeMarkdownCell);
  const divider = columns.map(() => "---");
  const body = flattenedRows.map((row) =>
    columns.map((column) => escapeMarkdownCell(stringifyCellValue(row[column]))),
  );

  return alignMarkdownRows([header, divider, ...body]);
};

const toHtmlTable = (rows: Record<string, unknown>[]): string => {
  const columns = getAllKeys(rows);
  const flattenedRows = rows.map((row) => flattenObject(row));
  const indent = "  ";

  const tableStyle = 'style="border-collapse: collapse; border: 1px solid #000000;"';
  const thStyle = 'style="border: 1px solid #000000; padding: 8px; background-color: #f3f3f3; font-weight: bold; text-align: left;"';
  const tdStyle = 'style="border: 1px solid #000000; padding: 8px;"';

  const header = [
    `${indent}<thead>`,
    `${indent}${indent}<tr>`,
    ...columns.map((column) => `${indent}${indent}${indent}<th ${thStyle}>${escapeHtml(column)}</th>`),
    `${indent}${indent}</tr>`,
    `${indent}</thead>`,
  ];

  const body = [
    `${indent}<tbody>`,
    ...flattenedRows.flatMap((row) => [
      `${indent}${indent}<tr>`,
      ...columns.map(
        (column) =>
          `${indent}${indent}${indent}<td ${tdStyle}>${escapeHtml(stringifyCellValue(row[column]))}</td>`,
      ),
      `${indent}${indent}</tr>`,
    ]),
    `${indent}</tbody>`,
  ];

  return [`<table ${tableStyle}>`, ...header, ...body, "</table>"].join("\n");
};

export const jsonToMarkdownTable = (
  input: unknown,
  options: JsonToTableOptions = {},
): { ok: true; output: string } | { ok: false; error: string } => {
  const normalized = normalizeData(input);

  if (!normalized.success || !normalized.data) {
    return { ok: false, error: normalized.error ?? "Unable to normalize JSON into table rows." };
  }

  const outputFormat = options.outputFormat ?? "markdown";
  const output =
    outputFormat === "html" ? toHtmlTable(normalized.data) : toMarkdownTable(normalized.data);

  return { ok: true, output };
};
