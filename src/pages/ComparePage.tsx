import { Container, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const ComparePage = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box>
        <Typography variant="h3" component="h1" gutterBottom>
          {t("pages.compare.title")}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {t("pages.compare.comingSoon")}
        </Typography>
      </Box>
    </Container>
  );
};

export default ComparePage;
