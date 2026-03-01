/**
 * @file ConversionStrategy.ts
 * Open/Closed Principle: the strategy interface is closed for modification
 * but open for extension — add new formats by implementing this interface.
 */

import type { ConversionFormat, ConversionResult } from "./types";

/**
 * Each concrete strategy is responsible for a single output format.
 *
 * @example
 * class CsvStrategy implements ConversionStrategy {
 *   readonly format = "csv";
 *   convert(data, options) { return { ok: true, output: jsonToCsv(data, options) }; }
 * }
 */
export interface ConversionStrategy<TOptions = unknown> {
  /** Unique identifier that links this strategy to a ConversionFormat. */
  readonly format: ConversionFormat;
  /**
   * Transform parsed JSON data into the target format.
   * Must never throw — return { ok: false, error } on failure.
   */
  convert(data: unknown, options: TOptions): ConversionResult;
}

/**
 * Registry: a map of format → strategy instance.
 * The worker and ConversionService both use this structure.
 */
export type StrategyRegistry = Readonly<
  Partial<Record<ConversionFormat, ConversionStrategy>>
>;
