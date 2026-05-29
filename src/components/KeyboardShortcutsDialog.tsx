import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onClose: () => void;
}

const ShortcutItem = ({ keys, description }: { keys: string[]; description: string }) => (
  <Grid container spacing={2} sx={{ mb: 1.5, alignItems: "center" }}>
    <Grid size={{ xs: 5 }} sx={{ display: "flex", gap: 0.5, justifyContent: "flex-end" }}>
      {keys.map((key) => (
        <Box
          key={key}
          component="kbd"
          sx={{
            px: 1,
            py: 0.5,
            fontSize: "0.75rem",
            fontWeight: "bold",
            lineHeight: 1,
            color: "text.primary",
            bgcolor: "action.hover",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            boxShadow: "0 1px 0 rgba(0,0,0,0.1)",
            fontFamily: "monospace",
          }}
        >
          {key}
        </Box>
      ))}
    </Grid>
    <Grid size={{ xs: 7 }}>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Grid>
  </Grid>
);

const KeyboardShortcutsDialog = ({ open, onClose }: KeyboardShortcutsDialogProps) => {
  const { t } = useTranslation();

  const shortcuts = [
    { section: t("shortcuts.navigation") || "Navigation", items: [
      { keys: ["Alt", "1"], description: t("shortcuts.focusInput") || "Focus Input Editor" },
      { keys: ["Alt", "2"], description: t("shortcuts.focusOutput") || "Focus Output Editor" },
      { keys: ["Alt", "?"], description: t("shortcuts.toggleHelp") || "Toggle Shortcuts Help" },
    ]},
    { section: t("shortcuts.actions") || "Actions", items: [
      { keys: ["Alt", "C"], description: t("shortcuts.copyOutput") || "Copy Output content" },
      { keys: ["Alt", "X"], description: t("shortcuts.clearInput") || "Clear Input content" },
    ]},
    { section: t("shortcuts.viewModes") || "Editor View Modes", items: [
      { keys: ["Alt", "T"], description: t("shortcuts.textView") || "Switch to Text View" },
      { keys: ["Alt", "E"], description: t("shortcuts.treeView") || "Switch to Tree View" },
      { keys: ["Alt", "B"], description: t("shortcuts.tableView") || "Switch to Table View" },
    ]},
    { section: t("shortcuts.pageSwitching") || "Page Switching (Tabs)", items: [
      { keys: ["Alt", "Shift", "C"], description: t("shortcuts.navCsv") || "Switch to JSON to CSV" },
      { keys: ["Alt", "Shift", "X"], description: t("shortcuts.navXml") || "Switch to JSON to XML" },
      { keys: ["Alt", "Shift", "B"], description: t("shortcuts.navBeautify") || "Switch to Beautify JSON" },
      { keys: ["Alt", "Shift", "V"], description: t("shortcuts.navValidate") || "Switch to Validate JSON" },
      { keys: ["Alt", "Shift", "Y"], description: t("shortcuts.navYaml") || "Switch to JSON to YAML" },
      { keys: ["Alt", "Shift", "L"], description: t("shortcuts.navToml") || "Switch to JSON to TOML" },
      { keys: ["Alt", "Shift", "D"], description: t("shortcuts.navCompare") || "Switch to Compare Text" },
    ]},
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>{t("common.keyboardShortcuts") || "Keyboard Shortcuts"}</DialogTitle>
      <DialogContent>
        {shortcuts.map((section) => (
          <Box key={section.section} sx={{ mb: 3 }}>
            <Typography variant="overline" sx={{ fontWeight: "bold", color: "primary.main", mb: 1, display: "block" }}>
              {section.section}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {section.items.map((item) => (
              <ShortcutItem key={`${section.section}-${item.keys.join("-")}`} keys={item.keys} description={item.description} />
            ))}
          </Box>
        ))}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="outlined" size="small">
          {"Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KeyboardShortcutsDialog;
