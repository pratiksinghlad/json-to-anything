import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, IconButton, List } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { menuItems } from "../../menuData";
import LanguageMenu from "./LanguageMenu";
import styles from "./MobileMenu.module.scss";

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

  const currentMenuItem = menuItems.find((item) => item.path === location.pathname);
  const pageTitle = currentMenuItem ? t(currentMenuItem.labelKey) : t("menu.jsonToCsv");

  return (
    <>
      <header className={styles.mobileMenu__header}>
        <div className={styles.mobileMenu__left}>
          <IconButton
            onClick={toggleDrawer(true)}
            aria-label={t("aria.openMenu")}
            className={styles.mobileMenu__hamburger}
            sx={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <h1 className={styles.mobileMenu__title}>{pageTitle}</h1>
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
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </div>

          <nav aria-label={t("aria.mainNavigation")}>
            <List className={styles.drawer__list}>
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavigation(item.path)}
                    onKeyDown={(e) => handleKeyDown(e, item.path)}
                    className={`${styles.drawer__item} ${isActive ? styles["drawer__item--active"] : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className={styles.drawer__itemText}>{t(item.labelKey)}</span>
                  </button>
                );
              })}
            </List>
          </nav>
        </div>
      </Drawer>
    </>
  );
};

export default MobileMenu;
