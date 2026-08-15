import { useMemo } from "react";
import { Box } from "@mui/material";
import type { DiffLine, DiffRow, DiffSide, DiffSideType } from "../../engine/diffTypes";
import { EDITOR_FONT_SIZE, EDITOR_LINE_HEIGHT, EDITOR_PADDING, GUTTER_WIDTH } from "../JsonEditor/LineNumberGutter";
import { globalThemeConfig } from "../../themeConfig";

interface DiffViewerProps {
  rows?: DiffRow[];
  lines?: DiffLine[];
  disableLineWrap?: boolean;
}

const GutterCell = ({
  lineNumber,
  type,
}: {
  lineNumber: number | null;
  type: DiffSideType;
}) => {
  const isAdded = type === "added";
  const isRemoved = type === "removed";
  const isEmpty = type === "empty";

  let bgColor = "#f5f5f5";
  if (isAdded) bgColor = "#cdffd8";
  else if (isRemoved) bgColor = "#ffdce0";
  else if (isEmpty) bgColor = "#f6f8fa";

  return (
    <Box
      sx={{
        width: `${GUTTER_WIDTH}px`,
        minWidth: `${GUTTER_WIDTH}px`,
        flexShrink: 0,
        backgroundColor: bgColor,
        borderRight: "1px solid #e0e0e0",
        color: "text.secondary",
        textAlign: "right",
        pr: "10px",
        userSelect: "none",
        fontFamily: globalThemeConfig.FONT_FAMILY_MONO,
        fontSize: `${EDITOR_FONT_SIZE}px`,
        lineHeight: `${EDITOR_LINE_HEIGHT}px`,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        pt: "2px",
        ...(isAdded && { borderLeft: "4px solid #2ea043", paddingLeft: "4px" }),
        ...(isRemoved && { borderLeft: "4px solid #cf222e", paddingLeft: "4px" }),
      }}
    >
      {lineNumber ?? ""}
    </Box>
  );
};

const ContentCell = ({
  side,
  disableLineWrap,
}: {
  side: DiffSide;
  disableLineWrap: boolean;
}) => {
  const isAdded = side.type === "added";
  const isRemoved = side.type === "removed";
  const isEmpty = side.type === "empty";

  let bgColor = "#ffffff";
  if (isAdded) bgColor = "#e6ffed";
  else if (isRemoved) bgColor = "#ffebe9";
  else if (isEmpty) bgColor = "#f6f8fa";

  const renderContent = () => {
    if (isEmpty) return null;
    if (!side.parts || side.parts.length === 0) {
      return side.content || " ";
    }

    return side.parts.map((part, idx) => {
      if (part.type === "removed") {
        return (
          <Box
            key={idx}
            component="span"
            data-testid="diff-char-removed"
            sx={{
              backgroundColor: "#ff8182",
              color: "inherit",
              borderRadius: "2px",
              px: "1px",
            }}
          >
            {part.value}
          </Box>
        );
      }
      if (part.type === "added") {
        return (
          <Box
            key={idx}
            component="span"
            data-testid="diff-char-added"
            sx={{
              backgroundColor: "#abf2bc",
              color: "inherit",
              borderRadius: "2px",
              px: "1px",
            }}
          >
            {part.value}
          </Box>
        );
      }
      return <span key={idx}>{part.value}</span>;
    });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        pl: 2,
        pr: 1,
        py: "2px",
        backgroundColor: bgColor,
        fontFamily: globalThemeConfig.FONT_FAMILY_MONO,
        fontSize: `${EDITOR_FONT_SIZE}px`,
        lineHeight: `${EDITOR_LINE_HEIGHT}px`,
        display: "flex",
        alignItems: "center",
        minHeight: `${EDITOR_LINE_HEIGHT}px`,
        whiteSpace: disableLineWrap ? "pre" : "pre-wrap",
        wordBreak: disableLineWrap ? "normal" : "break-word",
        overflowWrap: disableLineWrap ? "normal" : "anywhere",
        ...(disableLineWrap ? { minWidth: "max-content" } : { width: 0 }),
      }}
    >
      {renderContent() || " "}
    </Box>
  );
};

const DiffRowView = ({
  row,
  disableLineWrap,
}: {
  row: DiffRow;
  disableLineWrap: boolean;
}) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      width: disableLineWrap ? "max-content" : "100%",
      minWidth: "100%",
      minHeight: `${EDITOR_LINE_HEIGHT}px`,
      borderBottom: "1px solid #f0f0f0",
      "&:hover": {
        filter: "brightness(0.98)",
      },
    }}
  >
    {/* Left Side (Original) */}
    <Box
      sx={{
        flex: disableLineWrap ? "0 0 auto" : 1,
        width: disableLineWrap ? "auto" : "50%",
        minWidth: disableLineWrap ? "50vw" : 0,
        display: "flex",
        borderRight: "1px solid",
        borderColor: "divider",
        backgroundColor: row.left.type === "empty" ? "#f6f8fa" : undefined,
      }}
    >
      <GutterCell lineNumber={row.left.lineNumber} type={row.left.type} />
      <ContentCell side={row.left} disableLineWrap={disableLineWrap} />
    </Box>

    {/* Right Side (Modified) */}
    <Box
      sx={{
        flex: disableLineWrap ? "0 0 auto" : 1,
        width: disableLineWrap ? "auto" : "50%",
        minWidth: disableLineWrap ? "50vw" : 0,
        display: "flex",
        backgroundColor: row.right.type === "empty" ? "#f6f8fa" : undefined,
      }}
    >
      <GutterCell lineNumber={row.right.lineNumber} type={row.right.type} />
      <ContentCell side={row.right} disableLineWrap={disableLineWrap} />
    </Box>
  </Box>
);

const DiffViewer: React.FC<DiffViewerProps> = ({
  rows,
  lines,
  disableLineWrap = false,
}) => {
  const displayRows = useMemo<DiffRow[]>(() => {
    if (rows && rows.length > 0) return rows;
    if (!lines || lines.length === 0) return [];

    // Fallback: convert DiffLine[] to DiffRow[]
    return lines.map((line, idx) => {
      const isRemoved = line.type === "removed";
      const isAdded = line.type === "added";

      const leftSide: DiffSide = isAdded
        ? { lineNumber: null, content: "", type: "empty" }
        : {
            lineNumber: line.leftLineNumber,
            content: line.content,
            type: isRemoved ? "removed" : "equal",
            parts: line.parts,
          };

      const rightSide: DiffSide = isRemoved
        ? { lineNumber: null, content: "", type: "empty" }
        : {
            lineNumber: line.rightLineNumber,
            content: line.content,
            type: isAdded ? "added" : "equal",
            parts: line.parts,
          };

      return {
        id: `fallback-row-${idx}`,
        left: leftSide,
        right: rightSide,
      };
    });
  }, [rows, lines]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "auto",
        backgroundColor: "#fff",
        "&::-webkit-scrollbar": { width: "12px", height: "12px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#ccc",
          borderRadius: "6px",
          border: "3px solid #fff",
        },
      }}
    >
      <Box
        sx={{
          py: `${EDITOR_PADDING}px`,
          width: disableLineWrap ? "max-content" : "100%",
          minWidth: "100%",
        }}
      >
        {displayRows.map((row) => (
          <DiffRowView
            key={row.id}
            row={row}
            disableLineWrap={disableLineWrap}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DiffViewer;
