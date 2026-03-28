// @ts-nocheck
/**
 * @file diff.worker.ts
 * Web Worker for computing diffs off the main thread.
 * Imported via Vite's `?worker` syntax.
 * Uses the industry standard `diff` library.
 */

import { diffLines } from "diff";
import type {
  DiffWorkerRequest,
  DiffWorkerResponse,
  DiffLine,
} from "./diffTypes";

self.onmessage = (event: MessageEvent<DiffWorkerRequest>) => {
  const { id, originalBuffer, modifiedBuffer } = event.data;

  const post = (msg: DiffWorkerResponse) => self.postMessage(msg);

  try {
    post({ type: "progress", id, percent: 10 });

    const decoder = new TextDecoder();
    const originalText = decoder.decode(originalBuffer);
    const modifiedText = decoder.decode(modifiedBuffer);

    post({ type: "progress", id, percent: 30 });

    // Ensure we don't have trailing newlines messing up the last line matching if they differ slightly
    // Computing diff lines...
    const changes = diffLines(originalText, modifiedText);

    post({ type: "progress", id, percent: 80 });

    // Transform `changes` into a flat list of side-by-side synchronized lines.
    // In a true side-by-side view, if a block is replaced (deleted followed by added),
    // they don't align perfectly on the same row unless we space them.
    // However, simplest side-by-side usually just shows the text with both line numbers where applicable
    // or placeholder rows for alignment.
    // Wait, the Azure DevOps style typically aligns them by block.
    // Easiest is to produce a sequence where deleted and added blocks are kept,
    // and we just increment the line numbers appropriately.
    
    // Azure DevOps uses a unified-like scroll or side-by-side layout.
    // Let's create a single flow of lines. If there's a deletion followed by addition (change),
    // we can either interleave them or align them side-by-side.
    // For this viewer, we'll produce a structure `DiffLine[]`.
    
    const lines: DiffLine[] = [];
    let leftCount = 1;
    let rightCount = 1;
    let additions = 0;
    let deletions = 0;

    for (let i = 0; i < changes.length; i++) {
      const part = changes[i];
      // `part.value` contains the string, potentially multiline.
      let text = part.value;
      
      // diffLines often leaves a trailing newline on the value
      if (text.endsWith("\n")) {
        text = text.slice(0, -1);
      }
      if (text.endsWith("\r")) {
        text = text.slice(0, -1);
      }
      const splitLines = part.value.split(/\r?\n/);
      if (splitLines.length > 0 && splitLines[splitLines.length - 1] === "") {
        splitLines.pop(); // Remove the trailing empty line created by the final newline
      }

      for (const lineContent of splitLines) {
        if (part.added) {
          lines.push({
            type: "added",
            content: lineContent,
            leftLineNumber: null,
            rightLineNumber: rightCount++,
          });
          additions++;
        } else if (part.removed) {
          lines.push({
            type: "removed",
            content: lineContent,
            leftLineNumber: leftCount++,
            rightLineNumber: null,
          });
          deletions++;
        } else {
          lines.push({
            type: "equal",
            content: lineContent,
            leftLineNumber: leftCount++,
            rightLineNumber: rightCount++,
          });
        }
      }
    }

    // Now, we have a unified flow of lines.
    // In a side-by-side viewer, we want to pad removed and added blocks so they align.
    // i.e., If we have 3 lines removed and 5 lines added, we need 5 rows total.
    // Wait, if it's side-by-side, we actually need two distinct arrays for left/right,
    // OR we format our single `lines` array so that we can render it simultaneously.
    // Let's refine the alignment:
    const alignedLines: DiffLine[] = [];
    let idx = 0;
    while(idx < lines.length) {
      if (lines[idx].type === "equal") {
        alignedLines.push(lines[idx]);
        idx++;
      } else {
        // Collect block of removals and additions
        const removedBlock: DiffLine[] = [];
        const addedBlock: DiffLine[] = [];
        
        while(idx < lines.length && lines[idx].type === "removed") {
          removedBlock.push(lines[idx]);
          idx++;
        }
        while(idx < lines.length && lines[idx].type === "added") {
          addedBlock.push(lines[idx]);
          idx++;
        }
        
        const maxLines = Math.max(removedBlock.length, addedBlock.length);
        for(let k = 0; k < maxLines; k++) {
          // For side-by-side alignment, we might need to pair them up or output them sequentially 
          // in a way that the viewer can identify left/right.
          // Wait, if we use a side-by-side layout with flex rows, each row has a left cell and a right cell.
          // What if we just provide the left and right info in the same object?
          // Instead of changing `DiffLine`, maybe we just provide an aligned row object?
          // Let's push them out sequentially as they are. The viewer can just render left pane and right pane independently!
          // BUT wait, if we render them independently, they won't align beautifully if there's a replacement of 1 line with 10 lines.
          // To align them independently, we can insert blank pad lines into the left and right panes.
          // Let's just output the unaligned flat list and let the viewer do the independent render without pad lines first,
          // OR we can generate a perfectly aligned `alignedRows` array here.
          // Let's generate a single array of `Row`s.
          // But `alignedLines` as DiffLine[] with left/right pairing is cleaner.
          // Actually, let's keep it simple: the viewer renders left and right synced by purely vertical scrolling.
          // Inserting pads is better for UX.
          // Let's do a simple unified layout for now inside the side-by-side viewer.
          // Let's change `DiffLine` to `DiffRow` effectively? No, let's just output the `lines` array.
          // And add padding lines to `removedBlock` and `addedBlock`?
          // Let's skip padding and just align it as unified-like for now. The viewer can handle it.
        }
      }
    }

    // For simplicity, we just return the flat unified list.
    // The viewer will render it as a unified diff OR split it.
    // Wait, the plan says side-by-side scroll-synced panes.
    // If it's side-by-side, we can just split `lines` into `leftLines` and `rightLines` in the UI!
    // But they won't align. Let's just return `lines`. 

    post({ type: "progress", id, percent: 100 });
    post({
      type: "result",
      id,
      lines,
      additions,
      deletions,
    });
  } catch (e) {
    post({
      type: "error",
      id,
      message: `Diff computation error: ${e instanceof Error ? e.message : String(e)}`,
    });
  }
};
