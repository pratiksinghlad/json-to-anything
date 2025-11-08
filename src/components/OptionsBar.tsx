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
  const handleSeparatorChange = (event: SelectChangeEvent) => {
    onSeparatorChange(event.target.value as "," | ";" | "\t");
  };

  const getSeparatorLabel = (sep: string) => {
    switch (sep) {
      case ",":
        return "Comma (,)";
      case ";":
        return "Semicolon (;)";
      case "\t":
        return "Tab";
      default:
        return sep;
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="separator-label">Separator</InputLabel>
          <Select
            labelId="separator-label"
            id="separator-select"
            value={separator}
            label="Separator"
            onChange={handleSeparatorChange}
            aria-label="CSV separator"
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
              aria-label="Include header row"
            />
          }
          label="Include header"
        />

        <FormControlLabel
          control={
            <Switch
              checked={trimEmptyColumns}
              onChange={(e) => onTrimEmptyColumnsChange(e.target.checked)}
              aria-label="Trim empty columns"
            />
          }
          label="Trim empty columns"
        />

        <FormControlLabel
          control={
            <Switch
              checked={pascalCaseHeaders}
              onChange={(e) => onPascalCaseHeadersChange(e.target.checked)}
              aria-label="Convert headers to Pascal case"
            />
          }
          label="Pascal case headers"
        />
      </Stack>
    </Paper>
  );
}
