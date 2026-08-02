import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Typography, Chip, Button, Switch, FormControlLabel } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import ValidationResults from "../components/ValidationResults";
import { validateJson } from "../utils/validateJson";
import { parseJson } from "../utils/parseJson";
import { isBlankInput } from "../utils/isBlankInput";
import { generateSchemaFromJson } from "../utils/generateSchema";
import type { ValidationError } from "../types/validationTypes";
import { useJsonEditorAccessibility } from "../hooks/useJsonEditorAccessibility";

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
  const [autoSyncSchema, setAutoSyncSchema] = useState(true);
  const { leftPanelRef, rightPanelRef } = useJsonEditorAccessibility();

  // Auto-generate and sync schema when JSON input changes and autoSync is enabled
  useEffect(() => {
    if (!autoSyncSchema) return;
    const jsonParseResult = parseJson(jsonInput);
    if (jsonParseResult.success) {
      const generated = generateSchemaFromJson(jsonParseResult.data);
      const generatedStr = JSON.stringify(generated, null, 2);
      if (generatedStr !== schemaInput) {
        setSchemaInput(generatedStr);
      }
    }
  }, [jsonInput, autoSyncSchema, schemaInput]);

  const { isValid, errors, validationType, isJsonSyntaxValid } = useMemo(() => {
    const isJsonBlank = isBlankInput(jsonInput);
    if (isJsonBlank) {
      return {
        isValid: false,
        errors: [],
        validationType: "syntax" as const,
        isJsonSyntaxValid: false,
      };
    }

    const jsonParseResult = parseJson(jsonInput);
    if (!jsonParseResult.success) {
      return {
        isValid: false,
        errors: [
          {
            path: "",
            message: `${t("pages.validate.invalidJson")}: ${jsonParseResult.error}`,
            line: jsonParseResult.line,
          },
        ] satisfies ValidationError[],
        validationType: "syntax" as const,
        isJsonSyntaxValid: false,
      };
    }

    const isSchemaBlank = isBlankInput(schemaInput);
    if (isSchemaBlank) {
      return {
        isValid: true,
        errors: [],
        validationType: "syntax" as const,
        isJsonSyntaxValid: true,
      };
    }

    const schemaParseResult = parseJson(schemaInput);
    if (!schemaParseResult.success) {
      return {
        isValid: false,
        errors: [
          {
            path: "",
            message: `${t("pages.validate.invalidSchema")}: ${schemaParseResult.error}`,
            line: schemaParseResult.line,
          },
        ] satisfies ValidationError[],
        validationType: "schema" as const,
        isJsonSyntaxValid: true,
      };
    }

    const result = validateJson(jsonParseResult.data, schemaParseResult.data, {
      jsonString: jsonInput,
    });

    return {
      isValid: result.valid,
      errors: result.errors ?? [],
      validationType: "schema" as const,
      isJsonSyntaxValid: true,
    };
  }, [jsonInput, schemaInput, t]);

  const handleGenerateSchema = () => {
    const jsonParseResult = parseJson(jsonInput);
    if (jsonParseResult.success) {
      const generated = generateSchemaFromJson(jsonParseResult.data);
      setSchemaInput(JSON.stringify(generated, null, 2));
    }
  };

  const handleSchemaChange = (value: string) => {
    setSchemaInput(value);
    setAutoSyncSchema(false); // Stop auto-sync once the user manually edits the schema
  };

  return (
    <JsonEditorLayout
      leftPanel={
        <EditorPanel
          ref={leftPanelRef}
          title={t("pages.validate.jsonData")}
          value={jsonInput}
          onChange={setJsonInput}
          language="json"
          showMarkdownCopy={true}
        />
      }
      centerPanel={<CenterPanel />}
      rightPanel={
        <EditorPanel
          ref={rightPanelRef}
          title={t("pages.validate.jsonSchema")}
          value={schemaInput}
          onChange={handleSchemaChange}
          language="json"
          showMarkdownCopy={true}
        />
      }
      bottomPanel={
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {t("pages.validate.results")}
          </Typography>

          <Box sx={{ display: "flex", gap: 3, alignItems: "center", mb: 2, flexWrap: "wrap" }}>
            {isValid && errors.length === 0 && (
              <Chip
                icon={<CheckCircleIcon />}
                label={
                  validationType === "syntax"
                    ? t("pages.validate.validSyntax", "Valid JSON Syntax")
                    : t("pages.validate.validSchemaMatch", "Valid against Schema")
                }
                color="success"
                variant="filled"
              />
            )}

            <FormControlLabel
              control={
                <Switch
                  checked={autoSyncSchema}
                  onChange={(e) => setAutoSyncSchema(e.target.checked)}
                  color="primary"
                  size="small"
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {t("pages.validate.autoSyncSchema", "Auto-generate Schema")}
                </Typography>
              }
            />

            {!autoSyncSchema && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleGenerateSchema}
                disabled={!isJsonSyntaxValid}
                sx={{ textTransform: "none" }}
              >
                {t("pages.validate.generateSchema", "Generate Schema")}
              </Button>
            )}
          </Box>

          <ValidationResults errors={errors} hideTitle={true} />
        </Box>
      }
    />
  );
};

export default ValidateJsonPage;
