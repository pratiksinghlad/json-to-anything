/**
 * @file hooks/useJsonBeautifier.ts
 *
 * Encapsulates the JSON auto-beautify logic so it can be shared between
 * `BeautifyJsonPage` and any other page that needs live JSON formatting.
 *
 * Follows DRY / SRP: all "parse then format" logic lives here once.
 */

import { useState, useEffect } from "react";
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

  const [formattedOutput, setFormattedOutput] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [indent, setIndent] = useState<IndentOption>("2");

  useEffect(() => {
    if (isBlankInput(jsonInput)) {
      setErrors([]);
      setFormattedOutput("");
      return;
    }

    const parseResult = parseJson(jsonInput);
    if (!parseResult.success) {
      setErrors([
        {
          message: parseResult.error ?? t("errors.invalidJson"),
          line: parseResult.line,
        },
      ]);
      setFormattedOutput("");
      return;
    }

    const indentValue = indent === "tab" ? "tab" : (parseInt(indent, 10) as number | "tab");
    const result = formatJson(jsonInput, { indent: indentValue });

    if (result.ok) {
      setFormattedOutput(result.output);
      setErrors([]);
    } else {
      setFormattedOutput("");
      setErrors([{ message: result.error }]);
    }
  }, [jsonInput, indent, t]);

  return { formattedOutput, errors, indent, setIndent };
}
