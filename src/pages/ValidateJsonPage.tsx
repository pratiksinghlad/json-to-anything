import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import ValidationResults from "../components/ValidationResults";
import { validateJson } from "../utils/validateJson";
import { parseJson } from "../utils/parseJson";
import type { ValidationError } from "../types/validationTypes";

const DEFAULT_JSON = `{
  "name": "Alice Example",
  "age": 30,
  "email": "alice@example.com",
  "isActive": true
}`;

const DEFAULT_SCHEMA = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "integer",
      "minimum": 0
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "isActive": {
      "type": "boolean"
    }
  },
  "required": ["name", "age", "email"]
}`;

const ValidateJsonPage = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [schemaInput, setSchemaInput] = useState(DEFAULT_SCHEMA);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  useEffect(() => {
    // Parse JSON input
    const jsonParseResult = parseJson(jsonInput);
    if (!jsonParseResult.success) {
      setIsValid(false);
      setErrors([
        {
          path: "",
          message: `${t("pages.validate.invalidJson")}: ${jsonParseResult.error}`,
          line: jsonParseResult.line,
        },
      ]);
      return;
    }

    // Parse schema
    const schemaParseResult = parseJson(schemaInput);
    if (!schemaParseResult.success) {
      setIsValid(false);
      setErrors([
        {
          path: "",
          message: `${t("pages.validate.invalidSchema")}: ${schemaParseResult.error}`,
          line: schemaParseResult.line,
        },
      ]);
      return;
    }

    // Validate JSON against schema
    const result = validateJson(jsonParseResult.data, schemaParseResult.data, {
      jsonString: jsonInput,
    });

    setIsValid(result.valid);
    setErrors(result.errors ?? []);
  }, [jsonInput, schemaInput, t]);

  return (
    <JsonEditorLayout
      leftPanel={
        <EditorPanel
          title={t("pages.validate.jsonData")}
          value={jsonInput}
          onChange={setJsonInput}
          language="json"
        />
      }
      centerPanel={<CenterPanel />}
      rightPanel={
        <EditorPanel
          title={t("pages.validate.jsonSchema")}
          value={schemaInput}
          onChange={setSchemaInput}
          language="json"
        />
      }
      bottomPanel={
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t("pages.validate.results")}
          </Typography>

          {isValid && errors.length === 0 && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Chip
                icon={<CheckCircleIcon />}
                label={t("pages.validate.valid")}
                color="success"
                variant="filled"
              />
            </Box>
          )}

          <ValidationResults errors={errors} />
        </Box>
      }
    />
  );
};

export default ValidateJsonPage;
