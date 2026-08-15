import React from "react";
import { Box, FormControlLabel, Switch, Typography, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";

interface DiffToolbarProps {
  hideWhitespace: boolean;
  disableLineWrap: boolean;
  onHideWhitespaceChange: (checked: boolean) => void;
  onDisableLineWrapChange: (checked: boolean) => void;
}

const DiffToolbar: React.FC<DiffToolbarProps> = ({
  hideWhitespace,
  disableLineWrap,
  onHideWhitespaceChange,
  onDisableLineWrapChange,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        py: 0.75,
        backgroundColor: "surface.light",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack direction="row" spacing={3} alignItems="center">
        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={hideWhitespace}
              onChange={(e) => onHideWhitespaceChange(e.target.checked)}
              inputProps={{ "aria-label": t("pages.compare.hideWhitespace") }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "text.primary",
                userSelect: "none",
              }}
            >
              {t("pages.compare.hideWhitespace")}
            </Typography>
          }
        />

        <FormControlLabel
          control={
            <Switch
              size="small"
              checked={disableLineWrap}
              onChange={(e) => onDisableLineWrapChange(e.target.checked)}
              inputProps={{ "aria-label": t("pages.compare.disableLineWrap") }}
            />
          }
          label={
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 500,
                color: "text.primary",
                userSelect: "none",
              }}
            >
              {t("pages.compare.disableLineWrap")}
            </Typography>
          }
        />
      </Stack>
    </Box>
  );
};

export default DiffToolbar;
