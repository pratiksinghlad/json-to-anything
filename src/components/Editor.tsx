import { Box, Paper, Typography, Alert } from "@mui/material";
import { useRef, useEffect } from "react";
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

/**
 * JSON editor component with line numbers and syntax highlighting
 *
 * @param {JsonEditorProps} props
 */
export default function JsonEditor({ value, onChange, error }: JsonEditorProps) {
  const lineCount = value.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join("\n");
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Calculate the height needed for line numbers based on line count
  const lineHeight = 21; // Must match CSS lineHeight
  const padding = 32; // 16px top + 16px bottom
  const lineNumbersHeight = lineCount * lineHeight + padding;

  useEffect(() => {
    const editorContainer = editorContainerRef.current;
    const lineNumbersEl = lineNumbersRef.current;

    if (!editorContainer || !lineNumbersEl) return;

    const handleScroll = () => {
      if (lineNumbersEl.parentElement) {
        lineNumbersEl.parentElement.scrollTop = editorContainer.scrollTop;
      }
    };

    editorContainer.addEventListener("scroll", handleScroll);
    return () => editorContainer.removeEventListener("scroll", handleScroll);
  }, []);

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
          height: { xs: "40vh", sm: "45vh", md: "50vh" },
          maxHeight: { xs: "40vh", sm: "45vh", md: "50vh" },
          minHeight: "250px",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "50px",
            backgroundColor: "#f0f0f0",
            borderRight: "1px solid #e0e0e0",
            overflow: "auto",
            position: "relative",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          <Box
            ref={lineNumbersRef}
            sx={{
              padding: "16px 8px",
              textAlign: "right",
              color: "#999",
              fontSize: 14,
              fontFamily: '"Fira code", "Fira Mono", monospace',
              userSelect: "none",
              lineHeight: "21px",
              pointerEvents: "none",
              whiteSpace: "pre",
              height: `${lineNumbersHeight}px`,
            }}
          >
            {lineNumbers}
          </Box>
        </Box>
        <Box
          ref={editorContainerRef}
          sx={{
            flex: 1,
            overflow: "auto",
            position: "relative",
          }}
        >
          <Editor
            value={value}
            onValueChange={onChange}
            highlight={highlight}
            padding={16}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 14,
              minHeight: `${lineNumbersHeight}px`,
              backgroundColor: "#fafafa",
              lineHeight: "21px",
              width: "100%",
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
