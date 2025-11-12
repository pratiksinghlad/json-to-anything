import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { Language as LanguageIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { languageOptions } from "../../menuData";
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
              backgroundColor: "#ffffff",
              border: "2px solid #d0d0d0",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            },
            "& .MuiMenuItem-root": {
              color: "#000000",
              fontSize: "0.9375rem",
              padding: "12px 20px",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(25, 118, 210, 0.12)",
                color: "#1976d2",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.18)",
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
            backgroundColor: "#ffffff",
            border: "2px solid #d0d0d0",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            marginTop: "8px",
          },
          "& .MuiMenuItem-root": {
            color: "#000000",
            fontSize: "0.9375rem",
            padding: "12px 20px",
            minWidth: "160px",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            "&.Mui-selected": {
              backgroundColor: "rgba(25, 118, 210, 0.12)",
              color: "#1976d2",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.18)",
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
