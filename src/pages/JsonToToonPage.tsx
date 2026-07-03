import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import SavingsIcon from "@mui/icons-material/Savings";
import TokenIcon from "@mui/icons-material/Token";
import DataObjectIcon from "@mui/icons-material/DataObject";
import VerifiedIcon from "@mui/icons-material/Verified";
import DownloadIcon from "@mui/icons-material/Download";

import JsonEditorLayout from "../components/JsonEditor/JsonEditorLayout";
import EditorPanel from "../components/JsonEditor/EditorPanel";
import CenterPanel from "../components/JsonEditor/CenterPanel";
import CopyButton from "../components/CopyButton";
import ValidationResults from "../components/ValidationResults";
import { parseJson } from "../utils/parseJson";
import { jsonToToon } from "../utils/jsonToToon";
import { countTokens, calculateSavings, formatNumber } from "../utils/tokenizer";
import { isBlankInput } from "../utils/isBlankInput";
import { useJsonEditorAccessibility } from "../hooks/useJsonEditorAccessibility";

const DEFAULT_JSON = `[
  {
    "id": 1,
    "name": "Pratik",
    "email": "pratik@example.com",
    "role": "engineer",
    "department": "technology",
    "active": true
  },
  {
    "id": 2,
    "name": "Alice",
    "email": "alice@example.com",
    "role": "designer",
    "department": "creative",
    "active": true
  },
  {
    "id": 3,
    "name": "Bob",
    "email": "bob@example.com",
    "role": "manager",
    "department": "operations",
    "active": false
  }
]`;

interface TokenStatsCardProps {
  jsonTokens: number;
  toonTokens: number;
  savedPercentage: number;
  savedTokens: number;
}

const TokenStatsCard = ({
  jsonTokens,
  toonTokens,
  savedPercentage,
  savedTokens,
}: TokenStatsCardProps) => {
  const { t } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        borderRadius: 2,
        color: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <TokenIcon sx={{ fontSize: 20 }} />
        <Typography variant="subtitle2" fontWeight="bold">
          {t("pages.jsonToToon.tokenStats")}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 2 }}>
        <Box sx={{ minWidth: 120 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
            <DataObjectIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>
              {t("pages.jsonToToon.jsonTokens")}
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#f8fafc" }}>
            {formatNumber(jsonTokens)}
          </Typography>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
            <VerifiedIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>
              {t("pages.jsonToToon.toonTokens")}
            </Typography>
          </Box>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "#22c55e" }}>
            {formatNumber(toonTokens)}
          </Typography>
        </Box>

        <Box sx={{ minWidth: 140 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
            <SavingsIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>
              {t("pages.jsonToToon.saved")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#22c55e" }}>
              {savedPercentage}%
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
              ({formatNumber(savedTokens)} {t("pages.jsonToToon.tokens")})
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Chip
          label="Saved:@.github"
          size="small"
          sx={{
            backgroundColor: "rgba(34, 197, 94, 0.2)",
            color: "#22c55e",
            fontFamily: "monospace",
            fontSize: "0.75rem",
            height: 24,
            "& .MuiChip-label": {
              px: 1,
            },
          }}
        />
        <Typography variant="caption" sx={{ color: "#64748b", fontStyle: "italic" }}>
          {t("pages.jsonToToon.privacyNote")}
        </Typography>
      </Box>
    </Paper>
  );
};

const JsonToToonPage = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { leftPanelRef, rightPanelRef } = useJsonEditorAccessibility();

  // Memoized TOON conversion options
  const toonOptions = useMemo(
    () => ({
      delimiter: "," as const,
      indentSize: 2,
      includeLengthMarkers: true,
    }),
    [],
  );

  const conversion = useMemo(() => {
    if (isBlankInput(jsonInput)) {
      return { toonOutput: "", errors: [], jsonTokens: 0, toonTokens: 0 };
    }

    const parseResult = parseJson(jsonInput);
    if (!parseResult.success) {
      return {
        toonOutput: "",
        errors: [{ message: parseResult.error || t("errors.invalidJson"), line: parseResult.line }],
        jsonTokens: 0,
        toonTokens: 0,
      };
    }

    try {
      const result = jsonToToon(parseResult.data, toonOptions);
      if (!result.success) {
        return { toonOutput: "", errors: [{ message: result.error }], jsonTokens: 0, toonTokens: 0 };
      }

      return {
        toonOutput: result.output,
        errors: [],
        jsonTokens: countTokens(jsonInput).tokenCount,
        toonTokens: countTokens(result.output).tokenCount,
      };
    } catch (e) {
      return {
        toonOutput: "",
        errors: [{ message: e instanceof Error ? e.message : "Conversion error" }],
        jsonTokens: 0,
        toonTokens: 0,
      };
    }
  }, [jsonInput, toonOptions, t]);

  const { toonOutput, errors, jsonTokens, toonTokens } = conversion;
  const savings = useMemo(() => calculateSavings(jsonTokens, toonTokens), [jsonTokens, toonTokens]);

  // Download TOON file
  const handleDownloadToon = useCallback(() => {
    if (!toonOutput) return;

    const now = new Date();
    const timestamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}${String(now.getSeconds()).padStart(2, "0")}`;
    const filename = `data-${timestamp}.toon`;

    const blob = new Blob([toonOutput], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSnackbarMessage(t("snackbar.toonDownloaded"));
    setSnackbarOpen(true);
  }, [toonOutput, t]);

  return (
    <>
      <JsonEditorLayout
        leftPanel={
          <EditorPanel
            ref={leftPanelRef}
            title={t("common.json")}
            value={jsonInput}
            onChange={setJsonInput}
            language="json"
            showMarkdownCopy={true}
          />
        }
        centerPanel={<CenterPanel />}
        rightPanel={
          <EditorPanel
            ref={rightPanelRef}
            title={t("common.toon")}
            value={toonOutput}
            language="plaintext"
            readOnly={true}
            showMarkdownCopy={true}
          />
        }
        bottomPanel={
          <Box sx={{ p: 2 }}>
            {/* Progress indicator for large files */}
            {/* Validation error display */}
            <ValidationResults errors={errors} />

            {/* Token Stats Card */}
            {errors.length === 0 && (
              <TokenStatsCard
                jsonTokens={jsonTokens}
                toonTokens={toonTokens}
                savedPercentage={savings.savedPercentage}
                savedTokens={savings.savedTokens}
              />
            )}

            {/* Action buttons */}
            <Box sx={{ mt: 2, display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadToon}
                disabled={!toonOutput}
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                {t("buttons.downloadToon")}
              </Button>
              <CopyButton value={toonOutput} />
            </Box>
          </Box>
        }
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default JsonToToonPage;
