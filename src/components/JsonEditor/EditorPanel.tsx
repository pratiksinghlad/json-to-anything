import { useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";

import Editor from "react-simple-code-editor";
// We need to import the prismjs core and languages if not globally available,
// but usually loading the theme in global CSS is enough if `prismjs` is present.
// @ts-ignore
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css"; // Basic theme, we might override

export interface EditorPanelProps {
  initialValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  // title prop removed as it was unused in logic, though passed by parent.
  // Wait, parent passes it. We should keep it optionally in interface but remove lint warning if unused.
  // Actually, let's keep it in interface but not destructure it if unused, or use it!
  title?: string;
  language?: string; // e.g., "json", "csv", "xml"
  readOnly?: boolean;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  initialValue = "{}",
  value,
  onChange,
  title,
  language = "json",
  readOnly = false,
}) => {
  const [internalCode, setInternalCode] = useState(initialValue);

  const currentCode = value !== undefined ? value : internalCode;

  const handleChange = (newCode: string) => {
    if (value === undefined) {
      setInternalCode(newCode);
    }
    if (onChange) {
      onChange(newCode);
    }
  };

  return (
    <Box
      sx={{
        disply: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Top Green Toolbar */}
      <Box
        sx={{
          backgroundColor: "#81b953", // Green from screenshot
          color: "#fff",
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 0.5,
          gap: 1,
        }}
      >
        <Button
          startIcon={<AddIcon />}
          sx={{ color: "#fff", textTransform: "none", minWidth: "auto", fontSize: "0.875rem" }}
        >
          New {title ? `(${title})` : ""}
        </Button>
        <Button
          startIcon={<FolderOpenIcon />}
          sx={{ color: "#fff", textTransform: "none", minWidth: "auto", fontSize: "0.875rem" }}
        >
          Open
        </Button>
        <Button
          startIcon={<SaveIcon />}
          sx={{ color: "#fff", textTransform: "none", minWidth: "auto", fontSize: "0.875rem" }}
        >
          Save
        </Button>
        <Button
          startIcon={<ContentCopyIcon />}
          sx={{ color: "#fff", textTransform: "none", minWidth: "auto", fontSize: "0.875rem" }}
        >
          Copy
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          startIcon={<FullscreenIcon />}
          sx={{ color: "#fff", textTransform: "none", minWidth: "auto", fontSize: "0.875rem" }}
        >
          Full screen
        </Button>
      </Box>

      {/* Secondary Light Green/White Toolbar for View Modes */}
      <Box
        sx={{
          backgroundColor: "#a5d07e", // Lighter green gradient approximation
          background: "linear-gradient(180deg, #a5d07e 0%, #8ac05d 100%)",
          display: "flex",
          alignItems: "center",
          px: 1,
          py: 0.5,
          gap: 1,
          borderBottom: "1px solid #81b953",
        }}
      >
        {/* View Mode Switcher */}
        <Box sx={{ display: "flex", backgroundColor: "#e8f5e9", borderRadius: 1, padding: 0.2 }}>
          <Button
            size="small"
            sx={{
              minWidth: "auto",
              p: "2px 8px",
              color: "#1b5e20",
              fontWeight: "bold",
              backgroundColor: "#fff",
              boxShadow: 1,
            }}
          >
            Text
          </Button>
          <Button size="small" sx={{ minWidth: "auto", p: "2px 8px", color: "#1b5e20" }}>
            Tree
          </Button>
          <Button size="small" sx={{ minWidth: "auto", p: "2px 8px", color: "#1b5e20" }}>
            Table
          </Button>
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
          height: "calc(100% - 75px)", // Subtracting header heights approx
          backgroundColor: "#fff",
          overflow: "auto",
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: 14,
          "& pre": { margin: 0 },
        }}
      >
        <Editor
          value={currentCode}
          onValueChange={handleChange}
          highlight={(code) => highlight(code, languages[language] || languages.json, language)}
          disabled={readOnly}
          padding={10}
          style={{
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            fontSize: 14,
            minHeight: "100%",
          }}
          textareaClassName="editor-textarea"
        />
      </Box>
    </Box>
  );
};

export default EditorPanel;
