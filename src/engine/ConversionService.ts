/**
 * @file ConversionService.ts
 * Dependency Inversion Principle façade.
 *
 * The UI never calls strategies directly — it always goes through ConversionService.
 * Routing is governed by two configurable byte thresholds:
 *
 *   payload ≤ workerThreshold  →  synchronous JS strategy (main thread)
 *   payload > workerThreshold  →  Web Worker (non-blocking)
 *   payload > wasmThreshold    →  WASM bridge inside the worker
 */

import { WorkerManager } from "./WorkerManager";
import type { ProgressCallback } from "./WorkerManager";
import type {
  ConversionFormat,
  ConversionResult,
  ConversionServiceConfig,
} from "./types";
import type { StrategyRegistry } from "./ConversionStrategy";

// Default thresholds (bytes)
const DEFAULT_WORKER_THRESHOLD = 512 * 1024;       // 512 KB
const DEFAULT_WASM_THRESHOLD   = 4 * 1024 * 1024; // 4 MB

export interface DispatchOptions {
  onProgress?: ProgressCallback;
}

export class ConversionService {
  private readonly workerThreshold: number;
  private readonly wasmThreshold: number;
  private readonly strategies: StrategyRegistry;
  private workerManager: WorkerManager | null = null;

  /**
   * @param strategies - Registry of format → strategy pairs.
   * @param config - Optional threshold configuration.
   *
   * @example
   * const service = new ConversionService(
   *   { csv: new CsvStrategy(), xml: new XmlStrategy() },
   *   { workerThreshold: 1024 * 256 }   // 256 KB — use worker above this
   * );
   */
  constructor(strategies: StrategyRegistry, config?: ConversionServiceConfig) {
    this.strategies      = strategies;
    this.workerThreshold = config?.workerThreshold ?? DEFAULT_WORKER_THRESHOLD;
    this.wasmThreshold   = config?.wasmThreshold   ?? DEFAULT_WASM_THRESHOLD;
  }

  /**
   * Convert a JSON string to the requested format.
   * Routing is fully transparent to the caller.
   */
  async convert(
    jsonString: string,
    format: ConversionFormat,
    options: unknown,
    dispatchOptions?: DispatchOptions
  ): Promise<{ result: ConversionResult; cancel: () => void }> {
    const encoder   = new TextEncoder();
    const bytes     = encoder.encode(jsonString);
    const byteSize  = bytes.byteLength;

    // --- Parse once (main thread, string is already in memory) ---
    let parsedData: unknown;
    try {
      parsedData = JSON.parse(jsonString);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return {
        result: { ok: false, error: `Invalid JSON: ${msg}` },
        cancel: () => {/* no-op */},
      };
    }

    // ----------------------------------------------------------------
    // ROUTE 1: Small payload → synchronous main-thread strategy
    // ----------------------------------------------------------------
    if (byteSize <= this.workerThreshold) {
      const strategy = this.strategies[format];
      if (!strategy) {
        return {
          result: { ok: false, error: `No strategy registered for format: ${format}` },
          cancel: () => {/* no-op */},
        };
      }
      const result = strategy.convert(parsedData, options);
      return { result, cancel: () => {/* no-op */} };
    }

    // ----------------------------------------------------------------
    // ROUTE 2: Large payload → Worker thread (optionally with WASM)
    // ----------------------------------------------------------------
    const useWasm = byteSize > this.wasmThreshold;

    // WorkerManager is instantiated lazily and reused
    if (!this.workerManager) {
      this.workerManager = new WorkerManager();
    }

    // Copy the encoded bytes into a transferable ArrayBuffer
    const payloadBuffer = bytes.buffer.slice(0) as ArrayBuffer;

    const { result, cancel } = this.workerManager.dispatch(
      {
        id: crypto.randomUUID(),
        format,
        payloadBuffer,
        options,
        useWasm,
      },
      dispatchOptions?.onProgress
    );

    return { result: await result, cancel };
  }

  /**
   * Terminate any running worker — call on component unmount.
   */
  terminate(): void {
    this.workerManager?.terminate();
    this.workerManager = null;
  }
}
