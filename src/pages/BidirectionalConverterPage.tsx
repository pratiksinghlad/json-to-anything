import { useEffect, useCallback, useReducer } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import ValidationResults from "../components/ValidationResults";
import DownloadButtons from "../components/DownloadButtons";
import { isBlankInput } from "../utils/isBlankInput";
import type { ValidationError } from "../types/validationTypes";
import { useConverter } from "../hooks/useConverter";
import { useJsonEditorAccessibility } from "../hooks/useJsonEditorAccessibility";
import { useJsonBeautifier } from "../hooks/useJsonBeautifier";
import type { ConversionFormat } from "../engine/types";
import type { JsonTableOutputFormat } from "../utils/jsonToMarkdown";

// We import options for all types if needed, or pass them dynamically.
// For now we'll handle CSV specific options as an inline component just for CSV, 
// or simply provide a clean UI for the generic ones.
import OptionsBar from "../components/OptionsBar";
import { parseJson } from "../utils/parseJson";
import { formatJson } from "../utils/formatJson";
import { normalizeData } from "../utils/normalizeData";

interface BidirectionalConverterPageProps {
  primaryFormat: "json";
  secondaryFormat: string; // "csv", "xml", "yaml", "toml", "toon"
  initialDirection?: "forward" | "reverse";
}

interface ConverterState {
  direction: "forward" | "reverse";
  primaryInput: string;
  secondaryInput: string;
  primaryOutput: string;
  secondaryOutput: string;
  errors: ValidationError[];
}

interface FormatOptionsState {
  separator: "," | ";" | "\t";
  includeHeader: boolean;
  trimEmptyColumns: boolean;
  pascalCaseHeaders: boolean;
  markdownOutputFormat: JsonTableOutputFormat;
  graphqlRootTypeName: string;
  includeGraphqlInputs: boolean;
  includeGraphqlInterfaces: boolean;
}

type ConverterAction =
  | { type: "setDirection"; direction: "forward" | "reverse" }
  | { type: "setPrimaryInput"; value: string }
  | { type: "setSecondaryInput"; value: string }
  | { type: "setPrimaryOutput"; value: string }
  | { type: "setSecondaryOutput"; value: string }
  | { type: "setErrors"; errors: ValidationError[] }
  | { type: "clearActiveOutput"; direction: "forward" | "reverse" }
  | { type: "setConversionResult"; direction: "forward" | "reverse"; output: string; errors: ValidationError[] };

const converterReducer = (state: ConverterState, action: ConverterAction): ConverterState => {
  switch (action.type) {
    case "setDirection":
      return { ...state, direction: action.direction, errors: [] };
    case "setPrimaryInput":
      return { ...state, primaryInput: action.value };
    case "setSecondaryInput":
      return { ...state, secondaryInput: action.value };
    case "setPrimaryOutput":
      return { ...state, primaryOutput: action.value };
    case "setSecondaryOutput":
      return { ...state, secondaryOutput: action.value };
    case "setErrors":
      return { ...state, errors: action.errors };
    case "clearActiveOutput":
      return action.direction === "forward"
        ? { ...state, secondaryOutput: "", errors: [] }
        : { ...state, primaryOutput: "", errors: [] };
    case "setConversionResult":
      return action.direction === "forward"
        ? { ...state, secondaryOutput: action.output, errors: action.errors }
        : { ...state, primaryOutput: action.output, errors: action.errors };
    default:
      return state;
  }
};

type FormatOptionsAction =
  | { type: "setSeparator"; value: "," | ";" | "\t" }
  | { type: "setIncludeHeader"; value: boolean }
  | { type: "setTrimEmptyColumns"; value: boolean }
  | { type: "setPascalCaseHeaders"; value: boolean }
  | { type: "setMarkdownOutputFormat"; value: JsonTableOutputFormat }
  | { type: "setGraphqlRootTypeName"; value: string }
  | { type: "setIncludeGraphqlInputs"; value: boolean }
  | { type: "setIncludeGraphqlInterfaces"; value: boolean };

const formatOptionsReducer = (
  state: FormatOptionsState,
  action: FormatOptionsAction,
): FormatOptionsState => {
  switch (action.type) {
    case "setSeparator":
      return { ...state, separator: action.value };
    case "setIncludeHeader":
      return { ...state, includeHeader: action.value };
    case "setTrimEmptyColumns":
      return { ...state, trimEmptyColumns: action.value };
    case "setPascalCaseHeaders":
      return { ...state, pascalCaseHeaders: action.value };
    case "setMarkdownOutputFormat":
      return { ...state, markdownOutputFormat: action.value };
    case "setGraphqlRootTypeName":
      return { ...state, graphqlRootTypeName: action.value };
    case "setIncludeGraphqlInputs":
      return { ...state, includeGraphqlInputs: action.value };
    case "setIncludeGraphqlInterfaces":
      return { ...state, includeGraphqlInterfaces: action.value };
    default:
      return state;
  }
};

const DEFAULT_JSON = `{
  "sample": "data",
  "items": [1, 2, 3]
}`;

// Sample default content based on format
const getDefaultContent = (format: string) => {
  switch (format) {
    case "csv": return `sample,items\ndata,1\n,2\n,3`;
    case "xml": return `<root>\n  <sample>data</sample>\n  <items>1</items>\n  <items>2</items>\n  <items>3</items>\n</root>`;
    case "yaml": return `sample: data\nitems:\n  - 1\n  - 2\n  - 3`;
    case "toml": return `sample = "data"\nitems = [1, 2, 3]`;
    case "graphql": return `type Root {\n  sample: String!\n  items: [Int!]!\n}`;
    case "markdown": return `| sample | items |\n| --- | --- |\n| data | [1,2,3] |`;
    default: return ``;
  }
};

const supportsReverseConversion = (format: string) =>
  ["csv", "xml", "yaml", "toml"].includes(format);

const getOutputLanguage = (format: string, markdownOutputFormat: JsonTableOutputFormat) => {
  if (format === "markdown") {
    return markdownOutputFormat === "html" ? "html" : "markdown";
  }

  return format;
};

const getDownloadDataProps = (
  format: string,
  value: string,
  markdownOutputFormat: JsonTableOutputFormat,
) => {
  if (format === "markdown") {
    return markdownOutputFormat === "html" ? { htmlData: value } : { markdownData: value };
  }

  return { [`${format}Data`]: value };
};

// oxlint-disable-next-line react-doctor/no-giant-component -- This page composes shared editor panels and delegates conversion work to hooks/workers.
export default function BidirectionalConverterPage({
  primaryFormat = "json",
  secondaryFormat,
  initialDirection = "forward"
}: BidirectionalConverterPageProps) {
  const { t } = useTranslation();
  const supportsReverse = supportsReverseConversion(secondaryFormat);
  const [converterState, dispatchConverter] = useReducer(converterReducer, {
    direction: initialDirection,
    primaryInput: DEFAULT_JSON,
    secondaryInput: getDefaultContent(secondaryFormat),
    primaryOutput: "",
    secondaryOutput: "",
    errors: [],
  });

  const {
    direction,
    primaryInput,
    secondaryInput,
    primaryOutput,
    secondaryOutput,
    errors,
  } = converterState;

  const { formattedOutput: beautifiedPrimaryOutput } = useJsonBeautifier(primaryOutput);

  const [formatOptions, dispatchFormatOptions] = useReducer(formatOptionsReducer, {
    separator: ",",
    includeHeader: true,
    trimEmptyColumns: false,
    pascalCaseHeaders: false,
    markdownOutputFormat: "markdown",
    graphqlRootTypeName: "Root",
    includeGraphqlInputs: true,
    includeGraphqlInterfaces: true,
  });
  const {
    separator,
    includeHeader,
    trimEmptyColumns,
    pascalCaseHeaders,
    markdownOutputFormat,
    graphqlRootTypeName,
    includeGraphqlInputs,
    includeGraphqlInterfaces,
  } = formatOptions;

  const { leftPanelRef, rightPanelRef } = useJsonEditorAccessibility();
  const { convert, isProcessing } = useConverter();

  const handlePrimaryInputChange = useCallback(
    (nextValue: string) => {
      if (direction !== "forward" || isBlankInput(nextValue)) {
        dispatchConverter({ type: "setPrimaryInput", value: nextValue });
        return;
      }

      const result = formatJson(nextValue, { indent: 2 });
      dispatchConverter({ type: "setPrimaryInput", value: result.ok ? result.output : nextValue });
    },
    [direction],
  );

  // Active inputs
  const activeInput = direction === "forward" ? primaryInput : secondaryInput;
  const targetFormatStr = direction === "forward" ? secondaryFormat : `${secondaryFormat}-to-json`;

  useEffect(() => {
    if (isBlankInput(activeInput)) {
      dispatchConverter({ type: "clearActiveOutput", direction });
      return;
    }

    let isCancelled = false;

    const doConvert = async () => {
      let currentOptions: Record<string, unknown> = {};
      
      // Fast manual JSON parse validation for forward direction
      if (direction === "forward") {
        const parseResult = parseJson(activeInput);
        if (!parseResult.success) {
          if (!isCancelled) {
            dispatchConverter({
              type: "setConversionResult",
              direction,
              output: "",
              errors: [{ message: parseResult.error || "Invalid JSON", line: parseResult.line }],
            });
          }
          return;
        }

        // CSV specific normalization and options
        if (secondaryFormat === "csv") {
          currentOptions = { separator, includeHeader, trimEmptyColumns, pascalCaseHeaders };
          const normalizeResult = normalizeData(parseResult.data);
          if (!normalizeResult.success) {
            if (!isCancelled) {
              dispatchConverter({
                type: "setConversionResult",
                direction,
                output: "",
                errors: [{ message: normalizeResult.error || "Invalid format for CSV" }],
              });
            }
            return;
          }
        } else if (secondaryFormat === "markdown") {
          currentOptions = { outputFormat: markdownOutputFormat };
        } else if (secondaryFormat === "graphql") {
          currentOptions = {
            rootTypeName: graphqlRootTypeName,
            includeInputTypes: includeGraphqlInputs,
            includeInterfaces: includeGraphqlInterfaces,
          };
        }
      } else {
        // Reverse direction specific options
        if (secondaryFormat === "csv") {
           currentOptions = { delimiter: separator, hasHeader: includeHeader, outputType: "array" };
        }
      }

      const result = await convert(
        activeInput, 
        targetFormatStr as ConversionFormat, 
        currentOptions
      );

      if (isCancelled) return;

      if (result.ok) {
        dispatchConverter({ type: "setConversionResult", direction, output: result.output, errors: [] });
      } else {
        dispatchConverter({
          type: "setConversionResult",
          direction,
          output: "",
          errors: [{ message: result.error }],
        });
      }
    };

    doConvert();

    return () => { isCancelled = true; };
  }, [
    activeInput,
    direction,
    secondaryFormat,
    targetFormatStr,
    convert,
    separator,
    includeHeader,
    trimEmptyColumns,
    pascalCaseHeaders,
    markdownOutputFormat,
    graphqlRootTypeName,
    includeGraphqlInputs,
    includeGraphqlInterfaces,
  ]);

  // Derived labels
  const primaryLabel = primaryFormat.toUpperCase();
  const secondaryLabel = secondaryFormat.toUpperCase();
  
  const leftLabel = direction === "forward" ? primaryLabel : secondaryLabel;
  const leftValue = direction === "forward" ? primaryInput : secondaryInput;
  const leftLanguage = direction === "forward" ? primaryFormat : secondaryFormat;
  const setLeftValue =
    direction === "forward"
      ? handlePrimaryInputChange
      : (value: string) => dispatchConverter({ type: "setSecondaryInput", value });

  const rightLabel =
    direction === "forward" && secondaryFormat === "markdown"
      ? markdownOutputFormat.toUpperCase()
      : direction === "forward"
        ? secondaryLabel
        : primaryLabel;
  // Use the auto-beautified output when JSON is on the right (reverse direction)
  const rightValue = direction === "forward" ? secondaryOutput : beautifiedPrimaryOutput;
  const rightLanguage =
    direction === "forward"
      ? getOutputLanguage(secondaryFormat, markdownOutputFormat)
      : primaryFormat;

  const handleToggleDirection = () => {
    if (!supportsReverse) return;

    const newDirection = direction === "forward" ? "reverse" : "forward";
    
    // Transfer current output to new input for continuity
    if (newDirection === "reverse" && secondaryOutput) {
      dispatchConverter({ type: "setSecondaryInput", value: secondaryOutput });
    } else if (newDirection === "forward" && primaryOutput) {
      dispatchConverter({ type: "setPrimaryInput", value: primaryOutput });
    }

    dispatchConverter({ type: "setDirection", direction: newDirection });
  };

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>

      <JsonEditorLayout
        leftPanel={
          <EditorPanel
            ref={leftPanelRef}
            title={leftLabel}
            formatLabel={leftLabel}
            value={leftValue}
            onChange={setLeftValue}
            language={leftLanguage}
          />
        }
        centerPanel={<CenterPanel onSwap={supportsReverse ? handleToggleDirection : undefined} />}
        rightPanel={
          <EditorPanel
            ref={rightPanelRef}
            title={rightLabel}
            formatLabel={rightLabel}
            value={rightValue}
            language={rightLanguage}
            readOnly={true}
          />
        }
        bottomPanel={
          <Box sx={{ p: 2 }}>
            {isProcessing && (
              <Box sx={{ mb: 2 }}>
                <LinearProgress />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  Processing…
                </Typography>
              </Box>
            )}

            <ValidationResults errors={errors} />
            
            <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap", mb: 2 }}>
              <DownloadButtons
                {...(direction === "forward"
                  ? getDownloadDataProps(secondaryFormat, rightValue, markdownOutputFormat)
                  : { jsonData: rightValue })}
                jsonData={direction === "forward" ? primaryInput : rightValue}
                disabled={!rightValue} 
              />
            </Box>

            {secondaryFormat === "csv" && !isBlankInput(activeInput) && (
              <OptionsBar
                separator={separator}
                includeHeader={includeHeader}
                trimEmptyColumns={trimEmptyColumns}
                pascalCaseHeaders={pascalCaseHeaders}
                onSeparatorChange={(value) => dispatchFormatOptions({ type: "setSeparator", value })}
                onIncludeHeaderChange={(value) =>
                  dispatchFormatOptions({ type: "setIncludeHeader", value })
                }
                onTrimEmptyColumnsChange={(value) =>
                  dispatchFormatOptions({ type: "setTrimEmptyColumns", value })
                }
                onPascalCaseHeadersChange={(value) =>
                  dispatchFormatOptions({ type: "setPascalCaseHeaders", value })
                }
              />
            )}

            {secondaryFormat === "markdown" && direction === "forward" && !isBlankInput(activeInput) && (
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  mb: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                }}
              >
                <FormControl size="small" sx={{ minWidth: 220 }}>
                  <InputLabel id="table-output-format-label">
                    {t("options.tableOutputFormat")}
                  </InputLabel>
                  <Select
                    labelId="table-output-format-label"
                    value={markdownOutputFormat}
                    label={t("options.tableOutputFormat")}
                    onChange={(event: SelectChangeEvent) =>
                      dispatchFormatOptions({
                        type: "setMarkdownOutputFormat",
                        value: event.target.value as JsonTableOutputFormat,
                      })
                    }
                  >
                    <MenuItem value="markdown">{t("options.markdownTable")}</MenuItem>
                    <MenuItem value="html">{t("options.htmlTable")}</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            )}

            {secondaryFormat === "graphql" && direction === "forward" && !isBlankInput(activeInput) && (
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  mb: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "12px",
                  backgroundColor: "#ffffff",
                }}
              >
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
                  <TextField
                    size="small"
                    label={t("options.graphqlRootType")}
                    value={graphqlRootTypeName}
                    onChange={(event) =>
                      dispatchFormatOptions({
                        type: "setGraphqlRootTypeName",
                        value: event.target.value,
                      })
                    }
                    sx={{ minWidth: 180 }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={includeGraphqlInputs}
                        onChange={(event) =>
                          dispatchFormatOptions({
                            type: "setIncludeGraphqlInputs",
                            value: event.target.checked,
                          })
                        }
                      />
                    }
                    label={t("options.includeGraphqlInputs")}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={includeGraphqlInterfaces}
                        onChange={(event) =>
                          dispatchFormatOptions({
                            type: "setIncludeGraphqlInterfaces",
                            value: event.target.checked,
                          })
                        }
                      />
                    }
                    label={t("options.includeGraphqlInterfaces")}
                  />
                </Stack>
              </Paper>
            )}
          </Box>
        }
      />
    </Box>
  );
}
