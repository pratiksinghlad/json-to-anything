/**
 * @file hooks/useJsonBeautifier.ts
 *
 * Encapsulates the JSON auto-beautify logic so it can be shared between
 * `BeautifyJsonPage` and any other page that needs live JSON formatting.
 *
 * Follows DRY / SRP: all "parse then format" logic lives here once.
 */

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { parseJson } from "../utils/parseJson";
import { formatJson } from "../utils/formatJson";
import { isBlankInput } from "../utils/isBlankInput";
import type { ValidationError } from "../types/validationTypes";

export type IndentOption = "2" | "4" | "tab";

export interface UseJsonBeautifierReturn {
  /** The beautified JSON string, or empty string when input is blank/invalid. */
  formattedOutput: string;
  /** Validation/parse errors from the last run. */
  errors: ValidationError[];
  /** Currently selected indent setting. */
  indent: IndentOption;
  /** Update the indent setting. */
  setIndent: (indent: IndentOption) => void;
}

/**
 * Automatically parses and re-formats `jsonInput` whenever it or `indent` changes.
 *
 * @param jsonInput - The raw JSON string to beautify.
 */
export function useJsonBeautifier(jsonInput: string): UseJsonBeautifierReturn {
  const { t } = useTranslation();

  const [indent, setIndent] = useState<IndentOption>("2");

  const { formattedOutput, errors } = useMemo(() => {
    if (isBlankInput(jsonInput)) {
      return { formattedOutput: "", errors: [] };
    }

    const parseResult = parseJson(jsonInput);
    if (!parseResult.success) {
      return {
        formattedOutput: "",
        errors: [
          {
            message: parseResult.error ?? t("errors.invalidJson"),
            line: parseResult.line,
          },
        ] satisfies ValidationError[],
      };
    }

    const indentValue = indent === "tab" ? "tab" : (parseInt(indent, 10) as number | "tab");
    const result = formatJson(jsonInput, { indent: indentValue });

    if (result.ok) {
      return { formattedOutput: result.output, errors: [] };
    }

    return { formattedOutput: "", errors: [{ message: result.error }] };
  }, [jsonInput, indent, t]);

  return { formattedOutput, errors, indent, setIndent };
}
