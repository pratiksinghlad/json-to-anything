import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Language as LanguageIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { languageOptions } from "../../menuData";
import { themeConfig } from "../../themeConfig";
import styles from "./LanguageMenu.module.scss";

interface LanguageMenuProps {
  mobile?: boolean;
}

const LanguageMenu = ({ mobile = false }: LanguageMenuProps) => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  const currentLanguage = languageOptions.find((lang) => lang.code === i18n.language) || languageOptions[0];

  if (mobile) {
    return (
      <div className={styles.languageMenu}>
        <IconButton
          onClick={handleClick}
          aria-label={t("aria.languageSelector")}
          aria-expanded={open}
          aria-haspopup="true"
          className={styles.languageMenu__button + " " + styles["languageMenu__button--mobile"]}
        >
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPaper-root": {
              backgroundColor: themeConfig.SURFACE_BG,
              border: `2px solid ${themeConfig.BORDER_COLOR}`,
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
            "& .MuiMenuItem-root": {
              color: themeConfig.TEXT_PRIMARY,
              fontSize: "0.9375rem",
              padding: "12px 20px",
              "&:hover": {
                backgroundColor: themeConfig.SURFACE_LIGHT,
              },
              "&.Mui-selected": {
                backgroundColor: themeConfig.ACTIVE_BG,
                color: themeConfig.PRIMARY_COLOR,
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: themeConfig.ACTIVE_BG_HOVER,
                },
              },
            },
          }}
        >
          {languageOptions.map((lang) => (
            <MenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              selected={lang.code === i18n.language}
            >
              {lang.nativeLabel}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }

  return (
    <div className={styles.languageMenu}>
      <button
        onClick={handleClick}
        aria-label={t("aria.languageSelector")}
        aria-expanded={open}
        aria-haspopup="true"
        className={styles.languageMenu__button}
      >
        <LanguageIcon className={styles.languageMenu__flag} />
        <span className={styles.languageMenu__label}>{currentLanguage.nativeLabel}</span>
        <ExpandMoreIcon className={`${styles.languageMenu__icon} ${open ? styles["languageMenu__icon--open"] : ""}`} />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: themeConfig.SURFACE_BG,
            border: `2px solid ${themeConfig.BORDER_COLOR}`,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            marginTop: "8px",
          },
          "& .MuiMenuItem-root": {
            color: themeConfig.TEXT_PRIMARY,
            fontSize: "0.9375rem",
            padding: "12px 20px",
            minWidth: "160px",
            "&:hover": {
              backgroundColor: themeConfig.SURFACE_LIGHT,
            },
            "&.Mui-selected": {
              backgroundColor: themeConfig.ACTIVE_BG,
              color: themeConfig.PRIMARY_COLOR,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: themeConfig.ACTIVE_BG_HOVER,
              },
            },
          },
        }}
      >
        {languageOptions.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={lang.code === i18n.language}
          >
            {lang.nativeLabel}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default LanguageMenu;
