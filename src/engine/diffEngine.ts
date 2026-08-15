/**
 * @file diffEngine.ts
 * Pure, deterministic diff engine for line-by-line and character-level side-by-side diffing.
 */

import { diffLines, diffChars } from "diff";
import type {
  DiffOptions,
  DiffPart,
  DiffRow,
  DiffLine,
  DiffResult,
} from "./diffTypes";

/**
 * Splits text into individual lines preserving whitespace.
 */
export function splitTextLines(text: string): string[] {
  if (!text) return [];
  // Normalize Windows line endings
  const normalized = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n");
  // If the last character was a newline, split gives an empty string at the end.
  // We keep all lines as represented.
  return lines;
}

/**
 * Computes character-level diff parts for a paired line modification.
 */
export function computeCharParts(
  oldContent: string,
  newContent: string,
  ignoreWhitespace = false
): { leftParts: DiffPart[]; rightParts: DiffPart[] } {
  // If both lines are identical, return single equal part
  if (oldContent === newContent) {
    return {
      leftParts: [{ type: "equal", value: oldContent }],
      rightParts: [{ type: "equal", value: newContent }],
    };
  }

  const charDiffs = diffChars(oldContent, newContent);
  const leftParts: DiffPart[] = [];
  const rightParts: DiffPart[] = [];

  for (const part of charDiffs) {
    if (part.removed) {
      const isWhitespaceOnly = part.value.trim() === "";
      const type = ignoreWhitespace && isWhitespaceOnly ? "equal" : "removed";
      leftParts.push({ type, value: part.value });
    } else if (part.added) {
      const isWhitespaceOnly = part.value.trim() === "";
      const type = ignoreWhitespace && isWhitespaceOnly ? "equal" : "added";
      rightParts.push({ type, value: part.value });
    } else {
      // Unchanged segment
      leftParts.push({ type: "equal", value: part.value });
      rightParts.push({ type: "equal", value: part.value });
    }
  }

  return { leftParts, rightParts };
}

/**
 * Computes the full side-by-side diff with character-level highlighting.
 */
export function computeDiffData(
  originalText: string,
  modifiedText: string,
  options?: DiffOptions
): DiffResult {
  const ignoreWhitespace = Boolean(options?.ignoreWhitespace);

  // If both texts are empty
  if (!originalText && !modifiedText) {
    return {
      rows: [],
      lines: [],
      additions: 0,
      deletions: 0,
    };
  }

  const origLines = splitTextLines(originalText);
  const modLines = splitTextLines(modifiedText);

  // Use diffLines from jsdiff with ignoreWhitespace option
  const changes = diffLines(originalText, modifiedText, {
    ignoreWhitespace,
  });

  const rows: DiffRow[] = [];
  const lines: DiffLine[] = [];
  let origIdx = 0;
  let modIdx = 0;
  let additions = 0;
  let deletions = 0;
  let rowId = 0;

  let changeIndex = 0;
  while (changeIndex < changes.length) {
    const currentChange = changes[changeIndex];

    if (!currentChange.added && !currentChange.removed) {
      // Equal block
      const count = currentChange.count ?? splitTextLines(currentChange.value).length;
      for (let k = 0; k < count && origIdx < origLines.length && modIdx < modLines.length; k++) {
        const leftContent = origLines[origIdx++];
        const rightContent = modLines[modIdx++];
        const leftLineNum = origIdx;
        const rightLineNum = modIdx;

        rows.push({
          id: `row-${rowId++}`,
          left: {
            lineNumber: leftLineNum,
            content: leftContent,
            type: "equal",
            parts: [{ type: "equal", value: leftContent }],
          },
          right: {
            lineNumber: rightLineNum,
            content: rightContent,
            type: "equal",
            parts: [{ type: "equal", value: rightContent }],
          },
        });

        lines.push({
          type: "equal",
          content: leftContent,
          leftLineNumber: leftLineNum,
          rightLineNumber: rightLineNum,
        });
      }
      changeIndex++;
    } else {
      // Modified hunk: collect contiguous block of removals and additions
      const removedLines: string[] = [];
      const addedLines: string[] = [];
      const removedStartLine = origIdx + 1;
      const addedStartLine = modIdx + 1;

      while (changeIndex < changes.length && (changes[changeIndex].removed || changes[changeIndex].added)) {
        const change = changes[changeIndex];
        const count = change.count ?? splitTextLines(change.value).length;

        if (change.removed) {
          for (let k = 0; k < count && origIdx < origLines.length; k++) {
            removedLines.push(origLines[origIdx++]);
          }
        } else if (change.added) {
          for (let k = 0; k < count && modIdx < modLines.length; k++) {
            addedLines.push(modLines[modIdx++]);
          }
        }
        changeIndex++;
      }

      const maxLen = Math.max(removedLines.length, addedLines.length);

      for (let k = 0; k < maxLen; k++) {
        const hasLeft = k < removedLines.length;
        const hasRight = k < addedLines.length;

        const leftContent = hasLeft ? removedLines[k] : "";
        const rightContent = hasRight ? addedLines[k] : "";
        const leftNum = hasLeft ? removedStartLine + k : null;
        const rightNum = hasRight ? addedStartLine + k : null;

        if (hasLeft && hasRight) {
          // Paired modification
          const isWhitespaceOnlyDiff =
            ignoreWhitespace && leftContent.trim() === rightContent.trim();

          if (isWhitespaceOnlyDiff) {
            // Whitespace difference hidden -> treat as equal
            rows.push({
              id: `row-${rowId++}`,
              left: {
                lineNumber: leftNum,
                content: leftContent,
                type: "equal",
                parts: [{ type: "equal", value: leftContent }],
              },
              right: {
                lineNumber: rightNum,
                content: rightContent,
                type: "equal",
                parts: [{ type: "equal", value: rightContent }],
              },
            });

            lines.push({
              type: "equal",
              content: leftContent,
              leftLineNumber: leftNum,
              rightLineNumber: rightNum,
            });
          } else {
            // Character diff for replaced characters
            const { leftParts, rightParts } = computeCharParts(
              leftContent,
              rightContent,
              ignoreWhitespace
            );

            rows.push({
              id: `row-${rowId++}`,
              left: {
                lineNumber: leftNum,
                content: leftContent,
                type: "removed",
                parts: leftParts,
              },
              right: {
                lineNumber: rightNum,
                content: rightContent,
                type: "added",
                parts: rightParts,
              },
            });

            lines.push({
              type: "removed",
              content: leftContent,
              leftLineNumber: leftNum,
              rightLineNumber: null,
              parts: leftParts,
            });
            lines.push({
              type: "added",
              content: rightContent,
              leftLineNumber: null,
              rightLineNumber: rightNum,
              parts: rightParts,
            });

            deletions++;
            additions++;
          }
        } else if (hasLeft && !hasRight) {
          // Pure removal
          const isWhitespaceOnly = ignoreWhitespace && leftContent.trim() === "";

          if (isWhitespaceOnly) {
            // Hide whitespace-only removal
            rows.push({
              id: `row-${rowId++}`,
              left: {
                lineNumber: leftNum,
                content: leftContent,
                type: "equal",
                parts: [{ type: "equal", value: leftContent }],
              },
              right: {
                lineNumber: null,
                content: "",
                type: "empty",
              },
            });
          } else {
            const leftParts: DiffPart[] = [{ type: "removed", value: leftContent }];

            rows.push({
              id: `row-${rowId++}`,
              left: {
                lineNumber: leftNum,
                content: leftContent,
                type: "removed",
                parts: leftParts,
              },
              right: {
                lineNumber: null,
                content: "",
                type: "empty",
              },
            });

            lines.push({
              type: "removed",
              content: leftContent,
              leftLineNumber: leftNum,
              rightLineNumber: null,
              parts: leftParts,
            });

            deletions++;
          }
        } else if (!hasLeft && hasRight) {
          // Pure addition
          const isWhitespaceOnly = ignoreWhitespace && rightContent.trim() === "";

          if (isWhitespaceOnly) {
            // Hide whitespace-only addition
            rows.push({
              id: `row-${rowId++}`,
              left: {
                lineNumber: null,
                content: "",
                type: "empty",
              },
              right: {
                lineNumber: rightNum,
                content: rightContent,
                type: "equal",
                parts: [{ type: "equal", value: rightContent }],
              },
            });
          } else {
            const rightParts: DiffPart[] = [{ type: "added", value: rightContent }];

            rows.push({
              id: `row-${rowId++}`,
              left: {
                lineNumber: null,
                content: "",
                type: "empty",
              },
              right: {
                lineNumber: rightNum,
                content: rightContent,
                type: "added",
                parts: rightParts,
              },
            });

            lines.push({
              type: "added",
              content: rightContent,
              leftLineNumber: null,
              rightLineNumber: rightNum,
              parts: rightParts,
            });

            additions++;
          }
        }
      }
    }
  }

  return {
    rows,
    lines,
    additions,
    deletions,
  };
}
