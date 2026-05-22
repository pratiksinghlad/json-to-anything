import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { languageOptions } from "../../menuData";

interface LanguageMenuProps {
  mobile?: boolean;
}

const LanguageMenu = ({ mobile = false }: LanguageMenuProps) => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const getNormalizedLanguage = () => {
    const lang = i18n.language ? i18n.language.split("-")[0] : "en";
    return languageOptions.some((opt) => opt.code === lang) ? lang : "en";
  };

  const currentLang = getNormalizedLanguage();
  const currentLanguageOption = languageOptions.find((option) => option.code === currentLang) ?? languageOptions[0];

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    void i18n.changeLanguage(languageCode);
    handleClose();
  };

  const triggerAriaProps = {
    "aria-label": t("aria.languageSelector"),
    "aria-haspopup": true,
    "aria-expanded": isOpen,
    "aria-controls": isOpen ? "navigation-language-menu" : undefined,
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {mobile ? (
        <IconButton color="inherit" onClick={handleOpen} {...triggerAriaProps}>
          <LanguageIcon />
        </IconButton>
      ) : (
        <Button
          color="inherit"
          size="small"
          startIcon={<LanguageIcon sx={{ fontSize: 18 }} />}
          onClick={handleOpen}
          {...triggerAriaProps}
          sx={{
            color: "#fff",
            fontSize: "0.85rem",
            fontWeight: 500,
            textTransform: "none",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
            px: 1,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.15)",
            },
          }}
        >
          {currentLanguageOption.nativeLabel}
        </Button>
      )}

      <Menu
        id="navigation-language-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-label": t("aria.languageSelector"),
          role: "menu",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            bgcolor: "#1e293b",
            color: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            "& .MuiMenuItem-root": {
              fontSize: "0.875rem",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.1)",
              },
              "&.Mui-selected": {
                bgcolor: "primary.main",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              },
            },
          },
        }}
      >
        {languageOptions.map((option) => (
          <MenuItem
            key={option.code}
            selected={option.code === currentLang}
            onClick={() => handleLanguageChange(option.code)}
            role="menuitem"
          >
            {option.nativeLabel}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageMenu;
