/**
 * React.memo wrapper for performance optimization
 * Use this for components that don't need to re-render when parent updates
 */

/**
 * Custom equality function for React.memo
 * Performs shallow comparison of props
 */
export const shallowEqual = <T extends Record<string, unknown>>(
  prevProps: T,
  nextProps: T,
): boolean => {
  const keys1 = Object.keys(prevProps);
  const keys2 = Object.keys(nextProps);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (prevProps[key] !== nextProps[key]) {
      return false;
    }
  }

  return true;
};
