import { useTranslation } from "react-i18next";
import {
  FormControl,
  Select,
  MenuItem,
  Box,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import { Language as LanguageIcon } from "@mui/icons-material";
import { languageOptions } from "../../menuData";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <LanguageIcon fontSize="small" color="action" />
      <FormControl variant="standard" size="small" sx={{ minWidth: 100 }}>
        <Select
          value={i18n.language.split("-")[0]} // Handle regional variants
          onChange={handleLanguageChange}
          disableUnderline
          sx={{
            fontSize: "0.875rem",
            fontWeight: 500,
            "& .MuiSelect-select": {
              py: 0.5,
              display: "flex",
              alignItems: "center",
            },
          }}
          aria-label={t("aria.languageSelector")}
        >
          {languageOptions.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              <Typography variant="body2">{option.nativeLabel}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSwitcher;
