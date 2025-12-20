import { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

import Editor from "react-simple-code-editor";
import { highlight } from "../../utils/highlight";

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
  const [internalCode, setInternalCode] = useState(initialValue);
  const [viewMode, setViewMode] = useState<"text" | "tree" | "table">("text");

  const currentCode = value !== undefined ? value : internalCode;

  const updateCode = (newCode: string) => {
    if (value === undefined) {
      setInternalCode(newCode);
    }
    if (onChange) {
      onChange(newCode);
    }
  };

  // Helper to parse JSON safely for Tree/Table views
  const getParsedJson = () => {
    try {
      return JSON.parse(currentCode);
    } catch {
      return null;
    }
  };

  const parsedJson = viewMode !== "text" ? getParsedJson() : null;

  const renderContent = () => {
    if (viewMode === "tree") {
      if (parsedJson) {
        return (
          <Box sx={{ p: 2 }}>
            <pre style={{ overflow: "auto", maxHeight: "500px" }}>
              {JSON.stringify(parsedJson, null, 2)}
            </pre>
          </Box>
        );
      }
      return <Alert severity="warning">Invalid JSON content for Tree View</Alert>;
    }

    if (viewMode === "table") {
      if (Array.isArray(parsedJson) && parsedJson.length > 0 && typeof parsedJson[0] === "object") {
        const headers = Object.keys(parsedJson[0]);
        return (
          <TableContainer component={Paper} elevation={0}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableCell key={header} sx={{ fontWeight: "bold" }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {parsedJson.slice(0, 100).map((row: Record<string, unknown>, i: number) => (
                  <TableRow key={i}>
                    {headers.map((header) => (
                      <TableCell key={header}>
                        {typeof row[header] === "object"
                          ? JSON.stringify(row[header])
                          : String(row[header])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {parsedJson.length > 100 && (
              <Box sx={{ p: 1, textAlign: "center", fontStyle: "italic", color: "gray" }}>
                Showing first 100 rows
              </Box>
            )}
          </TableContainer>
        );
      }
      return <Alert severity="warning">Table View requires a JSON Array of Objects.</Alert>;
    }

    // Default Text View
    return (
      <Editor
        value={currentCode}
        onValueChange={updateCode}
        highlight={(code) => highlight(code, language)}
        disabled={readOnly}
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
          background: "linear-gradient(180deg, #a5d07e 0%, #8ac05d 100%)",
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 0.5,
          gap: 1,
          borderBottom: "1px solid #81b953",
        }}
      >
        <Box sx={{ display: "flex", backgroundColor: "#e8f5e9", borderRadius: 1, padding: 0.2 }}>
          {["Text", "Tree", "Table"].map((mode) => {
            const m = mode.toLowerCase() as "text" | "tree" | "table";
            const isActive = viewMode === m;
            return (
              <Button
                key={mode}
                size="small"
                onClick={() => setViewMode(m)}
                sx={{
                  minWidth: "auto",
                  p: "2px 8px",
                  color: isActive ? "#1b5e20" : "#1b5e20",
                  fontWeight: isActive ? "bold" : "normal",
                  backgroundColor: isActive ? "#fff" : "transparent",
                  boxShadow: isActive ? 1 : 0,
                  "&:hover": {
                    backgroundColor: isActive ? "#fff" : "rgba(255,255,255,0.3)",
                  },
                }}
              >
                {mode}
              </Button>
            );
          })}
        </Box>

        <Box
          sx={{ width: "1px", height: "20px", backgroundColor: "rgba(255,255,255,0.5)", mx: 1 }}
        />

        <IconButton size="small" sx={{ color: "#fff" }}>
          <SearchIcon fontSize="small" />
        </IconButton>
        <IconButton size="small" sx={{ color: "#fff" }}>
          <RefreshIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Editor Area */}
      <Box
        sx={{
          flexGrow: 1,
          position: "relative",
          height: "calc(100% - 75px)",
          backgroundColor: "#fff",
          overflow: "auto",
        }}
      >
        {renderContent()}
      </Box>
    </Box>
  );
};

export default EditorPanel;
