import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Paper, Popper, Grow, ClickAwayListener, MenuList, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import {
  KeyboardArrowDown as ArrowDownIcon,
  DataObject,
  Description,
  Settings,
  AccountTree,
  TableChart,
  Info,
} from "@mui/icons-material";
import { moreMenuItems } from "../../menuData";
import styles from "./MoreToolsMenu.module.scss";

// Map iconName strings to MUI icon components (avoids dynamic imports)
const IconMap: Record<string, React.ComponentType<{ fontSize?: "small" | "inherit" | "large" | "medium" }>> = {
  DataObject,
  Description,
  Settings,
  AccountTree,
  TableChart,
  Info,
};

const MoreToolsMenu = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const hasActiveMoreItem = moreMenuItems.some((item) => item.path === location.pathname);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      setOpen(false);
    },
    [navigate],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>, path: string) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleNavigate(path);
      }
    },
    [handleNavigate],
  );

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        anchorRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <div className={styles.moreTools}>
      <button
        type="button"
        ref={anchorRef}
        id="more-tools-button"
        aria-controls={open ? "more-tools-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleToggle}
        className={`${styles.moreTools__trigger} ${hasActiveMoreItem ? styles["moreTools__trigger--active"] : ""}`}
      >
        {t("menu.moreTools")}
        <ArrowDownIcon
          fontSize="small"
          className={`${styles.moreTools__arrow} ${open ? styles["moreTools__arrow--open"] : ""}`}
        />
      </button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
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
            <Paper elevation={4} className={styles.moreTools__paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="more-tools-menu"
                  aria-labelledby="more-tools-button"
                  className={styles.moreTools__list}
                >
                  {moreMenuItems.map((item) => {
                    const IconComponent = IconMap[item.iconName];
                    const isActive = location.pathname === item.path;
                    return (
                      <MenuItem
                        key={item.key}
                        selected={isActive}
                        onClick={() => handleNavigate(item.path)}
                        onKeyDown={(e) => handleKeyDown(e, item.path)}
                        aria-current={isActive ? "page" : undefined}
                        className={`${styles.moreTools__item} ${isActive ? styles["moreTools__item--active"] : ""}`}
                      >
                        {IconComponent && (
                          <ListItemIcon className={styles.moreTools__icon}>
                            <IconComponent fontSize="small" />
                          </ListItemIcon>
                        )}
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
    </div>
  );
};

export default MoreToolsMenu;
