import { Box } from "@mui/material";
import Header from "./Header";
import EditorPanel from "./EditorPanel";
import CenterPanel from "./CenterPanel";

interface JsonEditorLayoutProps {
  leftPanel?: React.ReactNode;
  rightPanel?: React.ReactNode;
  centerPanel?: React.ReactNode;
  bottomPanel?: React.ReactNode;
}

const JsonEditorLayout: React.FC<JsonEditorLayoutProps> = ({
  leftPanel = <EditorPanel title="Left" initialValue="{}" />, // Default fallback
  rightPanel = <EditorPanel title="Right" initialValue="" />,
  centerPanel = <CenterPanel />,
  bottomPanel,
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#fff" }}
    >
      <Header />

      {/* Main Workspace Area */}
      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden", flexDirection: "column" }}>
        {/* Split Pane Area */}
        <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden", minHeight: 0 }}>
          {/* Left Panel */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderRight: "1px solid #ddd",
              minWidth: 0,
            }}
          >
            {leftPanel}
          </Box>

          {/* Center Action Panel */}
          {centerPanel}

          {/* Right Panel */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              borderLeft: "1px solid #ddd",
              minWidth: 0,
            }}
          >
            {rightPanel}
          </Box>
        </Box>

        {/* Bottom Panel (e.g. Table Preview) */}
        {bottomPanel && (
          <Box sx={{ borderTop: "1px solid #ddd", maxHeight: "40vh", overflow: "auto" }}>
            {bottomPanel}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default JsonEditorLayout;
