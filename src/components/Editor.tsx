import { Box, Paper, Typography, Alert } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism.css";
import Prism from "prismjs";
import { useTranslation } from "react-i18next";

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const highlight = (code: string) => {
  // Ensure JSON language is loaded
  if (!Prism.languages.json) {
    return code;
  }
  return Prism.highlight(code, Prism.languages.json, "json");
};

/**
 * JSON editor component with line numbers and syntax highlighting
 *
 * @param {JsonEditorProps} props
 */
export default function JsonEditor({ value, onChange, error }: JsonEditorProps) {
  const { t } = useTranslation();
  const lineCount = value.split("\n").length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1).join("\n");
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const lineNumbersScrollableRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Load Prism JSON language dynamically to avoid global Prism reference issues
  useEffect(() => {
    const loadLanguage = async () => {
      if (!Prism.languages.json) {
        try {
          // Dynamically import the JSON language and ensure it's registered
          // @ts-expect-error: No type definitions for 'prismjs/components/prism-json'
          await import("prismjs/components/prism-json");
          if (!Prism.languages.json) {
            // Some bundlers may require explicit registration
             
            console.error("Prism JSON language was imported, but not registered.");
          }
        } catch (err) {
           
          console.error("Failed to load Prism JSON language:", err);
        }
      }
    };
    loadLanguage();
  }, []);

  // Standard multiplier for readable line spacing when deriving line-height from font-size.
  // This follows CSS defaults for most browsers (font-size * 1.2 to 1.5 is typical).
  const LINE_HEIGHT_MULTIPLIER = 1.4;

  // Measure line height and vertical padding from the rendered textarea to avoid magic numbers.
  // We fall back to reasonable defaults while the measurement runs in the browser.
  const [lineHeightPx, setLineHeightPx] = useState<number>(21);
  const [verticalPaddingPx, setVerticalPaddingPx] = useState<number>(32);

  // Compute the height for the line numbers column based on measured values
  const lineNumbersHeight = lineCount * lineHeightPx + verticalPaddingPx;

  // Measure actual CSS values from the editor textarea (client-only). We use the
  // textarea id 'json-editor' that is assigned to the react-simple-code-editor.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const measure = () => {
      const textarea = document.getElementById("json-editor");
      if (!textarea) return;
      const cs = getComputedStyle(textarea as Element);
      // Parse line-height; if not available, derive from font-size using a standard multiplier
      const parsedLineHeight = parseFloat(cs.lineHeight || "");
      let measuredLineHeight = Number.isFinite(parsedLineHeight) && parsedLineHeight > 0 ? parsedLineHeight : NaN;
      if (Number.isNaN(measuredLineHeight)) {
        const parsedFontSize = parseFloat(cs.fontSize || "");
        measuredLineHeight = Number.isFinite(parsedFontSize) && parsedFontSize > 0 ? parsedFontSize * LINE_HEIGHT_MULTIPLIER : 21;
      }

      const paddingTop = parseFloat(cs.paddingTop || "") || 16;
      const paddingBottom = parseFloat(cs.paddingBottom || "") || 16;

      setLineHeightPx(measuredLineHeight);
      setVerticalPaddingPx(paddingTop + paddingBottom);
    };

    // Measure immediately and also after a short delay in case styles are applied later
    measure();
    const id = window.setTimeout(measure, 50);
    return () => window.clearTimeout(id);
  }, [value]);

  useEffect(() => {
    const editorContainer = editorContainerRef.current;
    const lineNumbersScrollable = lineNumbersScrollableRef.current;

    if (!editorContainer || !lineNumbersScrollable) return;

    const handleScroll = () => {
      lineNumbersScrollable.scrollTop = editorContainer.scrollTop;
    };

    editorContainer.addEventListener("scroll", handleScroll);
    return () => editorContainer.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ color: "#000000", fontWeight: 500 }}>
        {t("editor.title")}
      </Typography>
      <Paper
        elevation={0}
        sx={{
          border: error ? "2px solid #d32f2f" : "1px solid #d0d0d0",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
          height: { xs: "40vh", sm: "45vh", md: "50vh" },
          maxHeight: { xs: "40vh", sm: "45vh", md: "50vh" },
          minHeight: "250px",
          display: "flex",
          backgroundColor: "#ffffff",
        }}
      >
        <Box
          ref={lineNumbersScrollableRef}
          sx={{
            width: "50px",
            backgroundColor: "#f8f8f8",
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
              color: "#757575",
              fontSize: 14,
              fontFamily: '"Fira code", "Fira Mono", monospace',
              userSelect: "none",
              lineHeight: `${lineHeightPx}px`,
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
              backgroundColor: "#ffffff",
              lineHeight: `${lineHeightPx}px`,
              width: "100%",
            }}
            textareaId="json-editor"
            aria-label={t("aria.jsonEditor")}
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
