import { useState, useRef, useCallback, useEffect, useMemo } from "react";
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
  Paper,
  Popper,
  Grow,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  HelpOutline as HelpOutlineIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { headerMenuItems, moreMenuItems } from "../../menuData";
import type { MenuItem as MenuItemType } from "../../menuData";
import LanguageMenu from "../LanguageMenu";
import KeyboardShortcutsDialog from "../KeyboardShortcutsDialog";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";

// oxlint-disable-next-line react-doctor/no-giant-component -- Header owns responsive shell state; menu leaf components are already split in navigation/.
const Header = () => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const pathname = routerLocation.pathname;
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreAnchorRef = useRef<HTMLButtonElement>(null);

  const hasActiveMoreItem = useMemo(
    () => moreMenuItems.some((item) => item.path === pathname),
    [pathname],
  );

  const primaryHeaderItems = useMemo(
    () => headerMenuItems.filter((item: MenuItemType) => item.key !== "about"),
    [],
  );

  const aboutItem = useMemo(() => headerMenuItems.find((item: MenuItemType) => item.key === "about"), []);

  useKeyboardShortcuts([
    {
      key: "/",
      altKey: true,
      action: () => setShortcutsOpen((prev) => !prev),
      options: { preventDefault: true },
    },
    {
      key: "?",
      altKey: true,
      action: () => setShortcutsOpen((prev) => !prev),
      options: { preventDefault: true },
    },
    // Page switching shortcuts (Alt + Shift + [Letter])
    {
      key: "c",
      altKey: true,
      shiftKey: true,
      action: () => navigate("/"),
      options: { preventDefault: true },
    },
    {
      key: "x",
      altKey: true,
      shiftKey: true,
      action: () => navigate("/json-to-xml"),
      options: { preventDefault: true },
    },
    {
      key: "b",
      altKey: true,
      shiftKey: true,
      action: () => navigate("/beautify"),
      options: { preventDefault: true },
    },
    {
      key: "v",
      altKey: true,
      shiftKey: true,
      action: () => navigate("/validate"),
      options: { preventDefault: true },
    },
    {
      key: "y",
      altKey: true,
      shiftKey: true,
      action: () => navigate("/json-to-yaml"),
      options: { preventDefault: true },
    },
    {
      key: "l",
      altKey: true,
      shiftKey: true,
      action: () => navigate("/json-to-toml"),
      options: { preventDefault: true },
    },
    {
      key: "d",
      altKey: true,
      shiftKey: true,
      action: () => navigate("/compare"),
      options: { preventDefault: true },
    },
  ]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
    setMoreOpen(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleMoreToggle = useCallback(() => {
    setMoreOpen((prev) => !prev);
  }, []);

  const handleMoreClose = useCallback(() => {
    setMoreOpen(false);
  }, []);

  // Close "More Tools" on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && moreOpen) {
        setMoreOpen(false);
        moreAnchorRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [moreOpen]);

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
          role="link"
          tabIndex={0}
          aria-label={t("common.home") || "Home"}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate("/");
            }
          }}
        >
          <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontSize: "1.0rem" }}>
            JSON to anything
          </Typography>
        </Box>

        {/* Desktop Navigation — Primary tools + More Tools dropdown */}
        {!isMobile && (
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            {/* Primary tools (except About) */}
            {primaryHeaderItems.map((item) => (
              <Button
                key={item.key}
                color="inherit"
                onClick={() => handleNavigation(item.path)}
                sx={{
                  textTransform: "none",
                  fontSize: "0.85rem",
                  opacity: pathname === item.path ? 1 : 0.7,
                  borderBottom: pathname === item.path ? "2px solid #fff" : "none",
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

            {/* More Tools dropdown */}
            <Button
              ref={moreAnchorRef}
              color="inherit"
              id="more-tools-button"
              aria-controls={moreOpen ? "more-tools-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={moreOpen ? "true" : undefined}
              onClick={handleMoreToggle}
              endIcon={
                <KeyboardArrowDownIcon
                  fontSize="small"
                  sx={{
                    transition: "transform 0.2s ease-in-out",
                    transform: moreOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              }
              sx={{
                textTransform: "none",
                fontSize: "0.85rem",
                opacity: hasActiveMoreItem || moreOpen ? 1 : 0.7,
                borderBottom: hasActiveMoreItem ? "2px solid #fff" : "none",
                borderRadius: 0,
                px: 1,
                minWidth: "auto",
                "&:hover": { opacity: 1 },
              }}
            >
              {t("menu.moreTools")}
            </Button>

            <Popper
              open={moreOpen}
              anchorEl={moreAnchorRef.current}
              placement="bottom-start"
              transition
              disablePortal={false}
              style={{ zIndex: 20 }}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin: placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      mt: 0.5,
                      minWidth: 200,
                      borderRadius: 1,
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <ClickAwayListener onClickAway={handleMoreClose}>
                      <MenuList
                        autoFocusItem={moreOpen}
                        id="more-tools-menu"
                        aria-labelledby="more-tools-button"
                        dense
                      >
                        {moreMenuItems.map((item) => {
                          const isActive = pathname === item.path;
                          return (
                            <MenuItem
                              key={item.key}
                              selected={isActive}
                              onClick={() => handleNavigation(item.path)}
                              aria-current={isActive ? "page" : undefined}
                              sx={{
                                fontSize: "0.875rem",
                                "&.Mui-selected": {
                                  bgcolor: "primary.light",
                                  color: "primary.contrastText",
                                },
                                "&:hover": { bgcolor: "action.hover" },
                              }}
                            >
                              <ListItemText primary={t(item.labelKey)} />
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            {/* About tool moved to the end, after More Tools */}
            {aboutItem && (
              <Button
                key={aboutItem.key}
                color="inherit"
                onClick={() => handleNavigation(aboutItem.path)}
                sx={{
                  textTransform: "none",
                  fontSize: "0.85rem",
                  opacity: pathname === aboutItem.path ? 1 : 0.7,
                  borderBottom: pathname === aboutItem.path ? "2px solid #fff" : "none",
                  borderRadius: 0,
                  px: 1,
                  minWidth: "auto",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                {t(aboutItem.labelKey)}
              </Button>
            )}
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Language Menu and Mobile Toggle */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: "fit-content" }}>
          <IconButton
            color="inherit"
            onClick={() => setShortcutsOpen(true)}
            size="small"
            title={t("common.keyboardShortcuts") || "Help Shortcuts"}
            aria-label={t("common.keyboardShortcuts") || "Shortcuts Help"}
          >
            <HelpOutlineIcon fontSize="small" />
          </IconButton>
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

        {/* Mobile Drawer — shows all items in sections */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiPaper-root": {
              width: 280,
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

          {/* Primary tools (except About) */}
          <List dense>
            {primaryHeaderItems.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={pathname === item.path}
                  sx={{
                    "&.Mui-selected": { bgcolor: "rgba(255,255,255,0.15)" },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  <ListItemText primary={t(item.labelKey)} primaryTypographyProps={{ fontSize: "0.9rem" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mx: 2 }} />

          {/* More tools section */}
          <Typography
            variant="overline"
            sx={{
              color: "rgba(255,255,255,0.5)",
              px: 2,
              pt: 1,
              pb: 0.5,
              display: "block",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
            }}
          >
            {t("menu.moreTools")}
          </Typography>
          <List dense>
            {moreMenuItems.map((item) => (
              <ListItem key={item.key} disablePadding>
                <ListItemButton
                  onClick={() => handleNavigation(item.path)}
                  selected={pathname === item.path}
                  sx={{
                    "&.Mui-selected": { bgcolor: "rgba(255,255,255,0.15)" },
                    "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                  }}
                >
                  <ListItemText primary={t(item.labelKey)} primaryTypographyProps={{ fontSize: "0.9rem" }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          {/* About tool at the end */}
          {aboutItem && (
            <>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.15)", mx: 2 }} />
              <List dense>
                <ListItem key={aboutItem.key} disablePadding>
                  <ListItemButton
                    onClick={() => handleNavigation(aboutItem.path)}
                    selected={pathname === aboutItem.path}
                    sx={{
                      "&.Mui-selected": { bgcolor: "rgba(255,255,255,0.15)" },
                      "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
                    }}
                  >
                    <ListItemText primary={t(aboutItem.labelKey)} primaryTypographyProps={{ fontSize: "0.9rem" }} />
                  </ListItemButton>
                </ListItem>
              </List>
            </>
          )}
        </Drawer>
      </Toolbar>
      <KeyboardShortcutsDialog open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />
    </AppBar>
  );
};

export default Header;
