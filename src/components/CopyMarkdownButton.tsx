import { useState } from "react";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import { Code as CodeIcon, Check as CheckIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { wrapInMarkdownFence } from "../utils/copyAsMarkdown";

interface CopyMarkdownButtonProps {
  /** The raw output value to wrap and copy. */
  value: string;
  /**
   * The language tag used in the fenced code block
   * (e.g. "json", "yaml", "xml", "graphql", "plaintext").
   */
  language?: string;
  size?: "small" | "medium" | "large";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

/**
 * An icon button that copies `value` wrapped in a Markdown fenced code block
 * to the clipboard. Ideal for pasting into Notion, GitHub wikis, or any
 * Markdown-aware tool.
 *
 * Visually it mirrors `CopyButton` but uses the `<Code>` icon to signal
 * "copy as formatted code" rather than plain copy.
 */
const CopyMarkdownButton: React.FC<CopyMarkdownButtonProps> = ({
  value,
  language = "",
  size = "small",
  color = "inherit",
}) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wrapInMarkdownFence(value, language));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy markdown: ", err);
    }
  };

  return (
    <Tooltip
      title={copied ? t("common.copiedAsMarkdown") : t("common.copyAsMarkdown")}
      placement="top"
      TransitionComponent={Zoom}
      arrow
    >
      <IconButton
        onClick={handleCopy}
        size={size}
        disabled={!value || value.trim() === ""}
        sx={{
          color: color === "inherit" ? "rgba(255,255,255,0.8)" : undefined,
          backgroundColor: copied ? "rgba(255,255,255,0.1)" : "transparent",
          transition: "all 0.2s ease",
          "&:hover": {
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.2)",
          },
        }}
        color={color !== "inherit" ? color : undefined}
        aria-label={t("common.copyAsMarkdown")}
      >
        {copied ? (
          <CheckIcon fontSize="small" sx={{ color: "#4caf50" }} />
        ) : (
          <CodeIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default CopyMarkdownButton;
