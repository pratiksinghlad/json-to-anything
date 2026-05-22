import type { ConversionStrategy } from "../ConversionStrategy";
import type { ConversionResult, MarkdownConversionOptions } from "../types";
import { jsonToMarkdownTable } from "../../utils/jsonToMarkdown";

export class MarkdownStrategy implements ConversionStrategy<MarkdownConversionOptions> {
  readonly format = "markdown" as const;

  convert(data: unknown, options: MarkdownConversionOptions): ConversionResult {
    return jsonToMarkdownTable(data, options);
  }
}
