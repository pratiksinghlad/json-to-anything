export function flattenObject(
  obj: Record<string, unknown>,
  prefix = '',
  result: Record<string, unknown> = {}
): Record<string, unknown> {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      result[newKey] = value;
    } else if (Array.isArray(value)) {
      // Convert arrays to JSON strings
      result[newKey] = JSON.stringify(value);
    } else if (typeof value === 'object' && value.constructor === Object) {
      // Recursively flatten nested objects
      flattenObject(value as Record<string, unknown>, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

export function getAllKeys(data: Record<string, unknown>[]): string[] {
  const keysSet = new Set<string>();

  for (const obj of data) {
    const flattened = flattenObject(obj);
    for (const key in flattened) {
      if (Object.prototype.hasOwnProperty.call(flattened, key)) {
        keysSet.add(key);
      }
    }
  }

  // Sort keys alphabetically for stable ordering
  return Array.from(keysSet).sort();
}
