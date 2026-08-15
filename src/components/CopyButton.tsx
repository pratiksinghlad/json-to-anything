import { useState } from "react";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import { ContentCopy as ContentCopyIcon, Check as CheckIcon } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

interface CopyButtonProps {
  value: string;
  className?: string;
  size?: "small" | "medium" | "large";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, size = "small", color = "inherit" }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Tooltip
      title={copied ? t("common.copied") : t("common.copyToClipboard")}
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
      >
        {copied ? (
          <CheckIcon fontSize="small" sx={{ color: "#4caf50" }} />
        ) : (
          <ContentCopyIcon fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
