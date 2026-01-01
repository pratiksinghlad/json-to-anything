export interface NormalizeResult {
  success: boolean;
  data?: Record<string, unknown>[];
  error?: string;
}

export function normalizeData(input: unknown): NormalizeResult {
  if (!input) {
    return {
      success: false,
      error: "Input is empty",
    };
  }

  let current = input;

  // Common pattern in XML/JSON: a single root property
  // We unwrap single-property objects if they contain an array or another object
  // to find the actual data list.
  let unwrapped = true;
  while (
    unwrapped &&
    typeof current === "object" &&
    current !== null &&
    !Array.isArray(current) &&
    Object.keys(current).length === 1
  ) {
    const key = Object.keys(current)[0];
    const nextValue = (current as Record<string, unknown>)[key];
    if (typeof nextValue === "object" && nextValue !== null) {
      current = nextValue;
    } else {
      unwrapped = false;
    }
  }

  // If it's already an array
  if (Array.isArray(current)) {
    if (current.length === 0) {
      return {
        success: false,
        error: "Array is empty",
      };
    }

    // Check if all elements are objects
    if (!current.every((item) => typeof item === "object" && item !== null && !Array.isArray(item))) {
      return {
        success: false,
        error: "Array must contain only objects",
      };
    }

    return {
      success: true,
      data: current as Record<string, unknown>[],
    };
  }

  // If it's an object with a 'data' property
  if (typeof current === "object" && current !== null && !Array.isArray(current)) {
    const obj = current as Record<string, unknown>;

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
