import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

interface DiffStatsProps {
  additions: number;
  deletions: number;
  onReset: () => void;
}

const DiffStats: React.FC<DiffStatsProps> = ({ additions, deletions, onReset }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        backgroundColor: "surface.light",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={onReset}
      >
        {t("pages.compare.resetBtn")}
      </Button>

      <Box sx={{ display: "flex", gap: 3 }}>
        {additions === 0 && deletions === 0 ? (
          <Typography color="text.secondary" fontWeight="bold">
            {t("pages.compare.noChanges")}
          </Typography>
        ) : (
          <>
            <Typography sx={{ color: "#2ea043", fontWeight: "bold" }}>
              + {additions} {t("pages.compare.additions")}
            </Typography>
            <Typography sx={{ color: "#cf222e", fontWeight: "bold" }}>
              - {deletions} {t("pages.compare.deletions")}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default DiffStats;
