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
  "team": {
    "leader": {
      "name": "Pratik Singh Lad",
      "role": "Engineering Lead"
    },
    "members": [
      {
        "name": "Linus Torvalds",
        "contributions": ["Kernel", "Git"]
      },
      {
        "name": "Alan Turing",
        "contributions": ["Computing", "Cryptography"]
      }
    ]
  }
}`;

const JsonToYamlPage = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [yamlOutput, setYamlOutput] = useState("");
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const { leftPanelRef, rightPanelRef } = useJsonEditorAccessibility();

  const { convert, isProcessing } = useConverter();

  useEffect(() => {
    if (isBlankInput(jsonInput)) {
      setErrors([]);
      setYamlOutput("");
      return;
    }

    let isCancelled = false;

    const doConvert = async () => {
      // Fast manual JSON parse validation to provide errors
      try {
        JSON.parse(jsonInput);
      } catch (e) {
        if (!isCancelled) {
          setErrors([{ message: e instanceof Error ? e.message : String(e) }]);
          setYamlOutput("");
        }
        return;
      }

      const result = await convert(jsonInput, "yaml");

      if (isCancelled) return;

      if (result.ok) {
        setYamlOutput(result.output);
        setErrors([]);
      } else {
        setYamlOutput("");
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
        <EditorPanel ref={rightPanelRef} title="YAML" value={yamlOutput} language="yaml" readOnly />
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
            <DownloadButtons yamlData={yamlOutput} jsonData={jsonInput} disabled={!yamlOutput} />
          </Box>
        </Box>
      }
    />
  );
};

export default JsonToYamlPage;
