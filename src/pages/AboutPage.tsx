import { Container, Box, Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import Header from "../components/JsonEditor/Header";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            {t("pages.about.title")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("pages.about.p1")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("pages.about.p2")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("pages.about.by")}
            <Link
              href="https://github.com/pratiksinghlad"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pratik Singh Lad
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage;
