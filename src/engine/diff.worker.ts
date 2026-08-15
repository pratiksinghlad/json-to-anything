/**
 * @file diff.worker.ts
 * Web Worker for computing diffs off the main thread.
 * Imported via Vite's `?worker` syntax.
 */

import type {
  DiffWorkerRequest,
  DiffWorkerResponse,
} from "./diffTypes";
import { computeDiffData } from "./diffEngine";

self.onmessage = (event: MessageEvent<DiffWorkerRequest>) => {
  const { id, originalBuffer, modifiedBuffer, options } = event.data;

  const post = (msg: DiffWorkerResponse) => self.postMessage(msg);

  try {
    post({ type: "progress", id, percent: 10 });

    const decoder = new TextDecoder();
    const originalText = decoder.decode(originalBuffer);
    const modifiedText = decoder.decode(modifiedBuffer);

    post({ type: "progress", id, percent: 40 });

    const diffResult = computeDiffData(originalText, modifiedText, options);

    post({ type: "progress", id, percent: 100 });
    post({
      type: "result",
      id,
      rows: diffResult.rows,
      lines: diffResult.lines,
      additions: diffResult.additions,
      deletions: diffResult.deletions,
    });
  } catch (e) {
    post({
      type: "error",
      id,
      message: `Diff computation error: ${e instanceof Error ? e.message : String(e)}`,
    });
  }
};
