# @json-to-anything/engine

A production-ready, **SOLID + DRY** JSON conversion engine with automatic **Web Worker** and **WASM** acceleration for payloads beyond configurable byte thresholds.

---

## Architecture

```
Input JSON String
      │
      ▼
ConversionService (configurable thresholds)
  ├── ≤ workerThreshold (default 512 KB)  →  JS strategy, main thread (sync)
  ├── > workerThreshold                   →  Web Worker (non-blocking)
  │         └── > wasmThreshold (4 MB)   →  WASM bridge (Rust/wasm-bindgen)
  └── result: Promise<ConversionResult>
```

---

## Quick Start

### 1. Install

```bash
# If used as a local package within the monorepo:
import { useConverter } from "./src/hooks/useConverter";

# If published to npm:
npm install @json-to-anything/engine
```

### 2. React Hook — `useConverter`

```tsx
import { useConverter } from "@json-to-anything/engine";

function MyComponent() {
  const { convert, result, progress, error, isProcessing, cancel } = useConverter({
    workerThreshold: 256 * 1024, // use worker above 256 KB (override default 512 KB)
    wasmThreshold: 2 * 1024 * 1024, // use WASM above 2 MB (override default 4 MB)
  });

  const handleConvert = async () => {
    await convert(jsonString, "csv", {
      separator: ",",
      includeHeader: true,
      pascalCaseHeaders: true,
    });
  };

  return (
    <div>
      <button onClick={handleConvert} disabled={isProcessing}>
        Convert
      </button>
      {isProcessing && <progress value={progress} max={100} />}
      {error && <p className="error">{error}</p>}
      {result && <pre>{result}</pre>}
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}
```

### 3. Low-Level — `ConversionService`

```ts
import {
  ConversionService,
  CsvStrategy,
  XmlStrategy,
  ToonStrategy,
} from "@json-to-anything/engine";

const service = new ConversionService(
  {
    csv: new CsvStrategy(),
    xml: new XmlStrategy(),
    toon: new ToonStrategy(),
  },
  { workerThreshold: 512 * 1024, wasmThreshold: 4 * 1024 * 1024 },
);

const { result } = await service.convert(JSON.stringify(myData), "csv", {
  separator: ",",
  includeHeader: true,
});

if (result.ok) {
  console.log(result.output);
} else {
  console.error(result.error);
}

// Always terminate when done
service.terminate();
```

---

## Supported Formats

| Format        | `ConversionFormat` key | Strategy class       | WASM accelerated         |
| ------------- | ---------------------- | -------------------- | ------------------------ |
| CSV           | `"csv"`                | `CsvStrategy`        | ✗                        |
| XML           | `"xml"`                | `XmlStrategy`        | ✗                        |
| TOON          | `"toon"`               | `ToonStrategy`       | ✗                        |
| Pretty JSON   | `"json-pretty"`        | `JsonPrettyStrategy` | ✅ (above wasmThreshold) |
| Minified JSON | `"json-minify"`        | `JsonMinifyStrategy` | ✅ (above wasmThreshold) |

---

## Adding a New Format (OCP)

1. Create `src/engine/strategies/YourStrategy.ts` implementing `ConversionStrategy`.
2. Add your key to the `ConversionFormat` union in `types.ts`.
3. Register in the `STRATEGY_REGISTRY` in `conversion.worker.ts`.
4. That's it — no changes to `ConversionService` or `WorkerManager`.

```ts
import type { ConversionStrategy } from "../ConversionStrategy";
import type { ConversionResult } from "../types";

export class YamlStrategy implements ConversionStrategy {
  readonly format = "yaml" as const;

  convert(data: unknown, options: unknown): ConversionResult {
    try {
      // ... your YAML conversion logic
      return { ok: true, output: yamlOutput };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }
}
```

---

## WASM Setup (Rust)

> **Only required if you need WASM acceleration for huge payloads.**

### Prerequisites

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install wasm-pack
cargo install wasm-pack
```

### Build

```bash
bash wasm/setup.sh
```

This compiles the Rust crate and outputs:

- `public/wasm/json_engine.js` — JS bindings
- `public/wasm/json_engine_bg.wasm` — binary module

The WASM module is **lazily loaded** the first time a payload exceeds `wasmThreshold` — it never loads for small/medium data.

---

## Configuration Reference

```ts
interface ConversionServiceConfig {
  /** Bytes above which Worker is used. Default: 512 KB */
  workerThreshold?: number;
  /** Bytes above which WASM is requested inside Worker. Default: 4 MB */
  wasmThreshold?: number;
}
```

---

## Performance Notes

- **Transferable objects:** The JSON payload is encoded as `ArrayBuffer` and transferred (zero-copy) to the worker.
- **Single worker per request:** Workers are created fresh per dispatch and terminated on completion to prevent shared mutable state.
- **WASM single-load:** The WASM module is cached after first load — subsequent calls are synchronous.

---

## License

MIT
