export interface ParseResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  line?: number;
  column?: number;
}

export function parseJson(input: string): ParseResult {
  try {
    if (!input.trim()) {
      return {
        success: false,
        error: "Input is empty",
      };
    }

    const parsed = JSON.parse(input);
    return {
      success: true,
      data: parsed,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    let line: number | undefined;
    let column: number | undefined;

    if (error instanceof SyntaxError) {
      // Try to extract position from error message (works in most browsers)
      const positionMatch = message.match(/position\s+(\d+)/i);
      if (positionMatch) {
        const position = parseInt(positionMatch[1], 10);
        const lines = input.substring(0, position).split("\n");
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }
    }

    return {
      success: false,
      error: message,
      line,
      column,
    };
  }
}
