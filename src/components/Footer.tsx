import { Box, Container, Typography, Link, Stack, IconButton } from '@mui/material';
import { interactiveHoverSx } from '../theme/uiSx';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  const userName = "pratiksinghlad";

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
            <strong>Privacy & open source.</strong> All conversion happens in your browser —
            nothing is uploaded or stored on a server. The full source code is available on{' '}
            <Link
              href={`https://github.com/${userName}/json-to-anything`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            .
          </Typography>

          <Stack direction="row" spacing={1}>
            <IconButton
              href={`https://github.com/${userName}/json-to-anything`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              size="small"
              sx={interactiveHoverSx}
            >
              <GitHubIcon sx={{ color: 'inherit' }} />
            </IconButton>
            <IconButton
              href="https://x.com/pratiksinghlad"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Twitter"
              size="small"
              sx={interactiveHoverSx}
            >
              <TwitterIcon sx={{ color: 'inherit' }} />
            </IconButton>
            <IconButton
              href={`https://www.linkedin.com/in/${userName}/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              size="small"
              sx={interactiveHoverSx}
            >
              <LinkedInIcon sx={{ color: 'inherit' }} />
            </IconButton>
          </Stack>
          
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} JSON to Anything. Made with ❤️ for all.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
