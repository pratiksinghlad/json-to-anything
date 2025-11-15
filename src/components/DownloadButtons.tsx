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
  csvData: string;
  jsonData: string;
  disabled?: boolean;
}

export default function DownloadButtons({
  csvData,
  jsonData,
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
    const filename = `data-${getTimestamp()}.csv`;
    downloadFile(csvData, filename, 'text/csv;charset=utf-8;');
    showSnackbar(t('snackbar.csvDownloaded'));
  };

  const handleDownloadJson = () => {
    const filename = `data-${getTimestamp()}.json`;
    downloadFile(jsonData, filename, 'application/json');
    showSnackbar(t('snackbar.jsonDownloaded'));
  };

  const handleCopyCsv = async () => {
    try {
      await navigator.clipboard.writeText(csvData);
      showSnackbar(t('snackbar.csvCopied'));
    } catch {
      showSnackbar(t('snackbar.copyFailed'));
    }
  };

  const handleShowRawData = () => {
    const blob = new Blob([csvData], { type: 'text/csv' });
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

        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyCsv}
          disabled={disabled}
          aria-label={t('aria.copyCsv')}
          sx={primaryOutlinedButtonSx}
        >
          {t('buttons.copyCsv')}
        </Button>

        <Button
          variant="text"
          startIcon={<OpenInNewIcon />}
          onClick={handleShowRawData}
          disabled={disabled}
          aria-label={t('aria.showRawData')}
          sx={textAccentButtonSx}
        >
          {t('buttons.showRawData')}
        </Button>
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
