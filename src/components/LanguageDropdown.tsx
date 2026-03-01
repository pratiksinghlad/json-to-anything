import { useTranslation } from "react-i18next";
import { FormControl, Select, MenuItem, Box, type SelectChangeEvent } from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { languageOptions } from "../menuData";

const LanguageDropdown = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  const currentLang = i18n.language.split("-")[0];

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "4px",
        px: 1,
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.15)",
        },
      }}
    >
      <LanguageIcon sx={{ fontSize: 18, mr: 0.5, color: "rgba(255, 255, 255, 0.8)" }} />
      <FormControl variant="standard" size="small">
        <Select
          value={currentLang}
          onChange={handleLanguageChange}
          disableUnderline
          sx={{
            color: "#fff",
            fontSize: "0.85rem",
            fontWeight: 500,
            "& .MuiSelect-select": {
              py: 0.5,
              pr: "24px !important", // Space for the arrow
              display: "flex",
              alignItems: "center",
              "&:focus": {
                backgroundColor: "transparent",
              },
            },
            "& .MuiSvgIcon-root": {
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "1.2rem",
            },
          }}
          MenuProps={{
            PaperProps: {
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
            },
          }}
          aria-label={t("aria.languageSelector")}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.nativeLabel}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageDropdown;
