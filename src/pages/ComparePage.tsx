import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, CircularProgress } from "@mui/material";
import { CompareArrows as CompareIcon } from "@mui/icons-material";
import Header from "../components/JsonEditor/Header";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import DiffViewer from "../components/Compare/DiffViewer";
import DiffPaneHeader from "../components/Compare/DiffPaneHeader";
import DiffStats from "../components/Compare/DiffStats";
import DiffToolbar from "../components/Compare/DiffToolbar";
import { useDiff } from "../hooks/useDiff";
import { useJsonEditorAccessibility } from "../hooks/useJsonEditorAccessibility";

const ComparePage = () => {
  const { t } = useTranslation();
  const [originalCode, setOriginalCode] = useState("");
  const [modifiedCode, setModifiedCode] = useState("");
  const [mode, setMode] = useState<"editing" | "comparing">("editing");
  const [hideWhitespace, setHideWhitespace] = useState(false);
  const [disableLineWrap, setDisableLineWrap] = useState(false);

  const { leftPanelRef, rightPanelRef } = useJsonEditorAccessibility();
  const { computeDiff, result, isComparing } = useDiff();

  const handleCompare = async () => {
    if (!originalCode && !modifiedCode) return;
    await computeDiff(originalCode, modifiedCode, { ignoreWhitespace: hideWhitespace });
    setMode("comparing");
  };

  const handleHideWhitespaceChange = async (checked: boolean) => {
    setHideWhitespace(checked);
    if (mode === "comparing") {
      await computeDiff(originalCode, modifiedCode, { ignoreWhitespace: checked });
    }
  };

  const handleDisableLineWrapChange = (checked: boolean) => {
    setDisableLineWrap(checked);
  };

  const handleReset = () => {
    setMode("editing");
  };

  const centerPanel = (
    <Box
      sx={{
        width: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "surface.light",
        borderLeft: "1px solid",
        borderRight: "1px solid",
        borderColor: "divider",
        zIndex: 1, // Stay on top of borders
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleCompare}
        disabled={isComparing || (!originalCode && !modifiedCode)}
        sx={{
          minWidth: "40px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          p: 0,
        }}
        aria-label={t("pages.compare.compareBtn")}
      >
        {isComparing ? <CircularProgress size={20} color="inherit" /> : <CompareIcon />}
      </Button>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#fff" }}>
      {mode === "editing" ? (
        <JsonEditorLayout
          leftPanel={
            <EditorPanel
              ref={leftPanelRef}
              title={t("pages.compare.original")}
              value={originalCode}
              onChange={setOriginalCode}
              language="json"
              showMarkdownCopy={true}
            />
          }
          centerPanel={centerPanel}
          rightPanel={
            <EditorPanel
              ref={rightPanelRef}
              title={t("pages.compare.modified")}
              value={modifiedCode}
              onChange={setModifiedCode}
              language="json"
              showMarkdownCopy={true}
            />
          }
        />
      ) : (
        <>
          <Header />
          <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden", flexDirection: "column" }}>
            <DiffToolbar
              hideWhitespace={hideWhitespace}
              disableLineWrap={disableLineWrap}
              onHideWhitespaceChange={handleHideWhitespaceChange}
              onDisableLineWrapChange={handleDisableLineWrapChange}
            />

            <Box sx={{ display: "flex", width: "100%" }}>
              <Box sx={{ flex: 1, borderRight: "1px solid", borderColor: "divider" }}>
                <DiffPaneHeader title={t("pages.compare.original")} value={originalCode} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <DiffPaneHeader title={t("pages.compare.modified")} value={modifiedCode} />
              </Box>
            </Box>

            {result && (
              <DiffViewer
                rows={result.rows}
                lines={result.lines}
                disableLineWrap={disableLineWrap}
              />
            )}

            {result && (
              <DiffStats
                additions={result.additions}
                deletions={result.deletions}
                onReset={handleReset}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ComparePage;
