import { useState, useEffect, useRef } from "react";
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

export default function BidirectionalConverterPage({
  primaryFormat = "json",
  secondaryFormat,
  initialDirection = "forward"
}: BidirectionalConverterPageProps) {
  const { t } = useTranslation();
  const supportsReverse = supportsReverseConversion(secondaryFormat);
  
  // State for direction: "forward" (JSON -> Format) | "reverse" (Format -> JSON)
  const [direction, setDirection] = useState<"forward" | "reverse">(initialDirection);

  // Synchronise direction and reset inputs if format changes
  useEffect(() => {
    setDirection(initialDirection);
    // When format changes (e.g. navigation), we should reset to default content
    setSecondaryInput(getDefaultContent(secondaryFormat));
    setErrors([]);
  }, [initialDirection, secondaryFormat]);

  // Input states
  const [primaryInput, setPrimaryInput] = useState(DEFAULT_JSON);
  const [secondaryInput, setSecondaryInput] = useState(() => getDefaultContent(secondaryFormat));
  
  // Output states
  const [primaryOutput, setPrimaryOutput] = useState(""); // output for reverse (raw JSON)
  const [secondaryOutput, setSecondaryOutput] = useState(""); // output for forward

  // Auto-beautify the reverse-direction JSON output using the same logic as BeautifyJsonPage
  const { formattedOutput: beautifiedPrimaryOutput } = useJsonBeautifier(primaryOutput);

  // Error state
  const [errors, setErrors] = useState<ValidationError[]>([]);

  // CSV Specific Options (Only shown when secondaryFormat is CSV)
  const [separator, setSeparator] = useState<"," | ";" | "\t">(",");
  const [includeHeader, setIncludeHeader] = useState(true);
  const [trimEmptyColumns, setTrimEmptyColumns] = useState(false);
  const [pascalCaseHeaders, setPascalCaseHeaders] = useState(false);
  const [markdownOutputFormat, setMarkdownOutputFormat] =
    useState<JsonTableOutputFormat>("markdown");
  const [graphqlRootTypeName, setGraphqlRootTypeName] = useState("Root");
  const [includeGraphqlInputs, setIncludeGraphqlInputs] = useState(true);
  const [includeGraphqlInterfaces, setIncludeGraphqlInterfaces] = useState(true);

  const { leftPanelRef, rightPanelRef } = useJsonEditorAccessibility();
  const { convert, isProcessing } = useConverter();

  // Auto-beautify the JSON input (forward direction) when valid JSON is entered/pasted.
  // A ref tracks the last value we formatted so we never re-format our own output,
  // preventing an infinite render loop while still reacting to every user change.
  const lastFormattedInputRef = useRef<string>("");
  useEffect(() => {
    if (direction !== "forward" || isBlankInput(primaryInput)) return;
    if (primaryInput === lastFormattedInputRef.current) return;

    const result = formatJson(primaryInput, { indent: 2 });
    if (result.ok && result.output !== primaryInput) {
      lastFormattedInputRef.current = result.output;
      setPrimaryInput(result.output);
    }
  }, [primaryInput, direction]);

  // Active inputs
  const activeInput = direction === "forward" ? primaryInput : secondaryInput;
  const targetFormatStr = direction === "forward" ? secondaryFormat : `${secondaryFormat}-to-json`;

  useEffect(() => {
    if (isBlankInput(activeInput)) {
      setErrors([]);
      if (direction === "forward") setSecondaryOutput("");
      else setPrimaryOutput("");
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
            setErrors([{ message: parseResult.error || "Invalid JSON", line: parseResult.line }]);
            setSecondaryOutput("");
          }
          return;
        }

        // CSV specific normalization and options
        if (secondaryFormat === "csv") {
          currentOptions = { separator, includeHeader, trimEmptyColumns, pascalCaseHeaders };
          const normalizeResult = normalizeData(parseResult.data);
          if (!normalizeResult.success) {
            if (!isCancelled) {
               setErrors([{ message: normalizeResult.error || "Invalid format for CSV" }]);
               setSecondaryOutput("");
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
        if (direction === "forward") {
          setSecondaryOutput(result.output);
        } else {
          setPrimaryOutput(result.output);
        }
        setErrors([]);
      } else {
        if (direction === "forward") setSecondaryOutput("");
        else setPrimaryOutput("");
        setErrors([{ message: result.error }]);
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
  const setLeftValue = direction === "forward" ? setPrimaryInput : setSecondaryInput;

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
      setSecondaryInput(secondaryOutput);
    } else if (newDirection === "forward" && primaryOutput) {
      setPrimaryInput(primaryOutput);
    }

    setDirection(newDirection);
    setErrors([]);
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
                  Processing...
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
                onSeparatorChange={setSeparator}
                onIncludeHeaderChange={setIncludeHeader}
                onTrimEmptyColumnsChange={setTrimEmptyColumns}
                onPascalCaseHeadersChange={setPascalCaseHeaders}
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
                      setMarkdownOutputFormat(event.target.value as JsonTableOutputFormat)
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
                    onChange={(event) => setGraphqlRootTypeName(event.target.value)}
                    sx={{ minWidth: 180 }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={includeGraphqlInputs}
                        onChange={(event) => setIncludeGraphqlInputs(event.target.checked)}
                      />
                    }
                    label={t("options.includeGraphqlInputs")}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={includeGraphqlInterfaces}
                        onChange={(event) => setIncludeGraphqlInterfaces(event.target.checked)}
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
