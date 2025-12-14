import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Alert, Typography, Chip, List, ListItem, ListItemText } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import { validateJson } from "../utils/validateJson";
import { parseJson } from "../utils/parseJson";

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
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors?: Array<{ path: string; message: string }>;
  } | null>(null);
  const [parseError, setParseError] = useState<string | undefined>();

  useEffect(() => {
    // Parse JSON input
    const jsonParseResult = parseJson(jsonInput);
    if (!jsonParseResult.success) {
      setParseError(t("pages.validate.invalidJson"));
      setValidationResult(null);
      return;
    }

    // Parse schema
    const schemaParseResult = parseJson(schemaInput);
    if (!schemaParseResult.success) {
      setParseError(t("pages.validate.invalidSchema"));
      setValidationResult(null);
      return;
    }

    setParseError(undefined);

    // Validate JSON against schema
    const result = validateJson(jsonParseResult.data, schemaParseResult.data);
    setValidationResult(result);
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

          {parseError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {parseError}
            </Alert>
          )}

          {validationResult && !parseError && (
            <>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                {validationResult.valid ? (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label={t("pages.validate.valid")}
                    color="success"
                    variant="filled"
                  />
                ) : (
                  <Chip
                    icon={<ErrorIcon />}
                    label={t("pages.validate.invalid")}
                    color="error"
                    variant="filled"
                  />
                )}
              </Box>

              {!validationResult.valid && validationResult.errors && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    {t("pages.validate.errorsFound", { count: validationResult.errors.length })}
                  </Typography>
                  <List dense sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
                    {validationResult.errors.map((err, index) => (
                      <ListItem key={index} sx={{ borderBottom: "1px solid #eee" }}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" component="span">
                              <strong>{err.path || "/"}</strong>: {err.message}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </>
          )}
        </Box>
      }
    />
  );
};

export default ValidateJsonPage;
