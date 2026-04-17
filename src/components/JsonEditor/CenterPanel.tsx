import { Box, IconButton, Tooltip } from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

interface CenterPanelProps {
  onSwap?: () => void;
}

const CenterPanel = ({ onSwap }: CenterPanelProps) => {
  return (
    <Box
      sx={{
        width: "32px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        borderLeft: "1px solid #e0e0e0",
        borderRight: "1px solid #e0e0e0",
        position: "relative",
      }}
    >
      {onSwap && (
        <Tooltip title="Swap Direction">
          <IconButton
            onClick={onSwap}
            size="small"
            sx={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              zIndex: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
              boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <SwapHorizIcon fontSize="small" color="primary" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default CenterPanel;
