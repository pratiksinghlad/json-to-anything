import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, FormControl, InputLabel, Select, MenuItem, Alert, Snackbar } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import { formatJson } from "../utils/formatJson";

const DEFAULT_JSON = `{"name":"John","age":30,"city":"New York","hobbies":["reading","gaming"],"address":{"street":"123 Main St","zip":"10001"}}`;

type IndentOption = "2" | "4" | "tab";

const BeautifyJsonPage = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [formattedOutput, setFormattedOutput] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [indent, setIndent] = useState<IndentOption>("2");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const indentValue = indent === "tab" ? "tab" : parseInt(indent, 10);
    const result = formatJson(jsonInput, { indent: indentValue as number | "tab" });

    if (result.ok) {
      setFormattedOutput(result.output);
      setError(undefined);
    } else {
      setFormattedOutput("");
      setError(result.error);
    }
  }, [jsonInput, indent]);

  const handleIndentChange = (event: SelectChangeEvent) => {
    setIndent(event.target.value as IndentOption);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(formattedOutput).then(
      () => {
        setSnackbarMessage(t("snackbar.jsonCopied"));
        setSnackbarOpen(true);
      },
      () => {
        setSnackbarMessage(t("snackbar.copyFailed"));
        setSnackbarOpen(true);
      },
    );
  };

  return (
    <>
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
          <EditorPanel
            title={t("pages.beautify.title")}
            value={formattedOutput}
            language="json"
            readOnly={true}
          />
        }
        bottomPanel={
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel id="indent-select-label">{t("pages.beautify.indent")}</InputLabel>
                <Select
                  labelId="indent-select-label"
                  id="indent-select"
                  value={indent}
                  label={t("pages.beautify.indent")}
                  onChange={handleIndentChange}
                >
                  <MenuItem value="2">2 {t("pages.beautify.spaces")}</MenuItem>
                  <MenuItem value="4">4 {t("pages.beautify.spaces")}</MenuItem>
                  <MenuItem value="tab">{t("pages.beautify.tabOption")}</MenuItem>
                </Select>
              </FormControl>
              <Box
                component="button"
                onClick={handleCopyOutput}
                disabled={!formattedOutput}
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "primary.main",
                  bgcolor: "primary.main",
                  color: "white",
                  cursor: formattedOutput ? "pointer" : "not-allowed",
                  opacity: formattedOutput ? 1 : 0.5,
                  "&:hover": {
                    bgcolor: formattedOutput ? "primary.dark" : "primary.main",
                  },
                }}
              >
                {t("pages.beautify.copyFormatted")}
              </Box>
            </Box>
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
          </Box>
        }
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default BeautifyJsonPage;
