/**
 * Ambient module declaration for the WASM output file.
 * This file only exists at runtime after the Rust build step (wasm-pack / wasm-bindgen).
 * TypeScript cannot resolve it at compile time, so we declare it as a fallback module.
 */
declare module "/wasm/json_engine.js" {
  const init: () => Promise<void>;
  export default init;
  export function minify_json(input: string): string;
  export function pretty_print_json(input: string, indent: number): string;
}
