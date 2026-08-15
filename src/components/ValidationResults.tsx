import { useTranslation } from "react-i18next";
import { Box, Typography, Chip, List, ListItem, ListItemText } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import type { ValidationError } from "../types/validationTypes";

interface ValidationResultsProps {
  errors: ValidationError[];
  hideTitle?: boolean;
}

/**
 * Displays validation errors in a styled panel matching the ValidateJsonPage design.
 * Renders nothing when the errors array is empty.
 */
const ValidationResults = ({ errors, hideTitle = false }: ValidationResultsProps) => {
  const { t } = useTranslation();

  if (errors.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      {!hideTitle && (
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t("pages.validate.results")}
        </Typography>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Chip
          icon={<ErrorIcon />}
          label={t("pages.validate.invalid")}
          color="error"
          variant="filled"
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: "error.main" }}>
          {t("pages.validate.errorsFound", { count: errors.length })}
        </Typography>
        <List
          dense
          sx={{
            bgcolor: "rgba(211, 47, 47, 0.05)",
            borderRadius: 1,
            border: "1px solid rgba(211, 47, 47, 0.2)",
          }}
        >
          {errors.map((err, index) => (
            <ListItem
              key={`${err.path ?? ""}-${err.line ?? ""}-${err.message}`}
              sx={{
                borderBottom:
                  index < errors.length - 1 ? "1px solid rgba(211, 47, 47, 0.1)" : "none",
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  variant: "body2",
                  sx: { color: "error.main", fontWeight: 500 },
                }}
                primary={`${err.line ? `[${t("pages.validate.line")} ${err.line}] ` : ""}${err.message}`}
                secondary={err.path ? `${t("pages.validate.path")}: ${err.path}` : null}
                secondaryTypographyProps={{
                  variant: "caption",
                  sx: { color: "text.secondary" },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <br></br>
    </Box>
  );
};

export default ValidationResults;
