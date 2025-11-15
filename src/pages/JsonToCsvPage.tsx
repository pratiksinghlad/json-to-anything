import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Box, Typography } from "@mui/material";
import JsonEditor from "../components/Editor";
import OptionsBar from "../components/OptionsBar";
import PreviewTable from "../components/PreviewTable";
import DownloadButtons from "../components/DownloadButtons";
import Footer from "../components/Footer";
import { parseJson } from "../utils/parseJson";
import { normalizeData } from "../utils/normalizeData";
import { jsonToCsv } from "../utils/jsonToCsv";
import type { CsvOptions } from "../utils/jsonToCsv";

const DEFAULT_JSON = `[
  {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com",
    "profile": {
      "role": "engineer",
      "joined": "2023-04-12T08:00:00Z"
    },
    "tags": ["frontend", "react"]
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
      setError(map[normalizeResult.error || ""] || normalizeResult.error || t("errors.invalidInputType"));
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
  }, [jsonInput, separator, includeHeader, trimEmptyColumns, pascalCaseHeaders]);

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          flex: 1,
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ color: "#000000", fontWeight: 600 }}
        >
          {t("pages.jsonToCsv.title")}
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="center"
          sx={{
            mb: 4,
            color: "rgba(0, 0, 0, 0.6)",
          }}
        >
          {t("pages.jsonToCsv.subtitle")}
        </Typography>

        <Box sx={{ mb: 4 }}>
          <JsonEditor value={jsonInput} onChange={setJsonInput} error={error} />
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

        {normalizedData.length > 0 && (
          <>
            <DownloadButtons
              csvData={csvData}
              jsonData={jsonInput}
              disabled={normalizedData.length === 0}
            />

            <PreviewTable data={normalizedData} pascalCaseHeaders={pascalCaseHeaders} />
          </>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default JsonToCsvPage;
