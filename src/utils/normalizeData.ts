export interface NormalizeResult {
  success: boolean;
  data?: Record<string, unknown>[];
  error?: string;
}

export function normalizeData(input: unknown): NormalizeResult {
  // If it's already an array
  if (Array.isArray(input)) {
    if (input.length === 0) {
      return {
        success: false,
        error: "Array is empty",
      };
    }

    // Check if all elements are objects
    if (!input.every((item) => typeof item === "object" && item !== null && !Array.isArray(item))) {
      return {
        success: false,
        error: "Array must contain only objects",
      };
    }

    return {
      success: true,
      data: input as Record<string, unknown>[],
    };
  }

  // If it's an object with a 'data' property
  if (typeof input === "object" && input !== null && !Array.isArray(input)) {
    const obj = input as Record<string, unknown>;

    if ("data" in obj && Array.isArray(obj.data)) {
      if (obj.data.length === 0) {
        return {
          success: false,
          error: "Data array is empty",
        };
      }

      // Check if all elements are objects
      if (
        !obj.data.every((item) => typeof item === "object" && item !== null && !Array.isArray(item))
      ) {
        return {
          success: false,
          error: "Data array must contain only objects",
        };
      }

      return {
        success: true,
        data: obj.data as Record<string, unknown>[],
      };
    }

    // If it's a single object without 'data' property, wrap it in an array
    return {
      success: true,
      data: [obj],
    };
  }

  return {
    success: false,
    error:
      'Input must be an array of objects, a single object, or an object with a "data" array property',
  };
}
