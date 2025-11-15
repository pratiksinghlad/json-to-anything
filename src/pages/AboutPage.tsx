import { Container, Box, Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
          <Link href="https://github.com/pratiksinghlad" target="_blank" rel="noopener noreferrer">
            Pratik Singh Lad
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default AboutPage;
