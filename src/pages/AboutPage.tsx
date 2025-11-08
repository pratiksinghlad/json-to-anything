import { Container, Box, Typography, Link } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          About JSON to Anything
        </Typography>
        <Typography variant="body1" paragraph>
          A simple, robust, and user-friendly web application for converting JSON data to various formats entirely in your browser.
        </Typography>
        <Typography variant="body1" paragraph>
          All processing happens in your browser — nothing is uploaded or stored on a server.
        </Typography>
        <Typography variant="body1" paragraph>
          Made with ❤️ by{" "}
          <Link href="https://github.com/pratiksinghlad" target="_blank" rel="noopener noreferrer">
            Pratik Singh Lad
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
