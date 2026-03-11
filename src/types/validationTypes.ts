/**
 * Represents a single validation error with optional location info.
 * Used by the shared ValidationResults component across all pages.
 */
export interface ValidationError {
  message: string;
  path?: string;
  line?: number;
}
