import { Box, Paper, Typography, Alert } from "@mui/material";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const highlight = (code: string) => {
  return Prism.highlight(code, Prism.languages.json, "json");
};

const lineNumberStyle = {
  position: "absolute" as const,
  left: 0,
  top: 0,
  bottom: 0,
  width: "50px",
  backgroundColor: "#f0f0f0",
  borderRight: "1px solid #e0e0e0",
  padding: "16px 8px",
  textAlign: "right" as const,
  color: "#999",
  fontSize: 14,
  fontFamily: '"Fira code", "Fira Mono", monospace',
  userSelect: "none" as const,
  lineHeight: "21px",
  pointerEvents: "none" as const,
};

export default function JsonEditor({ value, onChange, error }: JsonEditorProps) {
  const lineCount = value.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join("\n");

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        JSON Input
      </Typography>
      <Paper
        elevation={2}
        sx={{
          border: error ? "2px solid #d32f2f" : "1px solid #e0e0e0",
          borderRadius: 1,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box sx={lineNumberStyle}>{lineNumbers}</Box>
        <Box sx={{ marginLeft: "50px" }}>
          <Editor
            value={value}
            onValueChange={onChange}
            highlight={highlight}
            padding={16}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: "400px",
              backgroundColor: "#fafafa",
            }}
            textareaId="json-editor"
            aria-label="JSON editor"
          />
        </Box>
      </Paper>
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}
