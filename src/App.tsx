import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, Box, CircularProgress } from "@mui/material";
import { themeConfig } from "./themeConfig";

// Lazy load page components for code splitting and better performance
const JsonToCsvPage = lazy(() => import("./pages/JsonToCsvPage"));
const JsonToXmlPage = lazy(() => import("./pages/JsonToXmlPage"));
const CsvToJsonPage = lazy(() => import("./pages/CsvToJsonPage"));
const XmlToJsonPage = lazy(() => import("./pages/XmlToJsonPage"));
const BeautifyJsonPage = lazy(() => import("./pages/BeautifyJsonPage"));
const ValidateJsonPage = lazy(() => import("./pages/ValidateJsonPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

// Theme configuration matching the JSON to anything Dark/Light mix
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: themeConfig.PRIMARY_COLOR,
      light: themeConfig.PRIMARY_LIGHT,
      dark: themeConfig.PRIMARY_DARK,
    },
    secondary: {
      main: "#1e293b",
      light: "#334155",
      dark: "#0f172a",
    },
    background: {
      default: themeConfig.SURFACE_BG,
      paper: themeConfig.SURFACE_BG,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

// Detect base path from Vite config
const basename = import.meta.env.BASE_URL || "/";

// Loading fallback component
const PageLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
    }}
    role="status"
    aria-label="Loading page content"
  >
    <CircularProgress size={48} />
  </Box>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={basename}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Main Content Area */}
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<JsonToCsvPage />} />
              <Route path="/json-to-xml" element={<JsonToXmlPage />} />
              <Route path="/csv-to-json" element={<CsvToJsonPage />} />
              <Route path="/xml-to-json" element={<XmlToJsonPage />} />
              <Route path="/beautify" element={<BeautifyJsonPage />} />
              <Route path="/validate" element={<ValidateJsonPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
