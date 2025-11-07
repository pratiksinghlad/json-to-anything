export interface ParseResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export function parseJson(input: string): ParseResult {
  try {
    if (!input.trim()) {
      return {
        success: false,
        error: 'Input is empty',
      };
    }

    const parsed = JSON.parse(input);
    return {
      success: true,
      data: parsed,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invalid JSON',
    };
  }
}
