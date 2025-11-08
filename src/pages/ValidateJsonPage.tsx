import { Container, Box, Typography } from "@mui/material";

const ValidateJsonPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Validate JSON
        </Typography>
        <Typography variant="body1" color="text.secondary">
          JSON validation feature coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default ValidateJsonPage;
