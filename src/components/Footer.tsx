import { Box, Container, Typography, Link, Stack, IconButton } from '@mui/material';
import { interactiveHoverSx } from '../theme/uiSx';
import { useTranslation } from 'react-i18next';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  const userName = "pratiksinghlad";
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: '#f5f5f5',
        borderTop: '3px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary" align="center">
            <strong>{t('footer.privacyTitle')}</strong> {t('footer.privacyText')}{' '}
            <Link
              href={`https://github.com/${userName}/json-to-anything`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.github')}
            </Link>
            .
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              href={`https://github.com/${userName}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer.viewSource')}
              size="small"
              sx={interactiveHoverSx}
            >
              <GitHubIcon sx={{ color: 'inherit' }} />
            </IconButton>
            <IconButton
              href={`https://x.com/${userName}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer.followTwitter')}
              size="small"
              sx={interactiveHoverSx}
            >
              <TwitterIcon sx={{ color: 'inherit' }} />
            </IconButton>
            <IconButton
              href={`https://www.linkedin.com/in/${userName}/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('footer.connectLinkedIn')}
              size="small"
              sx={interactiveHoverSx}
            >
              <LinkedInIcon sx={{ color: 'inherit' }} />
            </IconButton>
          </Stack>
          
          <Typography variant="body2" color="text.secondary" align="center">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
