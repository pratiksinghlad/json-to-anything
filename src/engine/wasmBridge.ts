// @ts-nocheck
/**
 * @file wasmBridge.ts
 * Lazy-loads the Rust/wasm-bindgen module only when needed (> wasmThreshold).
 * Exposes a clean, typed API so callers never touch wasm-bindgen internals directly.
 *
 * The WASM module is compiled via wasm/setup.sh and output to public/wasm/.
 * In a Vite build this resolves to /json-to-anything/wasm/json_engine.js.
 */

export interface WasmJsonEngine {
  minify_json(input: string): string;
  pretty_print_json(input: string, indent: number): string;
}

let _module: WasmJsonEngine | null = null;
let _loading: Promise<WasmJsonEngine> | null = null;

/**
 * Returns the initialised WASM module, loading it exactly once on first call.
 * Subsequent calls return the cached instance.
 */
export async function getWasmEngine(): Promise<WasmJsonEngine> {
  if (_module) return _module;

  if (_loading) return _loading;

  _loading = (async () => {
    try {
      // Dynamic import: Vite/bundler resolves this at runtime.
      // The path is relative to the public directory root.
      // The module shape is declared in src/wasm.d.ts for TS compile-time resolution.
      const wasmModule = await import(
        /* @vite-ignore */
        "/wasm/json_engine.js"
      ) as Record<string, unknown>;

      // wasm-bindgen emits a default export with an init() function
      if (typeof wasmModule.default === "function") {
        await (wasmModule.default as () => Promise<void>)();
      }

      _module = wasmModule as unknown as WasmJsonEngine;
      return _module;
    } catch (e) {
      _loading = null; // Allow retry on next call
      throw new Error(
        `Failed to load WASM engine: ${e instanceof Error ? e.message : String(e)}`
      );
    }
  })();

  return _loading;
}

/**
 * Returns true if the WASM module is already loaded (no async wait needed).
 */
export function isWasmLoaded(): boolean {
  return _module !== null;
}
