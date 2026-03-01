import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Chip, List, ListItem, ListItemText } from "@mui/material";
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
    errors?: Array<{ path: string; message: string; line?: number }>;
  } | null>(null);

  useEffect(() => {
    // Parse JSON input
    const jsonParseResult = parseJson(jsonInput);
    if (!jsonParseResult.success) {
      setValidationResult({
        valid: false,
        errors: [
          {
            path: "",
            message: `${t("pages.validate.invalidJson")}: ${jsonParseResult.error}`,
            line: jsonParseResult.line,
          },
        ],
      });
      return;
    }

    // Parse schema
    const schemaParseResult = parseJson(schemaInput);
    if (!schemaParseResult.success) {
      setValidationResult({
        valid: false,
        errors: [
          {
            path: "",
            message: `${t("pages.validate.invalidSchema")}: ${schemaParseResult.error}`,
            line: schemaParseResult.line,
          },
        ],
      });
      return;
    }

    // Validate JSON against schema
    const result = validateJson(jsonParseResult.data, schemaParseResult.data, {
      jsonString: jsonInput,
    });
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

          {validationResult && (
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
                  <Typography variant="subtitle2" sx={{ mb: 1, color: "error.main" }}>
                    {t("pages.validate.errorsFound", { count: validationResult.errors.length })}
                  </Typography>
                  <List
                    dense
                    sx={{
                      bgcolor: "rgba(211, 47, 47, 0.05)",
                      borderRadius: 1,
                      border: "1px solid rgba(211, 47, 47, 0.2)",
                    }}
                  >
                    {validationResult.errors.map((err, index) => (
                      <ListItem
                        key={index}
                        sx={{
                          borderBottom:
                            index < (validationResult.errors?.length || 0) - 1
                              ? "1px solid rgba(211, 47, 47, 0.1)"
                              : "none",
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              sx={{ color: "error.main", fontWeight: 500 }}
                            >
                              {err.line && (
                                <Box component="span" sx={{ mr: 1, fontWeight: "bold" }}>
                                  [{t("pages.validate.line")} {err.line}]
                                </Box>
                              )}
                              {err.message}
                            </Typography>
                          }
                          secondary={
                            err.path ? (
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                {t("pages.validate.path")}: <strong>{err.path}</strong>
                              </Typography>
                            ) : null
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
