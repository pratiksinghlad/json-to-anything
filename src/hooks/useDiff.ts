/**
 * @file useDiff.ts
 * React hook providing a clean interface to the Diff web worker.
 */

import { useState, useCallback, useRef, useEffect } from "react";
import type {
  DiffWorkerRequest,
  DiffWorkerResponse,
  DiffLine,
} from "../engine/diffTypes";

export interface DiffResultData {
  lines: DiffLine[];
  additions: number;
  deletions: number;
}

export interface UseDiffReturn {
  computeDiff: (originalText: string, modifiedText: string) => Promise<DiffResultData>;
  result: DiffResultData | null;
  progress: number;
  error: string | null;
  isComparing: boolean;
  cancel: () => void;
}

export function useDiff(): UseDiffReturn {
  const [result, setResult] = useState<DiffResultData | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const workerRef = useRef<Worker | null>(null);
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const cancel = useCallback(() => {
    cancelRef.current?.();
    cancelRef.current = null;
    if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
    }
    setIsComparing(false);
    setProgress(0);
    setError("Diff computation cancelled");
  }, []);

  const computeDiff = useCallback(async (
    originalText: string,
    modifiedText: string
  ): Promise<DiffResultData> => {
    setIsComparing(true);
    setResult(null);
    setError(null);
    setProgress(0);

    // Terminate existing worker if running
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    workerRef.current = new Worker(
      new URL("../engine/diff.worker.ts", import.meta.url),
      { type: "module" }
    );

    return new Promise<DiffResultData>((resolve, reject) => {
      cancelRef.current = () => reject(new Error("Diff computation cancelled"));

      workerRef.current!.onmessage = (event: MessageEvent<DiffWorkerResponse>) => {
        const msg = event.data;

        if (msg.type === "result") {
          workerRef.current?.terminate();
          workerRef.current = null;
          
          const diffResult = {
            lines: msg.lines,
            additions: msg.additions,
            deletions: msg.deletions,
          };
          
          setResult(diffResult);
          setProgress(100);
          setIsComparing(false);
          resolve(diffResult);
          
        } else if (msg.type === "error") {
          workerRef.current?.terminate();
          workerRef.current = null;
          
          setError(msg.message);
          setIsComparing(false);
          reject(new Error(msg.message));
          
        } else if (msg.type === "progress") {
          setProgress(msg.percent);
        }
      };

      workerRef.current!.onerror = (event) => {
        workerRef.current?.terminate();
        workerRef.current = null;
        
        setError(`Worker error: ${event.message}`);
        setIsComparing(false);
        reject(new Error(`Worker error: ${event.message}`));
      };

      // Encode texts
      const encoder = new TextEncoder();
      const originalBytes = encoder.encode(originalText);
      const modifiedBytes = encoder.encode(modifiedText);

      const request: DiffWorkerRequest = {
        id: crypto.randomUUID(),
        originalBuffer: originalBytes.buffer.slice(0) as ArrayBuffer,
        modifiedBuffer: modifiedBytes.buffer.slice(0) as ArrayBuffer,
      };

      workerRef.current!.postMessage(request, [request.originalBuffer, request.modifiedBuffer]);
    });
  }, []);

  return { computeDiff, result, progress, error, isComparing, cancel };
}
