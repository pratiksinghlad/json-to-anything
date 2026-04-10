import { useState } from "react";
import { IconButton, Tooltip, Zoom } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

interface ClearButtonProps {
  onClear: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  disabled?: boolean;
}

const ClearButton: React.FC<ClearButtonProps> = ({ 
  onClear, 
  size = "small", 
  color = "inherit",
  disabled = false
}) => {
  const { t } = useTranslation();
  const [cleared, setCleared] = useState(false);

  const handleClear = () => {
    onClear();
    setCleared(true);
    setTimeout(() => setCleared(false), 2000);
  };

  return (
    <Tooltip
      title={cleared ? t("common.cleared") : t("common.clear")}
      placement="top"
      TransitionComponent={Zoom}
      arrow
    >
      <IconButton
        onClick={handleClear}
        size={size}
        disabled={disabled}
        sx={{
          color: color === "inherit" ? "rgba(255,255,255,0.8)" : undefined,
          backgroundColor: cleared ? "rgba(255,255,255,0.1)" : "transparent",
          transition: "all 0.2s ease",
          "&:hover": {
            color: "#fff",
            backgroundColor: "rgba(255,255,255,0.2)",
          },
        }}
        color={color !== "inherit" ? color : undefined}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default ClearButton;
