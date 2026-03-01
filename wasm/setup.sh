#!/usr/bin/env bash
# setup.sh — Compile the Rust json-engine crate to WebAssembly.
#
# Prerequisites:
#   1. Rust + Cargo installed: https://rustup.rs
#   2. wasm-pack installed: cargo install wasm-pack
#
# Run from the project root:
#   bash wasm/setup.sh
#
# Output:
#   public/wasm/json_engine.js       ← JS bindings (loaded by wasmBridge.ts)
#   public/wasm/json_engine_bg.wasm  ← Binary WASM module

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
OUT_DIR="$PROJECT_ROOT/public/wasm"

echo "🦀  Building json-engine WASM crate..."
echo "    Source : $SCRIPT_DIR"
echo "    Output : $OUT_DIR"

# Create output directory if it doesn't exist
mkdir -p "$OUT_DIR"

# Build with wasm-pack
cd "$SCRIPT_DIR"
wasm-pack build \
  --target web \
  --out-dir "$OUT_DIR" \
  --out-name json_engine \
  --release

echo "✅  WASM build complete."
echo "    Files written to: $OUT_DIR"
echo ""
echo "    Make sure the dev server is restarted so Vite can serve the new files."
