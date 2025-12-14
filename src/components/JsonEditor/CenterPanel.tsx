import { Box } from "@mui/material";

const CenterPanel = () => {
  return (
    <Box
      sx={{
        width: "16px", // Much narrower, just a separator
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderLeft: "1px solid #e0e0e0",
        borderRight: "1px solid #e0e0e0",
      }}
    />
  );
};

export default CenterPanel;
