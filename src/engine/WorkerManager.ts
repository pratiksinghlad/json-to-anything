/**
 * @file WorkerManager.ts
 * Manages the lifecycle of the conversion Web Worker.
 *
 * Key design goals:
 * - One worker per active conversion (avoids shared state across concurrent jobs).
 * - Zero-copy data transfer via ArrayBuffer Transferables.
 * - Supports cancellation (terminates the worker mid-run).
 * - Typed promise resolution via the WorkerResponse discriminated union.
 */

import type { WorkerRequest, WorkerResponse, ConversionResult } from "./types";

/**
 * Progress callback — called whenever the worker emits a progress event.
 * percent: 0–100
 */
export type ProgressCallback = (percent: number) => void;

export class WorkerManager {
  private worker: Worker | null = null;
  private pendingRejects = new Map<string, (reason: Error) => void>();

  /**
   * Dispatches a conversion to the worker thread.
   *
   * @param request - The typed worker request (payloadBuffer will be transferred).
   * @param onProgress - Optional callback for progress updates.
   */
  dispatch(
    request: WorkerRequest,
    onProgress?: ProgressCallback
  ): { result: Promise<ConversionResult>; cancel: () => void } {
    // Lazily create a new worker for this request.
    const ConversionWorker = new Worker(
      new URL("./conversion.worker.ts", import.meta.url),
      { type: "module" }
    );

    this.worker = ConversionWorker;

    const result = new Promise<ConversionResult>((resolve, reject) => {
      this.pendingRejects.set(request.id, reject);

      ConversionWorker.onmessage = (event: MessageEvent<WorkerResponse>) => {
        const msg = event.data;

        if (msg.id !== request.id) return;

        if (msg.type === "result") {
          this.pendingRejects.delete(request.id);
          ConversionWorker.terminate();
          this.worker = null;
          resolve({ ok: true, output: msg.output });
        } else if (msg.type === "error") {
          this.pendingRejects.delete(request.id);
          ConversionWorker.terminate();
          this.worker = null;
          resolve({ ok: false, error: msg.message });
        } else if (msg.type === "progress") {
          onProgress?.(msg.percent);
        }
      };

      ConversionWorker.onerror = (event) => {
        this.pendingRejects.delete(request.id);
        ConversionWorker.terminate();
        this.worker = null;
        reject(new Error(`Worker error: ${event.message}`));
      };

      // Transfer the ArrayBuffer — zero-copy handoff
      ConversionWorker.postMessage(request, [request.payloadBuffer]);
    });

    const cancel = () => {
      const reject = this.pendingRejects.get(request.id);
      this.pendingRejects.delete(request.id);
      ConversionWorker.terminate();
      this.worker = null;
      reject?.(new Error("Conversion cancelled"));
    };

    return { result, cancel };
  }

  /** Terminates any running worker (cleanup on component unmount). */
  terminate(): void {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    for (const reject of this.pendingRejects.values()) {
      reject(new Error("WorkerManager terminated"));
    }
    this.pendingRejects.clear();
  }
}
