import { Box, Container, Typography, Link, Stack, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 3,
        px: 2,
        backgroundColor: '#f5f5f5',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={2} alignItems="center">
          <Stack direction="row" spacing={1}>
            <IconButton
              href="https://github.com/pratiksinghlad/json-to-anything"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source on GitHub"
              size="small"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Twitter"
              size="small"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              size="small"
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>

          <Typography variant="body2" color="text.secondary" align="center">
            <strong>Privacy & open source.</strong> All conversion happens in your browser —
            nothing is uploaded or stored on a server. The full source code is available on{' '}
            <Link
              href="https://github.com/pratiksinghlad/json-to-anything"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            .
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} JSON to Anything. Made with ❤️ for developers.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
