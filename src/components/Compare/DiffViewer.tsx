import { useRef, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import type { DiffLine } from "../../engine/diffTypes";
import { EDITOR_FONT_SIZE, EDITOR_LINE_HEIGHT, EDITOR_PADDING, GUTTER_WIDTH } from "../JsonEditor/LineNumberGutter";
import { globalThemeConfig } from "../../themeConfig";

interface DiffViewerProps {
  lines: DiffLine[];
}

const DiffViewer: React.FC<DiffViewerProps> = ({ lines }) => {
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  // Using a ref to track scroll source prevents infinite loops without triggering re-renders
  const scrollLockRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  // Synchronize scrolling between left and right panes
  useLayoutEffect(() => {
    let leftTimer: NodeJS.Timeout;
    let rightTimer: NodeJS.Timeout;

    const left = leftScrollRef.current;
    const right = rightScrollRef.current;
    if (!left || !right) return;

    const onLeftScroll = () => {
      if (scrollLockRef.current.right) return;
      scrollLockRef.current.left = true;

      if (right) {
        right.scrollTop = left.scrollTop;
        right.scrollLeft = left.scrollLeft;
      }

      clearTimeout(leftTimer);
      leftTimer = setTimeout(() => {
        scrollLockRef.current.left = false;
      }, 50);
    };

    const onRightScroll = () => {
      if (scrollLockRef.current.left) return;
      scrollLockRef.current.right = true;

      if (left) {
        left.scrollTop = right.scrollTop;
        left.scrollLeft = right.scrollLeft;
      }

      clearTimeout(rightTimer);
      rightTimer = setTimeout(() => {
        scrollLockRef.current.right = false;
      }, 50);
    };

    left.addEventListener("scroll", onLeftScroll, { passive: true });
    right.addEventListener("scroll", onRightScroll, { passive: true });

    return () => {
      left.removeEventListener("scroll", onLeftScroll);
      right.removeEventListener("scroll", onRightScroll);
      clearTimeout(leftTimer);
      clearTimeout(rightTimer);
    };
  }, []);

  const renderGutterCell = (lineNumber: number | null, isAdded: boolean, isRemoved: boolean) => (
    <Box
      sx={{
        width: `${GUTTER_WIDTH}px`,
        minWidth: `${GUTTER_WIDTH}px`,
        flexShrink: 0,
        backgroundColor: isAdded ? "#cdffd8" : isRemoved ? "#ffdce0" : "#f5f5f5",
        borderRight: "1px solid #e0e0e0",
        color: "text.secondary",
        textAlign: "right",
        pr: "10px",
        userSelect: "none",
        fontFamily: globalThemeConfig.FONT_FAMILY_MONO,
        fontSize: `${EDITOR_FONT_SIZE}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        ...(isAdded && { borderLeft: "4px solid #2ea043", paddingLeft: "4px" }),
        ...(isRemoved && { borderLeft: "4px solid #cf222e", paddingLeft: "4px" }),
      }}
    >
      {lineNumber ?? ""}
    </Box>
  );

  const renderContentCell = (content: string, isAdded: boolean, isRemoved: boolean) => (
    <Box
      sx={{
        flexGrow: 1,
        pl: 2,
        backgroundColor: isAdded ? "#e6ffed" : isRemoved ? "#ffebe9" : "#ffffff",
        fontFamily: globalThemeConfig.FONT_FAMILY_MONO,
        fontSize: `${EDITOR_FONT_SIZE}px`,
        display: "flex",
        alignItems: "center",
        minWidth: "max-content",
        whiteSpace: "pre",
      }}
    >
      {content || " "}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "row", flexGrow: 1, overflow: "hidden" }}>
      {/* LEFT PANE - Original */}
      <Box
        ref={leftScrollRef}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          borderRight: "1px solid",
          borderColor: "divider",
          backgroundColor: "#fff",
          "&::-webkit-scrollbar": { width: "12px", height: "12px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: "6px", border: "3px solid #fff" },
        }}
      >
        <Box sx={{ minWidth: "max-content", py: `${EDITOR_PADDING}px` }}>
          {lines.map((line, index) => {
            const isRemoved = line.type === "removed";
            // In left pane, we show 'removed' lines as red, 'equal' lines normally.
            // Added lines are placeholder space in the original side.
            if (line.type === "added") {
              return (
                <Box key={`l-${index}`} sx={{ display: "flex", height: `${EDITOR_LINE_HEIGHT}px`, backgroundColor: "#f6f8fa" }}>
                  {renderGutterCell(null, false, false)}
                  {renderContentCell("", false, false)}
                </Box>
              );
            }
            return (
              <Box key={`l-${index}`} sx={{ display: "flex", height: `${EDITOR_LINE_HEIGHT}px` }}>
                {renderGutterCell(line.leftLineNumber, false, isRemoved)}
                {renderContentCell(line.content, false, isRemoved)}
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* RIGHT PANE - Modified */}
      <Box
        ref={rightScrollRef}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          backgroundColor: "#fff",
          "&::-webkit-scrollbar": { width: "12px", height: "12px" },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#ccc", borderRadius: "6px", border: "3px solid #fff" },
        }}
      >
        <Box sx={{ minWidth: "max-content", py: `${EDITOR_PADDING}px` }}>
          {lines.map((line, index) => {
            const isAdded = line.type === "added";
            // In right pane, we show 'added' lines as green, 'equal' lines normally.
            // Removed lines are placeholder space in the modified side.
            if (line.type === "removed") {
              return (
                <Box key={`r-${index}`} sx={{ display: "flex", height: `${EDITOR_LINE_HEIGHT}px`, backgroundColor: "#f6f8fa" }}>
                  {renderGutterCell(null, false, false)}
                  {renderContentCell("", false, false)}
                </Box>
              );
            }
            return (
              <Box key={`r-${index}`} sx={{ display: "flex", height: `${EDITOR_LINE_HEIGHT}px` }}>
                {renderGutterCell(line.rightLineNumber, isAdded, false)}
                {renderContentCell(line.content, isAdded, false)}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default DiffViewer;
