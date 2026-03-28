import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
// components
import OptionsBar from "../components/OptionsBar";
import DownloadButtons from "../components/DownloadButtons";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import ValidationResults from "../components/ValidationResults";
import { parseJson } from "../utils/parseJson";
import { normalizeData } from "../utils/normalizeData";
import { jsonToCsv } from "../utils/jsonToCsv";
import type { CsvOptions } from "../utils/jsonToCsv";
import type { ValidationError } from "../types/validationTypes";

const DEFAULT_JSON = `[
  {
    "id": 1,
    "name": "Pratik",
    "email": "pratik@example.com",
    "profile": {
      "role": "engineer",
      "joined": "2017-04-12T08:00:00Z"
    },
    "tags": ["fullstack", "react", "dotnet", "azure", "devops", "ci/cd", "cloud"]
  },
  {
    "id": 2,
    "name": "Bob",
    "email": "bob@example.com",
    "profile": {
      "role": "designer"
    },
    "tags": []
  }
]`;

const JsonToCsvPage = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [csvData, setCsvData] = useState("");
  const [separator, setSeparator] = useState<"," | ";" | "\t">(",");
  const [includeHeader, setIncludeHeader] = useState(true);
  const [trimEmptyColumns, setTrimEmptyColumns] = useState(false);
  const [pascalCaseHeaders, setPascalCaseHeaders] = useState(false);

  useEffect(() => {
    // Parse and validate JSON
    const parseResult = parseJson(jsonInput);
    if (!parseResult.success) {
      setErrors([
        {
          message: parseResult.error || t("errors.invalidJson"),
          line: parseResult.line,
        },
      ]);
      setCsvData("");
      return;
    }

    // Normalize data to array of objects
    const normalizeResult = normalizeData(parseResult.data);
    if (!normalizeResult.success) {
      // Map normalization errors to i18n keys, fallback to raw error
      const map: Record<string, string> = {
        "Array is empty": t("errors.arrayEmpty"),
        "Array must contain only objects": t("errors.arrayOnlyObjects"),
        "Data array is empty": t("errors.dataArrayEmpty"),
        "Data array must contain only objects": t("errors.dataArrayOnlyObjects"),
      };
      setErrors([
        {
          message:
            map[normalizeResult.error || ""] ||
            normalizeResult.error ||
            t("errors.invalidInputType"),
        },
      ]);
      setCsvData("");
      return;
    }

    // Clear errors
    setErrors([]);

    // Convert to CSV
    const options: CsvOptions = {
      separator,
      includeHeader,
      trimEmptyColumns,
      pascalCaseHeaders,
    };
    const csv = jsonToCsv(normalizeResult.data || [], options);
    setCsvData(csv);
     
  }, [jsonInput, separator, includeHeader, trimEmptyColumns, pascalCaseHeaders, t]);

  return (
    <JsonEditorLayout
      leftPanel={
        <EditorPanel
          title={t("common.json")}
          value={jsonInput}
          onChange={setJsonInput}
          language="json"
        />
      }
      centerPanel={<CenterPanel />}
      rightPanel={
        <EditorPanel title={t("common.csv")} value={csvData} language="csv" readOnly={true} />
      }
      bottomPanel={
        jsonInput ? (
          <Box sx={{ p: 2 }}>
            <ValidationResults errors={errors} />
            <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
              <DownloadButtons csvData={csvData} jsonData={jsonInput} disabled={!csvData} />
            </Box>
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
          </Box>
        ) : null
      }
    />
  );
};

export default JsonToCsvPage;
