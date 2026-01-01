import { useState, useRef } from "react";
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
import { csvToJson } from "../../utils/csvToJson";
import { xmlToJson } from "../../utils/xmlToJson";
import { normalizeData } from "../../utils/normalizeData";
import { getAllKeys, flattenObject } from "../../utils/flattenObject";

export interface EditorPanelProps {
  initialValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  title?: string;
  language?: string; // e.g., "json", "csv", "xml"
  readOnly?: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  initialValue = "{}",
  value,
  onChange,
  language = "json",
  readOnly = false,
}) => {
  const { t } = useTranslation();
  const [internalCode, setInternalCode] = useState(initialValue);
  const [viewMode, setViewMode] = useState<"text" | "tree" | "table">("text");
  const contentRef = useRef<HTMLDivElement>(null);

  const currentCode = value !== undefined ? value : internalCode;

  const updateCode = (newCode: string) => {
    if (value === undefined) {
      setInternalCode(newCode);
    }
    if (onChange) {
      onChange(newCode);
    }
  };

  // Helper to parse data safely based on language
  const getParsedData = () => {
    if (!currentCode || currentCode.trim() === "") return null;

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
      // Fallback: try to parse as JSON anyway
      return JSON.parse(currentCode);
    } catch {
      return null;
    }
  };

  const parsedData = viewMode !== "text" ? getParsedData() : null;

  const renderContent = () => {
    if (viewMode === "tree") {
      if (parsedData) {
        return (
          <Box sx={{ p: 2 }}>
            <pre
              style={{
                margin: 0,
                fontFamily: '"Fira Code", "Fira Mono", monospace',
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
                {displayData.map((row, i) => {
                  const flattened = flattenObject(row);
                  return (
                    <TableRow key={i} hover>
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

    // Default Text View
    return (
      <Editor
        value={currentCode}
        onValueChange={updateCode}
        highlight={(code) => highlight(code, language)}
        readOnly={readOnly}
        padding={10}
        style={{
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: 14,
          minHeight: "100%",
        }}
        textareaClassName="editor-textarea"
      />
    );
  };

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
        <Box sx={{ flexGrow: 1 }} />
        <CopyButton value={currentCode} />
      </Box>

      {/* Editor Area */}
      <Box
        ref={contentRef}
        onKeyDown={handleKeyDown}
        onClick={() => {
          if (viewMode === "text") {
            contentRef.current?.querySelector("textarea")?.focus();
          }
        }}
        tabIndex={0}
        sx={{
          flexGrow: 1,
          position: "relative",
          height: "calc(100% - 75px)",
          backgroundColor: "#fff",
          overflow: "auto",
          "&:focus": {
            outline: "none",
            boxShadow: "inset 0 0 0 2px rgba(25, 118, 210, 0.2)",
          },
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default EditorPanel;
