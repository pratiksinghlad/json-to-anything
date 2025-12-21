import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { menuItems } from "../../menuData";
import LanguageMenu from "../LanguageMenu";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

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
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "1.0rem" }}>
            JSON to anything
          </Typography>
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {menuItems.map((item) => (
              <Button
                key={item.key}
                color="inherit"
                onClick={() => handleNavigation(item.path)}
                sx={{
                  textTransform: "none",
                  fontSize: "0.85rem",
                  opacity: location.pathname === item.path ? 1 : 0.7,
                  borderBottom: location.pathname === item.path ? "2px solid #fff" : "none",
                  borderRadius: 0,
                  px: 1,
                  minWidth: "auto",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                {t(item.labelKey)}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Language Menu and Mobile Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LanguageMenu />
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiPaper-root": {
              width: 250,
              bgcolor: "secondary.main",
              color: "#ffffff",
            },
          }}
        >
          <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
            <IconButton color="inherit" onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={location.pathname === item.path}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <ListItemText primary={t(item.labelKey)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
