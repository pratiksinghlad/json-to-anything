import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import { jsonToXml } from "../utils/jsonToXml";
import { parseJson } from "../utils/parseJson";

const DEFAULT_JSON = `{
  "person": {
    "@_id": "1",
    "name": "John Doe",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "New York",
      "zip": "10001"
    },
    "hobbies": ["reading", "gaming", "coding"]
  }
}`;

const JsonToXmlPage = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [xmlOutput, setXmlOutput] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [rootName, setRootName] = useState("root");
  const [declaration, setDeclaration] = useState(false);
  const [attributePrefix, setAttributePrefix] = useState("@_");
  const [pretty, setPretty] = useState(true);
  const [indent, setIndent] = useState("2");

  useEffect(() => {
    // First parse the JSON input
    const parseResult = parseJson(jsonInput);
    if (!parseResult.success) {
      setError(t("errors.invalidJson"));
      setXmlOutput("");
      return;
    }

    // Then convert to XML
    const result = jsonToXml(parseResult.data, {
      rootName,
      declaration,
      attributePrefix,
      pretty,
      indent: parseInt(indent, 10),
    });

    if (result.ok) {
      setXmlOutput(result.output);
      setError(undefined);
    } else {
      setXmlOutput("");
      setError(result.error);
    }
  }, [jsonInput, rootName, declaration, attributePrefix, pretty, indent, t]);

  const handleIndentChange = (event: SelectChangeEvent) => {
    setIndent(event.target.value);
  };

  return (
    <JsonEditorLayout
      leftPanel={
        <EditorPanel title="JSON" value={jsonInput} onChange={setJsonInput} language="json" />
      }
      centerPanel={<CenterPanel />}
      rightPanel={
        <EditorPanel title="XML" value={xmlOutput} language="xml" readOnly={true} />
      }
      bottomPanel={
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <TextField
              size="small"
              label={t("pages.jsonToXml.rootName")}
              value={rootName}
              onChange={(e) => setRootName(e.target.value)}
              sx={{ width: 150 }}
            />
            <TextField
              size="small"
              label={t("pages.jsonToXml.attributePrefix")}
              value={attributePrefix}
              onChange={(e) => setAttributePrefix(e.target.value)}
              sx={{ width: 150 }}
            />
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="xml-indent-label">{t("pages.beautify.indent")}</InputLabel>
              <Select
                labelId="xml-indent-label"
                id="xml-indent"
                value={indent}
                label={t("pages.beautify.indent")}
                onChange={handleIndentChange}
              >
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="4">4</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={declaration}
                  onChange={(e) => setDeclaration(e.target.checked)}
                />
              }
              label={t("pages.jsonToXml.includeDeclaration")}
            />
            <FormControlLabel
              control={
                <Checkbox checked={pretty} onChange={(e) => setPretty(e.target.checked)} />
              }
              label={t("pages.jsonToXml.prettyPrint")}
            />
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      }
    />
  );
};

export default JsonToXmlPage;
