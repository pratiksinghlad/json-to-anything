/**
 * @file diffTypes.ts
 * Core types for the side-by-side diff computation using Web Workers.
 * These types govern the contract between the main thread and the diff.worker.ts.
 */

// ---------------------------------------------------------------------------
// Diff Line structure
// ---------------------------------------------------------------------------
export type DiffLineType = "equal" | "added" | "removed";

export interface DiffLine {
  type: DiffLineType;
  /** The text content of this single line (without a trailing newline) */
  content: string;
  /** 1-based index in the original text. Null if this line was added or if it represents a blank placeholder. */
  leftLineNumber: number | null;
  /** 1-based index in the modified text. Null if this line was removed or if it represents a blank placeholder. */
  rightLineNumber: number | null;
}

export interface DiffResult {
  lines: DiffLine[];
  additions: number;
  deletions: number;
}

// ---------------------------------------------------------------------------
// Worker message protocol (Discriminated Unions)
// ---------------------------------------------------------------------------

/**
 * Sent FROM main thread TO worker.
 * The texts are transferred as ArrayBuffers to avoid copying large strings.
 */
export interface DiffWorkerRequest {
  id: string;
  /** Original text encoded as UTF-8 ArrayBuffer */
  originalBuffer: ArrayBuffer;
  /** Modified text encoded as UTF-8 ArrayBuffer */
  modifiedBuffer: ArrayBuffer;
}

/** Worker → main thread: diff completed successfully. */
export interface DiffWorkerResultResponse {
  type: "result";
  id: string;
  lines: DiffLine[];
  additions: number;
  deletions: number;
}

/** Worker → main thread: an error occurred. */
export interface DiffWorkerErrorResponse {
  type: "error";
  id: string;
  message: string;
}

/** Worker → main thread: progress update. */
export interface DiffWorkerProgressResponse {
  type: "progress";
  id: string;
  percent: number; // 0-100
}

/** Union of all possible worker responses. */
export type DiffWorkerResponse =
  | DiffWorkerResultResponse
  | DiffWorkerErrorResponse
  | DiffWorkerProgressResponse;
