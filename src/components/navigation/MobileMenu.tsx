import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, IconButton, List, Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  AutoFixHigh,
  TableChart,
  Code,
  SwapHoriz,
  FactCheck,
  DifferenceOutlined,
  DataObject,
  Description,
  Settings,
  AccountTree,
  Info,
} from "@mui/icons-material";
import { headerMenuItems, moreMenuItems } from "../../menuData";
import LanguageMenu from "./LanguageMenu";
import styles from "./MobileMenu.module.scss";

// Map iconName strings to MUI icon components (tree-shakable, no dynamic import)
const IconMap: Record<string, React.ComponentType<{ fontSize?: "small" | "inherit" | "large" | "medium" }>> = {
  AutoFixHigh,
  TableChart,
  Code,
  SwapHoriz,
  FactCheck,
  DifferenceOutlined,
  DataObject,
  Description,
  Settings,
  AccountTree,
  Info,
};

const MobileMenu = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, path: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigation(path);
    }
  };

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const allItems = [...headerMenuItems, ...moreMenuItems];
  const currentMenuItem = allItems.find((item) => item.path === location.pathname);
  const pageTitle = currentMenuItem ? t(currentMenuItem.labelKey) : t("menu.beautifyJson");

  const renderMenuItem = (item: (typeof allItems)[0]) => {
    const IconComponent = IconMap[item.iconName];
    const isActive = location.pathname === item.path;
    return (
      <MenuItem
        key={item.key}
        selected={isActive}
        onClick={() => handleNavigation(item.path)}
        onKeyDown={(e) => handleKeyDown(e, item.path)}
        aria-current={isActive ? "page" : undefined}
        className={`${styles.drawer__item} ${isActive ? styles["drawer__item--active"] : ""}`}
      >
        {IconComponent && (
          <ListItemIcon className={styles.drawer__icon}>
            <IconComponent fontSize="small" />
          </ListItemIcon>
        )}
        <ListItemText primary={t(item.labelKey)} />
      </MenuItem>
    );
  };

  return (
    <>
      <header className={styles.mobileMenu__header}>
        <div className={styles.mobileMenu__left}>
          <IconButton
            onClick={toggleDrawer(true)}
            aria-label={t("aria.openMenu")}
            className={styles.mobileMenu__hamburger}
          >
            <MenuIcon />
          </IconButton>
          <h2 className={styles.mobileMenu__title}>{pageTitle}</h2>
        </div>
        <div className={styles.mobileMenu__languageWrapper}>
          <LanguageMenu mobile />
        </div>
      </header>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        classes={{
          paper: styles.drawer__paper,
        }}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        <div role="presentation">
          <div className={styles.mobileMenu__header}>
            <IconButton
              onClick={toggleDrawer(false)}
              aria-label={t("aria.closeMenu")}
              className={styles.mobileMenu__hamburger}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <nav aria-label={t("aria.mainNavigation")}>
            <List className={styles.drawer__list} disablePadding>
              {/* Primary tools section */}
              {headerMenuItems.map(renderMenuItem)}

              <Divider className={styles.drawer__divider} />

              {/* More tools section */}
              <div className={styles.drawer__sectionLabel}>{t("menu.moreTools")}</div>
              {moreMenuItems.map(renderMenuItem)}
            </List>
          </nav>
        </div>
      </Drawer>
    </>
  );
};

export default MobileMenu;
