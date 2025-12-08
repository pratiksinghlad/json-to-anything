import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CenterPanel = () => {
  return (
    <Box
      sx={{
        width: "50px", // Narrow column
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 10, // Push down a bit
        gap: 2,
        backgroundColor: "#f5f5f5", // Light grey background
        borderLeft: "1px solid #e0e0e0",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="caption" display="block" sx={{ color: "#666", mb: 0.5 }}>
          Copy
        </Typography>
        <Tooltip title="Copy to Right">
          <IconButton
            size="small"
            sx={{ border: "1px solid #ddd", borderRadius: 1, mb: 1, backgroundColor: "#e0e0e0" }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Copy to Left">
          <IconButton
            size="small"
            sx={{ border: "1px solid #ddd", borderRadius: 1, backgroundColor: "#e0e0e0" }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="caption" display="block" sx={{ color: "#666", mb: 0.5 }}>
          Transform
        </Typography>
        <Tooltip title="Transform to Right">
          <IconButton
            size="small"
            sx={{ border: "1px solid #ddd", borderRadius: 1, mb: 1, backgroundColor: "#e0e0e0" }}
          >
            <ChevronRightIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Transform to Left">
          <IconButton
            size="small"
            sx={{ border: "1px solid #ddd", borderRadius: 1, backgroundColor: "#e0e0e0" }}
          >
            <ChevronLeftIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      <IconButton size="small" sx={{ mt: "auto", mb: 2 }}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default CenterPanel;
