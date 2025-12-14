import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import { xmlToJson } from "../utils/xmlToJson";

const DEFAULT_XML = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <person id="1">
    <name>John Doe</name>
    <age>30</age>
    <address>
      <street>123 Main St</street>
      <city>New York</city>
      <zip>10001</zip>
    </address>
    <hobbies>
      <hobby>reading</hobby>
      <hobby>gaming</hobby>
      <hobby>coding</hobby>
    </hobbies>
  </person>
</root>`;

const XmlToJsonPage = () => {
  const { t } = useTranslation();
  const [xmlInput, setXmlInput] = useState(DEFAULT_XML);
  const [jsonOutput, setJsonOutput] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [parseAttributes, setParseAttributes] = useState(true);
  const [explicitArray, setExplicitArray] = useState(false);
  const [coerceTypes, setCoerceTypes] = useState(true);

  useEffect(() => {
    const result = xmlToJson(xmlInput, {
      parseAttributes,
      explicitArray,
      coerceTypes,
    });

    if (result.ok) {
      setJsonOutput(JSON.stringify(result.output, null, 2));
      setError(undefined);
    } else {
      setJsonOutput("");
      setError(result.error);
    }
  }, [xmlInput, parseAttributes, explicitArray, coerceTypes]);

  return (
    <JsonEditorLayout
      leftPanel={
        <EditorPanel title="XML" value={xmlInput} onChange={setXmlInput} language="xml" />
      }
      centerPanel={<CenterPanel />}
      rightPanel={
        <EditorPanel title="JSON" value={jsonOutput} language="json" readOnly={true} />
      }
      bottomPanel={
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={parseAttributes}
                  onChange={(e) => setParseAttributes(e.target.checked)}
                />
              }
              label={t("pages.xmlToJson.parseAttributes")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={explicitArray}
                  onChange={(e) => setExplicitArray(e.target.checked)}
                />
              }
              label={t("pages.xmlToJson.explicitArray")}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={coerceTypes}
                  onChange={(e) => setCoerceTypes(e.target.checked)}
                />
              }
              label={t("pages.xmlToJson.coerceTypes")}
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

export default XmlToJsonPage;
