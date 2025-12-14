import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "primary.main",
        color: "#ffffff",
        height: "48px",
        justifyContent: "center",
      }}
    >
      <Toolbar variant="dense" sx={{ minHeight: "48px", px: 2, display: "flex", gap: 2 }}>
        {/* Logo / Title Area */}
        <Box
          sx={{ display: "flex", alignItems: "center", mr: 2, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <Box
            component="img"
            src="/json-icon.svg"
            alt=""
            sx={{ width: 24, height: 24, mr: 1, display: "none" }}
          />
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            JSON Editor
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ fontWeight: "light", ml: 0.5, opacity: 0.8 }}
          >
            Online
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button color="inherit" onClick={() => navigate("/")} sx={{ textTransform: "none" }}>
            JSON to CSV
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/json-to-xml")}
            sx={{ textTransform: "none" }}
          >
            JSON to XML
          </Button>
          <Button color="inherit" onClick={() => navigate("/about")} sx={{ textTransform: "none" }}>
            About
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
