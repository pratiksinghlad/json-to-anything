/**
 * @file hooks/useConverter.ts
 * React hook providing a clean interface to ConversionService.
 *
 * Usage:
 * ```tsx
 * const { convert, result, progress, error, isProcessing, cancel } = useConverter({
 *   workerThreshold: 256 * 1024   // override: use worker above 256 KB
 * });
 *
 * await convert(jsonString, "csv", { separator: ",", includeHeader: true });
 * ```
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { ConversionService }   from "../engine/ConversionService";
import { CsvStrategy }         from "../engine/strategies/CsvStrategy";
import { XmlStrategy }         from "../engine/strategies/XmlStrategy";
import { ToonStrategy }        from "../engine/strategies/ToonStrategy";
import { JsonPrettyStrategy, JsonMinifyStrategy } from "../engine/strategies/JsonPrettyStrategy";
import { YamlStrategy }        from "../engine/strategies/YamlStrategy";
import { TomlStrategy }        from "../engine/strategies/TomlStrategy";
import { GraphqlStrategy }     from "../engine/strategies/GraphqlStrategy";
import { MarkdownStrategy }    from "../engine/strategies/MarkdownStrategy";
import { CsvToJsonStrategy }   from "../engine/strategies/CsvToJsonStrategy";
import { XmlToJsonStrategy }   from "../engine/strategies/XmlToJsonStrategy";
import { YamlToJsonStrategy }  from "../engine/strategies/YamlToJsonStrategy";
import { TomlToJsonStrategy }  from "../engine/strategies/TomlToJsonStrategy";


import type {
  ConversionFormat,
  ConversionResult,
  ConversionServiceConfig,
} from "../engine/types";

// Built-in strategy registry — add new strategies here to auto-register them
const DEFAULT_STRATEGIES = {
  csv:             new CsvStrategy(),
  xml:             new XmlStrategy(),
  toon:            new ToonStrategy(),
  "json-pretty":   new JsonPrettyStrategy(),
  "json-minify":   new JsonMinifyStrategy(),
  yaml:            new YamlStrategy(),
  toml:            new TomlStrategy(),
  graphql:         new GraphqlStrategy(),
  markdown:        new MarkdownStrategy(),
  "csv-to-json":   new CsvToJsonStrategy(),
  "xml-to-json":   new XmlToJsonStrategy(),
  "yaml-to-json":  new YamlToJsonStrategy(),
  "toml-to-json":  new TomlToJsonStrategy(),
} as const;

export interface UseConverterReturn {
  /** Trigger a conversion. Resolves when complete. */
  convert: (
    jsonString: string,
    format: ConversionFormat,
    options?: unknown
  ) => Promise<ConversionResult>;
  /** The success output or null while idle / processing. */
  result: string | null;
  /** 0–100 — only meaningful while isProcessing is true. */
  progress: number;
  /** Error message if conversion failed. */
  error: string | null;
  /** True while a worker-based conversion is in flight. */
  isProcessing: boolean;
  /** Abort and terminate the running worker (if any). */
  cancel: () => void;
}

/**
 * @param config - Optional ConversionServiceConfig to override thresholds.
 */
export function useConverter(config?: ConversionServiceConfig): UseConverterReturn {
  const [result,      setResult]      = useState<string | null>(null);
  const [progress,    setProgress]    = useState<number>(0);
  const [error,       setError]       = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Stable service reference — recreated only when config changes
  const serviceRef   = useRef<ConversionService | null>(null);
  const cancelRef    = useRef<(() => void) | null>(null);

  // Initialise (or re-initialise) the service when config changes
  useEffect(() => {
    serviceRef.current = new ConversionService(DEFAULT_STRATEGIES, config);
    return () => {
      serviceRef.current?.terminate();
      serviceRef.current = null;
    };
  // We intentionally stringify config for stable comparison
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.workerThreshold, config?.wasmThreshold]);

  const cancel = useCallback(() => {
    cancelRef.current?.();
    cancelRef.current = null;
    setIsProcessing(false);
    setProgress(0);
    setError("Conversion cancelled");
  }, []);

  const convert = useCallback(async (
    jsonString: string,
    format: ConversionFormat,
    options: unknown = {}
  ): Promise<ConversionResult> => {
    if (!serviceRef.current) {
      const errResult: ConversionResult = { ok: false, error: "Service not initialised" };
      setError(errResult.error);
      return errResult;
    }

    setIsProcessing(true);
    setResult(null);
    setError(null);
    setProgress(0);

    try {
      const { result: convResult, cancel: cancelFn } = await serviceRef.current.convert(
        jsonString,
        format,
        options,
        { onProgress: setProgress }
      );

      cancelRef.current = cancelFn;

      if (convResult.ok) {
        setResult(convResult.output);
        setProgress(100);
      } else {
        setError(convResult.error);
      }

      return convResult;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setIsProcessing(false);
      cancelRef.current = null;
    }
  }, []);

  return { convert, result, progress, error, isProcessing, cancel };
}
