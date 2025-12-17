/**
 * Formats a JSON string with proper indentation
 * @param input - The JSON string to format
 * @param options - Formatting options
 * @returns Result object with formatted output or error
 */
export function formatJson(
  input: string,
  options?: { indent: number | "tab" },
): { ok: true; output: string } | { ok: false; error: string } {
  if (!input || input.trim() === "") {
    return { ok: false, error: "Input is empty" };
  }

  const indent = options?.indent ?? 2;
  const indentValue = indent === "tab" ? "\t" : indent;

  try {
    const parsed = JSON.parse(input);
    const output = JSON.stringify(parsed, null, indentValue);
    return { ok: true, output };
  } catch (e) {
    if (e instanceof SyntaxError) {
      // Try to extract position from error message (works in most browsers)
      // Common formats: "position 123", "at position 123", "column 5"
      const positionMatch = e.message.match(/position\s+(\d+)/i);
      const columnMatch = e.message.match(/column\s+(\d+)/i);

      if (positionMatch) {
        const position = parseInt(positionMatch[1], 10);
        // Calculate line and column from position
        const lines = input.substring(0, position).split("\n");
        const line = lines.length;
        const column = lines[lines.length - 1].length + 1;
        return { ok: false, error: `${e.message} (line ${line}, column ${column})` };
      } else if (columnMatch) {
        // Some browsers provide column directly
        return { ok: false, error: e.message };
      }
      // Fallback: return the original error message
      return { ok: false, error: e.message };
    }
    return { ok: false, error: String(e) };
  }
}
