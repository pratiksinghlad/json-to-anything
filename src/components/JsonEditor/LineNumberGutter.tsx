import { useLayoutEffect, useRef } from "react";
import { Box } from "@mui/material";

// Font metrics – must match the editor exactly
export const EDITOR_FONT_SIZE = 14; // px
export const EDITOR_LINE_HEIGHT = EDITOR_FONT_SIZE * 1.5; // 21px
export const EDITOR_PADDING = 10; // px  (react-simple-code-editor `padding` prop)
export const GUTTER_WIDTH = 48; // px

interface LineNumberGutterProps {
  /** Current code – used only to count lines. */
  code: string;
  /**
   * Ref to the <textarea> inside react-simple-code-editor.
   * That element is the real scroll host; the outer wrapper never scrolls.
   */
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const LineNumberGutter: React.FC<LineNumberGutterProps> = ({ code, textareaRef }) => {
  const gutterRef = useRef<HTMLDivElement>(null);

  // Sync gutter scroll with the textarea's vertical scroll.
  // useLayoutEffect runs in the same phase as EditorPanel's layout effect,
  // ensuring textareaRef.current is already populated.
  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const onScroll = () => {
      if (gutterRef.current) {
        gutterRef.current.scrollTop = textarea.scrollTop;
      }
    };

    textarea.addEventListener("scroll", onScroll, { passive: true });
    return () => textarea.removeEventListener("scroll", onScroll);
  }, [textareaRef]);

  const lineCount = Math.max(1, code.split("\n").length);

  return (
    <Box
      ref={gutterRef}
      aria-hidden="true"
      sx={{
        width: `${GUTTER_WIDTH}px`,
        minWidth: `${GUTTER_WIDTH}px`,
        flexShrink: 0,
        overflowY: "hidden",
        overflowX: "hidden",
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #e0e0e0",
        userSelect: "none",
        pointerEvents: "none",
        // Top padding matches the editor's own padding prop
        paddingTop: `${EDITOR_PADDING}px`,
        paddingBottom: `${EDITOR_PADDING}px`,
      }}
    >
      {Array.from({ length: lineCount }, (_, i) => (
        <Box
          key={i}
          sx={{
            height: `${EDITOR_LINE_HEIGHT}px`,
            lineHeight: `${EDITOR_LINE_HEIGHT}px`,
            fontSize: `${EDITOR_FONT_SIZE}px`,
            fontFamily: '"Fira Code", "Fira Mono", monospace',
            color: "#aaa",
            textAlign: "right",
            paddingRight: "10px",
          }}
        >
          {i + 1}
        </Box>
      ))}
    </Box>
  );
};

export default LineNumberGutter;
