import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Stack, Snackbar, Alert } from '@mui/material';
import {
  primaryContainedButtonSx,
  primaryOutlinedButtonSx,
  textAccentButtonSx,
} from '../theme/uiSx';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

interface DownloadButtonsProps {
  csvData?: string;
  jsonData?: string;
  toonData?: string;
  yamlData?: string;
  tomlData?: string;
  xmlData?: string;
  disabled?: boolean;
}


export default function DownloadButtons({
  csvData,
  jsonData,
  toonData,
  yamlData,
  tomlData,
  xmlData,
  disabled = false,
}: DownloadButtonsProps) {
  const { t } = useTranslation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getTimestamp = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
  };

  const handleDownloadCsv = () => {
    if (!csvData) return;
    const filename = `data-${getTimestamp()}.csv`;
    downloadFile(csvData, filename, 'text/csv;charset=utf-8;');
    showSnackbar(t('snackbar.csvDownloaded'));
  };

  const handleDownloadJson = () => {
    if (!jsonData) return;
    const filename = `data-${getTimestamp()}.json`;
    downloadFile(jsonData, filename, 'application/json');
    showSnackbar(t('snackbar.jsonDownloaded'));
  };

  const handleDownloadToon = () => {
    if (!toonData) return;
    const filename = `data-${getTimestamp()}.txt`;
    downloadFile(toonData, filename, 'text/plain;charset=utf-8;');
    showSnackbar(t('snackbar.toonDownloaded'));
  };

  const handleDownloadYaml = () => {
    if (!yamlData) return;
    const filename = `data-${getTimestamp()}.yml`;
    downloadFile(yamlData, filename, 'application/x-yaml;charset=utf-8;');
    showSnackbar(t('snackbar.jsonDownloaded')); // Reuse or create new translation
  };

  const handleDownloadToml = () => {
    if (!tomlData) return;
    const filename = `data-${getTimestamp()}.toml`;
    downloadFile(tomlData, filename, 'application/toml;charset=utf-8;');
    showSnackbar(t('snackbar.jsonDownloaded')); // Reuse
  };

  const handleDownloadXml = () => {
    if (!xmlData) return;
    const filename = `data-${getTimestamp()}.xml`;
    downloadFile(xmlData, filename, 'application/xml;charset=utf-8;');
    showSnackbar(t('snackbar.jsonDownloaded')); // Reuse
  };

  const handleCopy = async (data: string, type: string) => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(data);
      if (type === 'csv') showSnackbar(t('snackbar.csvCopied'));
      else showSnackbar(t('snackbar.jsonCopied'));
    } catch {
      showSnackbar(t('snackbar.copyFailed'));
    }
  };

  const handleShowRawData = (data: string, mimeType: string) => {
    if (!data) return;
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // Clean up the object URL after a delay to allow the window to open
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
        {csvData !== undefined && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadCsv}
            disabled={disabled}
            aria-label={t('aria.downloadCsv')}
            sx={primaryContainedButtonSx}
          >
            {t('buttons.downloadCsv')}
          </Button>
        )}

        {yamlData !== undefined && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadYaml}
            disabled={disabled}
            sx={primaryContainedButtonSx}
          >
            {t('buttons.downloadYaml')}
          </Button>
        )}

        {tomlData !== undefined && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadToml}
            disabled={disabled}
            sx={primaryContainedButtonSx}
          >
            {t('buttons.downloadToml')}
          </Button>
        )}

        {xmlData !== undefined && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadXml}
            disabled={disabled}
            sx={primaryContainedButtonSx}
          >
            {"Download XML"}
          </Button>
        )}

        {toonData !== undefined && (
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadToon}
            disabled={disabled}
            sx={primaryContainedButtonSx}
          >
            {t('buttons.downloadToon')}
          </Button>
        )}

        {jsonData !== undefined && (
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadJson}
            disabled={disabled}
            aria-label={t('aria.downloadJson')}
            sx={primaryOutlinedButtonSx}
          >
            {t('buttons.downloadJson')}
          </Button>
        )}

        {csvData !== undefined && (
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={() => handleCopy(csvData, 'csv')}
            disabled={disabled}
            aria-label={t('aria.copyCsv')}
            sx={primaryOutlinedButtonSx}
          >
            {t('buttons.copyCsv')}
          </Button>
        )}

        {yamlData !== undefined && (
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={() => handleCopy(yamlData, 'yaml')}
            disabled={disabled}
            sx={primaryOutlinedButtonSx}
          >
            {t('buttons.copyYaml')}
          </Button>
        )}

        {tomlData !== undefined && (
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={() => handleCopy(tomlData, 'toml')}
            disabled={disabled}
            sx={primaryOutlinedButtonSx}
          >
            {t('buttons.copyToml')}
          </Button>
        )}

        {xmlData !== undefined && (
          <Button
            variant="outlined"
            startIcon={<ContentCopyIcon />}
            onClick={() => handleCopy(xmlData, 'xml')}
            disabled={disabled}
            sx={primaryOutlinedButtonSx}
          >
            {"Copy XML"}
          </Button>
        )}

        {csvData !== undefined && (
          <Button
            variant="text"
            startIcon={<OpenInNewIcon />}
            onClick={() => handleShowRawData(csvData, 'text/csv')}
            disabled={disabled}
            aria-label={t('aria.showRawData')}
            sx={textAccentButtonSx}
          >
            {t('buttons.showRawData')}
          </Button>
        )}
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
