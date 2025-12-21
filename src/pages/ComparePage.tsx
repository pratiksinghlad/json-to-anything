import { Container, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import Header from "../components/JsonEditor/Header";

const ComparePage = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            {t("pages.compare.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t("pages.compare.comingSoon")}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ComparePage;
