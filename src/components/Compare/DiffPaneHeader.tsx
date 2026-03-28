import { Box, Typography } from "@mui/material";
import CopyButton from "../CopyButton";

interface DiffPaneHeaderProps {
  title: string;
  value: string;
}

const DiffPaneHeader: React.FC<DiffPaneHeaderProps> = ({ title, value }) => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        display: "flex",
        alignItems: "center",
        px: 2,
        py: 0.75,
        gap: 1.5,
        borderBottom: "1px solid",
        borderColor: "secondary.dark",
      }}
    >
      <Typography
        sx={{
          color: "#fff",
          fontSize: "0.85rem",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <CopyButton value={value} />
    </Box>
  );
};

export default DiffPaneHeader;
