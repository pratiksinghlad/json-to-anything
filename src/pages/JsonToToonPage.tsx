import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Alert,
  LinearProgress,
  Button,
  Snackbar,
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
import { parseJson } from "../utils/parseJson";
import { jsonToToon } from "../utils/jsonToToon";
import { countTokens, calculateSavings, formatNumber } from "../utils/tokenizer";

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

const JsonToToonPage = () => {
  const { t } = useTranslation();
  const [jsonInput, setJsonInput] = useState(DEFAULT_JSON);
  const [toonOutput, setToonOutput] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Token counts
  const [jsonTokens, setJsonTokens] = useState(0);
  const [toonTokens, setToonTokens] = useState(0);

  // Memoized TOON conversion options
  const toonOptions = useMemo(
    () => ({
      delimiter: "," as const,
      indentSize: 2,
      includeLengthMarkers: true,
    }),
    [],
  );

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

  // Convert JSON to TOON and calculate tokens
  const processConversion = useCallback(() => {
    // Validate JSON first
    const parseResult = parseJson(jsonInput);
    if (!parseResult.success) {
      if (parseResult.error === "Input is empty") {
        setError(t("errors.emptyInput"));
      } else {
        setError(t("errors.invalidJson"));
      }
      setToonOutput("");
      setJsonTokens(0);
      setToonTokens(0);
      return;
    }

    // Check if input is large (> 1MB)
    const isLarge = jsonInput.length > 1024 * 1024;
    if (isLarge) {
      setIsProcessing(true);
    }

    // Use setTimeout to allow UI to update for large inputs
    const doConversion = () => {
      try {
        // Convert to TOON
        const result = jsonToToon(parseResult.data, toonOptions);

        if (!result.success) {
          setError(result.error);
          setToonOutput("");
          setJsonTokens(0);
          setToonTokens(0);
        } else {
          setError(undefined);
          setToonOutput(result.output);

          // Count tokens for both formats
          const jsonTokenResult = countTokens(jsonInput);
          const toonTokenResult = countTokens(result.output);

          setJsonTokens(jsonTokenResult.tokenCount);
          setToonTokens(toonTokenResult.tokenCount);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "Conversion error");
        setToonOutput("");
      } finally {
        setIsProcessing(false);
      }
    };

    if (isLarge) {
      setTimeout(doConversion, 10);
    } else {
      doConversion();
    }
  }, [jsonInput, toonOptions, t]);

  // Effect to run conversion when input changes
  useEffect(() => {
    processConversion();
  }, [processConversion]);

  // Calculate savings
  const savings = useMemo(() => {
    return calculateSavings(jsonTokens, toonTokens);
  }, [jsonTokens, toonTokens]);

  // Token stats card component
  const TokenStatsCard = () => (
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
        {/* JSON Tokens */}
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

        {/* TOON Tokens */}
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

        {/* Savings */}
        <Box sx={{ minWidth: 140 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
            <SavingsIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>
              {t("pages.jsonToToon.saved")}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ color: "#22c55e" }}>
              {savings.savedPercentage}%
            </Typography>
            <Typography variant="body2" sx={{ color: "#94a3b8" }}>
              ({formatNumber(savings.savedTokens)} {t("pages.jsonToToon.tokens")})
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Saved:@.github badge */}
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

  return (
    <>
      <JsonEditorLayout
        leftPanel={
          <EditorPanel
            title={t("common.json")}
            value={jsonInput}
            onChange={setJsonInput}
            language="json"
          />
        }
        centerPanel={<CenterPanel />}
        rightPanel={
          <EditorPanel
            title={t("common.toon")}
            value={toonOutput}
            language="plaintext"
            readOnly={true}
          />
        }
        bottomPanel={
          <Box sx={{ p: 2 }}>
            {/* Progress indicator for large files */}
            {isProcessing && (
              <Box sx={{ mb: 2 }}>
                <LinearProgress />
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {t("pages.jsonToToon.processing")}
                </Typography>
              </Box>
            )}

            {/* Error display */}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {/* Token Stats Card */}
            {!error && <TokenStatsCard />}

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
