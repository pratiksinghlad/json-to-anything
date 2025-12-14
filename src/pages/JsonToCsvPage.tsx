import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
// components
import OptionsBar from "../components/OptionsBar";
import PreviewTable from "../components/PreviewTable";
import DownloadButtons from "../components/DownloadButtons";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import { parseJson } from "../utils/parseJson";
import { normalizeData } from "../utils/normalizeData";
import { jsonToCsv } from "../utils/jsonToCsv";
import type { CsvOptions } from "../utils/jsonToCsv";

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
  const [error, setError] = useState<string | undefined>();
  const [normalizedData, setNormalizedData] = useState<Record<string, unknown>[]>([]);
  const [csvData, setCsvData] = useState("");
  const [separator, setSeparator] = useState<"," | ";" | "\t">(",");
  const [includeHeader, setIncludeHeader] = useState(true);
  const [trimEmptyColumns, setTrimEmptyColumns] = useState(false);
  const [pascalCaseHeaders, setPascalCaseHeaders] = useState(false);

  useEffect(() => {
    // Parse and validate JSON
    const parseResult = parseJson(jsonInput);
    if (!parseResult.success) {
      // Map parse errors to i18n keys
      if (parseResult.error === "Input is empty") {
        setError(t("errors.emptyInput"));
      } else {
        setError(t("errors.invalidJson"));
        console.log(error);
      }
      setNormalizedData([]);
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
      setError(
        map[normalizeResult.error || ""] || normalizeResult.error || t("errors.invalidInputType"),
      );
      setNormalizedData([]);
      setCsvData("");
      return;
    }

    // Clear error and update normalized data
    setError(undefined);
    setNormalizedData(normalizeResult.data || []);

    // Convert to CSV
    const options: CsvOptions = {
      separator,
      includeHeader,
      trimEmptyColumns,
      pascalCaseHeaders,
    };
    const csv = jsonToCsv(normalizeResult.data || [], options);
    setCsvData(csv);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jsonInput, separator, includeHeader, trimEmptyColumns, pascalCaseHeaders, t]);

  // We no longer wrap in Container, as JsonEditorLayout handles the full screen structure
  return (
    <JsonEditorLayout
      leftPanel={
        <EditorPanel title="JSON" value={jsonInput} onChange={setJsonInput} language="json" />
      }
      centerPanel={<CenterPanel />} // We can pass transform handlers here later if we want buttons to do it
      rightPanel={
        <EditorPanel
          title="CSV"
          value={csvData}
          language="csv" // We might need to ensure 'csv' is loaded in EditorPanel or fall back to plain text
          readOnly={true}
        />
      }
      bottomPanel={
        normalizedData.length > 0 ? (
          <Box sx={{ p: 2 }}>
            <Box sx={{ mb: 2, display: "flex", gap: 2, alignItems: "center" }}>
              <Typography variant="h6">Table Preview</Typography>
              <DownloadButtons
                csvData={csvData}
                jsonData={jsonInput}
                disabled={normalizedData.length === 0}
              />
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
            <Box sx={{ mt: 2 }}>
              <PreviewTable data={normalizedData} pascalCaseHeaders={pascalCaseHeaders} />
            </Box>
          </Box>
        ) : null
      }
    />
  );
};

export default JsonToCsvPage;
