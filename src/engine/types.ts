/**
 * @file types.ts
 * Core discriminated union types for the JSON conversion engine.
 * These types govern the strict contract between the main thread and the Web Worker.
 */

// ---------------------------------------------------------------------------
// Supported output formats
// ---------------------------------------------------------------------------
export type ConversionFormat = "csv" | "xml" | "toon" | "json-pretty" | "json-minify" | "yaml" | "toml" | "csv-to-json" | "xml-to-json" | "yaml-to-json" | "toml-to-json";

// ---------------------------------------------------------------------------
// Format-specific options — extend here when adding new strategies
// ---------------------------------------------------------------------------
export interface CsvConversionOptions {
  separator: "," | ";" | "\t";
  includeHeader: boolean;
  trimEmptyColumns?: boolean;
  pascalCaseHeaders?: boolean;
}

export interface XmlConversionOptions {
  rootName?: string;
  declaration?: boolean;
  attributePrefix?: string;
  pretty?: boolean;
  indent?: number;
}

export interface ToonConversionOptions {
  delimiter?: "," | "\t" | "|";
  indentSize?: number;
  includeLengthMarkers?: boolean;
}

export interface JsonPrettyOptions {
  indent?: number | "tab";
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface JsonMinifyOptions {}

export interface YamlConversionOptions {
  indent?: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TomlConversionOptions {}

export interface CsvToJsonOptions {
  delimiter?: string;
  hasHeader?: boolean;
  outputType?: "array" | "lines";
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface XmlToJsonOptions {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface YamlToJsonOptions {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TomlToJsonOptions {}


/** Union of all strategy options — maps format → options type */
export type ConversionOptions<F extends ConversionFormat = ConversionFormat> =
  F extends "csv" ? CsvConversionOptions :
  F extends "xml" ? XmlConversionOptions :
  F extends "toon" ? ToonConversionOptions :
  F extends "json-pretty" ? JsonPrettyOptions :
  F extends "json-minify" ? JsonMinifyOptions :
  F extends "yaml" ? YamlConversionOptions :
  F extends "toml" ? TomlConversionOptions :
  F extends "csv-to-json" ? CsvToJsonOptions :
  F extends "xml-to-json" ? XmlToJsonOptions :
  F extends "yaml-to-json" ? YamlToJsonOptions :
  F extends "toml-to-json" ? TomlToJsonOptions :
  never;

// ---------------------------------------------------------------------------
// Worker message protocol (Discriminated Unions)
// ---------------------------------------------------------------------------

/**
 * Sent FROM main thread TO worker.
 * The actual JSON payload is transferred as an ArrayBuffer (zero-copy Transferable).
 */
export interface WorkerRequest {
  /** Unique correlation ID so multiple concurrent requests stay independent. */
  id: string;
  format: ConversionFormat;
  /** JSON payload encoded as UTF-8 ArrayBuffer — transferred, not copied. */
  payloadBuffer: ArrayBuffer;
  /** Format-specific options (serialisable). */
  options: unknown;
  /**
   * When true the worker will attempt to use the WASM bridge.
   * Set automatically by ConversionService when payload exceeds wasmThreshold.
   */
  useWasm: boolean;
}

/** Worker → main thread: conversion completed successfully. */
export interface WorkerResultResponse {
  type: "result";
  id: string;
  output: string;
}

/** Worker → main thread: an error occurred. */
export interface WorkerErrorResponse {
  type: "error";
  id: string;
  message: string;
}

/** Worker → main thread: progress update (for streaming / chunked processing). */
export interface WorkerProgressResponse {
  type: "progress";
  id: string;
  /** 0–100 */
  percent: number;
}

/** Union of all possible worker responses. */
export type WorkerResponse =
  | WorkerResultResponse
  | WorkerErrorResponse
  | WorkerProgressResponse;

// ---------------------------------------------------------------------------
// ConversionService configuration
// ---------------------------------------------------------------------------
/**
 * Configures the ConversionService routing behaviour.
 * Both thresholds are measured in bytes (string length ≈ UTF-16, buffer = UTF-8).
 */
export interface ConversionServiceConfig {
  /**
   * Payload byte size above which the worker thread is used.
   * Payloads at or below this threshold run synchronously on the main thread.
   * @default 512 * 1024  (512 KB)
   */
  workerThreshold?: number;
  /**
   * Payload byte size above which WASM acceleration is requested inside the worker.
   * @default 4 * 1024 * 1024  (4 MB)
   */
  wasmThreshold?: number;
}

// ---------------------------------------------------------------------------
// Generic conversion result
// ---------------------------------------------------------------------------
export type ConversionResult =
  | { ok: true; output: string }
  | { ok: false; error: string };
