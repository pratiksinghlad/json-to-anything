import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Paper,
  Stack,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";

interface OptionsBarProps {
  separator: "," | ";" | "\t";
  includeHeader: boolean;
  trimEmptyColumns: boolean;
  pascalCaseHeaders: boolean;
  onSeparatorChange: (separator: "," | ";" | "\t") => void;
  onIncludeHeaderChange: (include: boolean) => void;
  onTrimEmptyColumnsChange: (trim: boolean) => void;
  onPascalCaseHeadersChange: (pascalCase: boolean) => void;
}

export default function OptionsBar({
  separator,
  includeHeader,
  trimEmptyColumns,
  pascalCaseHeaders,
  onSeparatorChange,
  onIncludeHeaderChange,
  onTrimEmptyColumnsChange,
  onPascalCaseHeadersChange,
}: OptionsBarProps) {
  const { t } = useTranslation();
  const handleSeparatorChange = (event: SelectChangeEvent) => {
    onSeparatorChange(event.target.value as "," | ";" | "\t");
  };

  const getSeparatorLabel = (sep: string) => {
    switch (sep) {
      case ",":
        return t("options.separatorComma");
      case ";":
        return t("options.separatorSemicolon");
      case "\t":
        return t("options.separatorTab");
      default:
        return sep;
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        mb: 2,
        border: "2px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center">
        <FormControl
          size="small"
          sx={{
            minWidth: 150,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#ffffff",
              "& fieldset": {
                borderColor: "#d0d0d0",
              },
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        >
          <InputLabel id="separator-label">{t("options.separator")}</InputLabel>
          <Select
            labelId="separator-label"
            id="separator-select"
            value={separator}
            label={t("options.separator")}
            onChange={handleSeparatorChange}
            aria-label={t("aria.separator")}
          >
            <MenuItem value=",">{getSeparatorLabel(",")}</MenuItem>
            <MenuItem value=";">{getSeparatorLabel(";")}</MenuItem>
            <MenuItem value="\t">{getSeparatorLabel("\t")}</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={includeHeader}
              onChange={(e) => onIncludeHeaderChange(e.target.checked)}
              aria-label={t("options.includeHeader")}
            />
          }
          label={t("options.includeHeader")}
          sx={{
            "& .MuiFormControlLabel-label": {
              color: "#000000",
              fontSize: "0.875rem",
            },
          }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={trimEmptyColumns}
              onChange={(e) => onTrimEmptyColumnsChange(e.target.checked)}
              aria-label={t("options.trimEmptyColumns")}
            />
          }
          label={t("options.trimEmptyColumns")}
          sx={{
            "& .MuiFormControlLabel-label": {
              color: "#000000",
              fontSize: "0.875rem",
            },
          }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={pascalCaseHeaders}
              onChange={(e) => onPascalCaseHeadersChange(e.target.checked)}
              aria-label={t("options.pascalCaseHeaders")}
            />
          }
          label={t("options.pascalCaseHeaders")}
          sx={{
            "& .MuiFormControlLabel-label": {
              color: "#000000",
              fontSize: "0.875rem",
            },
          }}
        />
      </Stack>
    </Paper>
  );
}
