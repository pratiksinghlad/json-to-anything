import { Container, Box, Typography } from "@mui/material";

const ComparePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          Compare JSON
        </Typography>
        <Typography variant="body1" color="text.secondary">
          JSON comparison feature coming soon...
        </Typography>
      </Box>
    </Container>
  );
};

export default ComparePage;
