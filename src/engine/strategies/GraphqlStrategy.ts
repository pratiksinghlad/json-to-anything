import type { ConversionStrategy } from "../ConversionStrategy";
import type { ConversionResult, GraphqlConversionOptions } from "../types";
import { jsonToGraphql } from "../../utils/jsonToGraphql";

export class GraphqlStrategy implements ConversionStrategy<GraphqlConversionOptions> {
  readonly format = "graphql" as const;

  convert(data: unknown, options: GraphqlConversionOptions): ConversionResult {
    return jsonToGraphql(data, options);
  }
}
