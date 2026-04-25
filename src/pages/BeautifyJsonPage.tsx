import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, FormControl, InputLabel, Select, MenuItem, Snackbar } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import ValidationResults from "../components/ValidationResults";
import { useJsonBeautifier } from "../hooks/useJsonBeautifier";
import { useJsonEditorAccessibility } from "../hooks/useJsonEditorAccessibility";

const DEFAULT_JSON = `{"name":"John","age":30,"city":"New York","hobbies":["reading","gaming"],"address":{"street":"123 Main St","zip":"10001"}}`;

const BeautifyJsonPage = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { leftPanelRef, rightPanelRef } = useJsonEditorAccessibility();
  const { formattedOutput, errors, indent, setIndent } = useJsonBeautifier(jsonInput);

  const handleIndentChange = (event: SelectChangeEvent) => {
    setIndent(event.target.value as "2" | "4" | "tab");
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
            ref={leftPanelRef}
            title={t("common.json")}
            value={jsonInput}
            onChange={setJsonInput}
            language="json"
          />
        }
        centerPanel={<CenterPanel />}
        rightPanel={
          <EditorPanel
            ref={rightPanelRef}
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
            <ValidationResults errors={errors} />
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
