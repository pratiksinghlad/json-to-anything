import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, LinearProgress, Typography } from "@mui/material";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import ValidationResults from "../components/ValidationResults";
import DownloadButtons from "../components/DownloadButtons";
import { isBlankInput } from "../utils/isBlankInput";
import type { ValidationError } from "../types/validationTypes";
import { useConverter } from "../hooks/useConverter";
import { useJsonEditorAccessibility } from "../hooks/useJsonEditorAccessibility";

const DEFAULT_JSON = `{
  "server": {
    "host": "127.0.0.1",
    "port": 8080
  },
  "database": {
    "url": "postgres://user:pass@localhost/db",
    "max_connections": 100
  },
  "users": [
    {
      "id": 1,
      "name": "Pratik Singh Lad",
      "email": "pratik@example.com",
      "role": "engineer"
    },
    {
      "id": 2,
      "name": "Linus Torvalds",
      "email": "linus@example.com",
      "role": "creator"
    },
    {
      "id": 3,
      "name": "Alan Turing",
      "email": "alan@example.com",
      "role": "pioneer"
    }
  ]
}`;

const JsonToTomlPage = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [tomlOutput, setTomlOutput] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const { leftPanelRef, rightPanelRef } = useJsonEditorAccessibility();

  const { convert, isProcessing } = useConverter();

  useEffect(() => {
    if (isBlankInput(jsonInput)) {
      setErrors([]);
      setTomlOutput("");
      return;
    }

    let isCancelled = false;

    const doConvert = async () => {
      // Validate JSON
      try {
        JSON.parse(jsonInput);
      } catch (e) {
        if (!isCancelled) {
          setErrors([{ message: e instanceof Error ? e.message : String(e) }]);
          setTomlOutput("");
        }
        return;
      }

      const result = await convert(jsonInput, "toml");

      if (isCancelled) return;

      if (result.ok) {
        setTomlOutput(result.output);
        setErrors([]);
      } else {
        setTomlOutput("");
        setErrors([{ message: result.error }]);
      }
    };

    doConvert();

    return () => {
      isCancelled = true;
    };
  }, [jsonInput, convert]);

  return (
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
        <EditorPanel ref={rightPanelRef} title="TOML" value={tomlOutput} language="toml" readOnly />
      }
      bottomPanel={
        <Box sx={{ p: 2 }}>
          {isProcessing && (
            <Box sx={{ mb: 2 }}>
              <LinearProgress />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                {t("pages.jsonToToon.processing")}
              </Typography>
            </Box>
          )}

          <ValidationResults errors={errors} />

          <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <DownloadButtons tomlData={tomlOutput} jsonData={jsonInput} disabled={!tomlOutput} />
          </Box>
        </Box>
      }
    />
  );
};

export default JsonToTomlPage;
