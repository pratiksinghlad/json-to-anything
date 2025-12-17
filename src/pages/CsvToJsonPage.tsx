import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import { csvToJson } from "../utils/csvToJson";

const DEFAULT_CSV = `name,age,email,city
John Doe,30,john@example.com,New York
Jane Smith,25,jane@example.com,Los Angeles
Bob Johnson,35,bob@example.com,Chicago`;

type OutputType = "array" | "lines";

const CsvToJsonPage = () => {
  const { t } = useTranslation();
  const [csvInput, setCsvInput] = useState(DEFAULT_CSV);
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [delimiter, setDelimiter] = useState(",");
  const [hasHeader, setHasHeader] = useState(true);
  const [outputType, setOutputType] = useState<OutputType>("array");

  useEffect(() => {
    const result = csvToJson(csvInput, {
      delimiter,
      hasHeader,
      outputType,
    });

    if (result.ok) {
      if (outputType === "lines") {
        setJsonOutput((result.output as string[]).join("\n"));
      } else {
        setJsonOutput(JSON.stringify(result.output, null, 2));
      }
      setError(undefined);
    } else {
      setJsonOutput("");
      setError(result.error);
    }
  }, [csvInput, delimiter, hasHeader, outputType]);

  const handleDelimiterChange = (event: SelectChangeEvent) => {
    setDelimiter(event.target.value);
  };

  const handleOutputTypeChange = (event: SelectChangeEvent) => {
    setOutputType(event.target.value as OutputType);
  };

  return (
    <JsonEditorLayout
      leftPanel={
        <EditorPanel title="CSV" value={csvInput} onChange={setCsvInput} language="csv" />
      }
      centerPanel={<CenterPanel />}
      rightPanel={
        <EditorPanel title="JSON" value={jsonOutput} language="json" readOnly={true} />
      }
      bottomPanel={
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="delimiter-label">{t("pages.csvToJson.delimiter")}</InputLabel>
              <Select
                labelId="delimiter-label"
                id="delimiter"
                value={delimiter}
                label={t("pages.csvToJson.delimiter")}
                onChange={handleDelimiterChange}
              >
                <MenuItem value=",">{t("options.separatorComma")}</MenuItem>
                <MenuItem value=";">{t("options.separatorSemicolon")}</MenuItem>
                <MenuItem value={"\t"}>{t("options.separatorTab")}</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel id="output-type-label">{t("pages.csvToJson.outputType")}</InputLabel>
              <Select
                labelId="output-type-label"
                id="output-type"
                value={outputType}
                label={t("pages.csvToJson.outputType")}
                onChange={handleOutputTypeChange}
              >
                <MenuItem value="array">{t("pages.csvToJson.arrayOutput")}</MenuItem>
                <MenuItem value="lines">{t("pages.csvToJson.linesOutput")}</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} />
              }
              label={t("pages.csvToJson.hasHeader")}
            />
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      }
    />
  );
};

export default CsvToJsonPage;
