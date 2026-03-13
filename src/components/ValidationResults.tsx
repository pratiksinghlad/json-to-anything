import { useTranslation } from "react-i18next";
import { Box, Typography, Chip, List, ListItem, ListItemText } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import type { ValidationError } from "../types/validationTypes";

interface ValidationResultsProps {
  errors: ValidationError[];
}

/**
 * Displays validation errors in a styled panel matching the ValidateJsonPage design.
 * Renders nothing when the errors array is empty.
 */
const ValidationResults = ({ errors }: ValidationResultsProps) => {
  const { t } = useTranslation();

  if (errors.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {t("pages.validate.results")}
      </Typography>

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
              key={index}
              sx={{
                borderBottom:
                  index < errors.length - 1 ? "1px solid rgba(211, 47, 47, 0.1)" : "none",
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ color: "error.main", fontWeight: 500 }}>
                    {err.line && (
                      <Box component="span" sx={{ mr: 1, fontWeight: "bold" }}>
                        [{t("pages.validate.line")} {err.line}]
                      </Box>
                    )}
                    {err.message}
                  </Typography>
                }
                secondary={
                  err.path ? (
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {t("pages.validate.path")}: <strong>{err.path}</strong>
                    </Typography>
                  ) : null
                }
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
