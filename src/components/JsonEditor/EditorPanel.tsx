import { useState, useRef, useMemo, useLayoutEffect, useImperativeHandle, useCallback } from "react";
import type { Ref } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Typography,
} from "@mui/material";

import Editor from "react-simple-code-editor";
import { highlight } from "../../utils/highlight";
import CopyButton from "../CopyButton";
import ClearButton from "../ClearButton";
import LineNumberGutter, { EDITOR_FONT_SIZE, EDITOR_LINE_HEIGHT, EDITOR_PADDING } from "./LineNumberGutter";
import { csvToJson } from "../../utils/csvToJson";
import { xmlToJson } from "../../utils/xmlToJson";
import { normalizeData } from "../../utils/normalizeData";
import { getAllKeys, flattenObject } from "../../utils/flattenObject";
import { globalThemeConfig } from "../../themeConfig";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";

const visuallyHiddenSx = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

export interface EditorPanelProps {
  ref?: Ref<EditorPanelHandle>;
  initialValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  title?: string;
  language?: string; // e.g., "json", "csv", "xml"
  readOnly?: boolean;
  formatLabel?: string;
}

export interface EditorPanelHandle {
  focus: () => void;
  copy: () => void;
  clear: () => void;
  setViewMode: (mode: "text" | "tree" | "table") => void;
}

// @ts-ignore - Handle possible default export mismatch in ESM/React 19
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const EditorComponent = (Editor as any).default || Editor;

// oxlint-disable-next-line react-doctor/no-giant-component -- Editor mode orchestration is kept together to preserve keyboard/ref behavior.
const EditorPanel = ({
  ref,
  initialValue = "{}",
  value,
  onChange,
  language = "json",
  readOnly = false,
  formatLabel,
}: EditorPanelProps) => {
  const { t } = useTranslation();
  const [internalCode, setInternalCode] = useState(initialValue);
  const [viewMode, setViewMode] = useState<"text" | "tree" | "table">("text");

  // Ref for the wrapper div that contains react-simple-code-editor
  const editorWrapperRef = useRef<HTMLDivElement>(null);
  // Ref for the <textarea> inside react-simple-code-editor (actual scroll host)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  // Ref for outer area (used for Ctrl+A in non-text modes)
  const contentRef = useRef<HTMLDivElement>(null);

  const currentCode = value !== undefined ? value : internalCode;

  const updateCode = useCallback((newCode: string) => {
    if (value === undefined) {
      setInternalCode(newCode);
    }
    if (onChange) {
      onChange(newCode);
    }
  }, [value, onChange]);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    focus: () => {
      if (viewMode === "text") {
        textareaRef.current?.focus();
      } else {
        contentRef.current?.focus();
      }
    },
    copy: () => {
      navigator.clipboard.writeText(currentCode);
    },
    clear: () => {
      updateCode("");
    },
    setViewMode: (mode) => {
      setViewMode(mode);
    }
  }), [currentCode, viewMode, updateCode]);

  // Keyboard shortcuts for view modes (scoped to this panel)
  const isPanelFocused = () => {
    return (
      contentRef.current?.contains(document.activeElement) ||
      editorWrapperRef.current?.contains(document.activeElement)
    );
  };

  useKeyboardShortcuts([
    { 
      key: "t", 
      altKey: true, 
      action: () => isPanelFocused() && setViewMode("text"), 
      options: { preventDefault: true } 
    },
    { 
      key: "e", 
      altKey: true, 
      action: () => isPanelFocused() && setViewMode("tree"), 
      options: { preventDefault: true } 
    },
    { 
      key: "b", 
      altKey: true, 
      action: () => isPanelFocused() && setViewMode("table"), 
      options: { preventDefault: true } 
    },
  ], true);

  // Locate the textarea inside react-simple-code-editor after DOM commits.
  // useLayoutEffect runs synchronously after the DOM is painted, guaranteeing
  // the textarea exists before the gutter attaches its scroll listener.
  useLayoutEffect(() => {
    if (viewMode !== "text") return;
    const wrapper = editorWrapperRef.current;
    if (!wrapper) return;
    textareaRef.current = wrapper.querySelector<HTMLTextAreaElement>("textarea");
  }, [viewMode]);



  // Memoize parsed data to avoid re-parsing on every render
  const parsedData = useMemo(() => {
    if (viewMode === "text" || !currentCode || currentCode.trim() === "") return null;

    try {
      if (language === "json") {
        return JSON.parse(currentCode);
      }
      if (language === "csv") {
        const result = csvToJson(currentCode);
        return result.ok ? result.output : null;
      }
      if (language === "xml") {
        const result = xmlToJson(currentCode);
        return result.ok ? result.output : null;
      }
      return JSON.parse(currentCode);
    } catch {
      return null;
    }
  }, [currentCode, language, viewMode]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "a") {
      if (viewMode !== "text") {
        const selection = window.getSelection();
        const range = document.createRange();
        if (contentRef.current) {
          range.selectNodeContents(contentRef.current);
          selection?.removeAllRanges();
          selection?.addRange(range);
          e.preventDefault();
        }
      }
    }
  };

  const editorContent = useMemo(() => {
    if (viewMode === "tree") {
      if (parsedData) {
        return (
          <Box sx={{ p: 2 }}>
            <pre
              style={{
                margin: 0,
                fontFamily: globalThemeConfig.FONT_FAMILY_MONO,
                fontSize: "13px",
                lineHeight: "1.5",
                color: "#2c3e50",
              }}
            >
              {JSON.stringify(parsedData, null, 2)}
            </pre>
          </Box>
        );
      }
      const errorMsg =
        language === "json"
          ? t("editor.invalidJsonTree")
          : language === "csv"
          ? t("editor.invalidCsvTree")
          : t("editor.invalidXmlTree");
      return <Alert severity="warning">{errorMsg}</Alert>;
    }

    if (viewMode === "table") {
      const normalized = normalizeData(parsedData);
      if (normalized.success && normalized.data && normalized.data.length > 0) {
        const columns = getAllKeys(normalized.data);
        const displayData = normalized.data.slice(0, 100);
        const hasMore = normalized.data.length > 100;

        return (
          <TableContainer component={Paper} elevation={0} sx={{ height: "100%", borderRadius: 0 }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column}
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: "#f8f9fa",
                        whiteSpace: "nowrap",
                        borderRight: "1px solid #e9ecef",
                      }}
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {displayData.map((row) => {
                  const flattened = flattenObject(row);
                  const rowKey = columns.map((column) => String(flattened[column] ?? "")).join("|");
                  return (
                    <TableRow key={rowKey} hover>
                      {columns.map((column) => {
                        const cellValue = flattened[column];
                        const displayValue =
                          cellValue === null || cellValue === undefined ? "" : String(cellValue);
                        return (
                          <TableCell
                            key={column}
                            sx={{
                              borderRight: "1px solid #e9ecef",
                              maxWidth: "300px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {displayValue}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {hasMore && (
              <Box sx={{ p: 1.5, textAlign: "center", backgroundColor: "#f8f9fa" }}>
                <Typography variant="caption" color="text.secondary">
                  {t("editor.showingRows", { count: 100 })}
                </Typography>
              </Box>
            )}
          </TableContainer>
        );
      }
      const errorMsg =
        language === "json"
          ? t("editor.arrayObjectsTable")
          : language === "csv"
          ? t("editor.validCsvTable")
          : t("editor.validXmlTable");
      return <Alert severity="warning">{errorMsg}</Alert>;
    }

    return (
      <>
        <Box
          component="label"
          htmlFor={`editor-${language}`}
          sx={visuallyHiddenSx}
        >
          {t("editor.ariaLabel", { language })}
        </Box>
        <EditorComponent
          value={currentCode}
          onValueChange={updateCode}
          highlight={(code: string) => highlight(code, language)}
          readOnly={readOnly}
          padding={EDITOR_PADDING}
          style={{
            fontFamily: globalThemeConfig.FONT_FAMILY_MONO,
            fontSize: EDITOR_FONT_SIZE,
            lineHeight: `${EDITOR_LINE_HEIGHT}px`,
            minHeight: "100%",
            flex: 1,
          }}
          textareaClassName="editor-textarea"
          textareaId={`editor-${language}`}
        />
      </>
    );
  }, [currentCode, language, parsedData, readOnly, t, updateCode, viewMode]);

  const viewModes = [
    { label: t("editor.textView"), value: "text" },
    { label: t("editor.treeView"), value: "tree" },
    { label: t("editor.tableView"), value: "table" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* View Mode Switcher */}
      <Box
        sx={{
          backgroundColor: "secondary.main",
          display: "flex",
          alignItems: "center",
          px: 1.5,
          py: 0.75,
          gap: 1.5,
          borderBottom: "1px solid",
          borderColor: "secondary.dark",
        }}
      >
        <Box
          role="tablist"
          aria-label={t("editor.viewMode") || "View Mode"}
          sx={{
            display: "flex",
            backgroundColor: "rgba(255,255,255,0.1)",
            borderRadius: "4px",
            padding: "2px",
          }}
        >
          {viewModes.map((mode) => {
            const m = mode.value as "text" | "tree" | "table";
            const isActive = viewMode === m;
            return (
              <Button
                key={mode.value}
                size="small"
                onClick={() => setViewMode(m)}
                role="tab"
                aria-selected={isActive}
                sx={{
                  minWidth: "60px",
                  p: "4px 12px",
                  color: isActive ? "secondary.main" : "rgba(255,255,255,0.8)",
                  fontSize: "0.75rem",
                  fontWeight: isActive ? "bold" : "500",
                  backgroundColor: isActive ? "#fff" : "transparent",
                  borderRadius: "3px",
                  boxShadow: isActive ? "0 1px 3px rgba(0,0,0,0.2)" : "none",
                  "&:hover": {
                    backgroundColor: isActive ? "#fff" : "rgba(255,255,255,0.15)",
                    color: isActive ? "secondary.main" : "#fff",
                  },
                  textTransform: "none",
                  transition: "all 0.2s ease",
                }}
              >
                {mode.label}
              </Button>
            );
          })}
        </Box>
        <Box
          sx={{ width: "1px", height: "20px", backgroundColor: "rgba(255,255,255,0.2)", mx: 0.5 }}
        />
        
        {formatLabel && (
          <Typography
            variant="button"
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontWeight: "bold",
              letterSpacing: "0.5px",
              ml: 1,
            }}
          >
            {formatLabel}
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />
        <ClearButton 
          onClear={() => updateCode("")} 
          disabled={!currentCode || currentCode.trim() === ""} 
        />
        <CopyButton value={currentCode} />
      </Box>

      {/* Editor Area */}
      <Box
        ref={contentRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          minHeight: 0,
          overflow: "hidden",
          "&:focus": { outline: "none" },
        }}
      >
        {/*
         * In text mode: render gutter + editor wrapper side by side.
         * The gutter listens to scroll events on the <textarea> inside the wrapper.
         * In tree/table modes: no gutter, content fills the full width.
         */}
        {viewMode === "text" && (
          <LineNumberGutter code={currentCode} textareaRef={textareaRef} />
        )}

        {/* Editor / content wrapper */}
        <Box
          ref={editorWrapperRef}
          onClick={() => {
            if (viewMode === "text") {
              editorWrapperRef.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus();
            }
          }}
          sx={{
            flexGrow: 1,
            overflow: "auto",
            backgroundColor: "#fff",
            "&:focus-within": {
              boxShadow: "inset 0 0 0 2px rgba(25, 118, 210, 0.2)",
            },
          }}
        >
          {editorContent}
        </Box>
      </Box>
    </Box>
  );
};

EditorPanel.displayName = "EditorPanel";

export default EditorPanel;
