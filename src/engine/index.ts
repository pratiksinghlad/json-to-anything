/**
 * @file engine/index.ts
 * Public barrel export for the conversion engine.
 * When published as an npm package, all public API surfaces from this file.
 */

// Types
export type {
  ConversionFormat,
  ConversionResult,
  ConversionServiceConfig,
  CsvConversionOptions,
  XmlConversionOptions,
  ToonConversionOptions,
  JsonPrettyOptions,
  JsonMinifyOptions,
  WorkerRequest,
  WorkerResponse,
} from "./types";

// Interfaces
export type { ConversionStrategy, StrategyRegistry } from "./ConversionStrategy";

// Service (main entry point)
export { ConversionService }     from "./ConversionService";
export { WorkerManager }         from "./WorkerManager";
export { getWasmEngine, isWasmLoaded } from "./wasmBridge";

// Built-in strategies (consumers can override or extend)
export { CsvStrategy }           from "./strategies/CsvStrategy";
export { XmlStrategy }           from "./strategies/XmlStrategy";
export { ToonStrategy }          from "./strategies/ToonStrategy";
export { JsonPrettyStrategy, JsonMinifyStrategy } from "./strategies/JsonPrettyStrategy";
