import { lazy, Suspense } from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, Box, CircularProgress } from "@mui/material";
import { globalThemeConfig } from "./themeConfig";

// Lazy load page components for code splitting and better performance
const JsonToCsvPage = lazy(() => import("./pages/JsonToCsvPage"));
const JsonToXmlPage = lazy(() => import("./pages/JsonToXmlPage"));
const CsvToJsonPage = lazy(() => import("./pages/CsvToJsonPage"));
const XmlToJsonPage = lazy(() => import("./pages/XmlToJsonPage"));
const BeautifyJsonPage = lazy(() => import("./pages/BeautifyJsonPage"));
const ValidateJsonPage = lazy(() => import("./pages/ValidateJsonPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const JsonToToonPage = lazy(() => import("./pages/JsonToToonPage"));
const JsonToYamlPage = lazy(() => import("./pages/JsonToYamlPage"));
const JsonToTomlPage = lazy(() => import("./pages/JsonToTomlPage"));

// Theme configuration matching the JSON to anything Dark/Light mix
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: globalThemeConfig.PRIMARY_COLOR,
      light: globalThemeConfig.PRIMARY_LIGHT,
      dark: globalThemeConfig.PRIMARY_DARK,
    },
    secondary: {
      main: "#1e293b",
      light: "#334155",
      dark: "#0f172a",
    },
    background: {
      default: globalThemeConfig.SURFACE_BG,
      paper: globalThemeConfig.SURFACE_BG,
    },
  },
  typography: {
    fontFamily: globalThemeConfig.FONT_FAMILY_SANS,
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

// Detect if running in Tauri environment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isTauri = typeof window !== "undefined" && (window as any).__TAURI_INTERNALS__ !== undefined;

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
  // Use HashRouter for Tauri to handle routing correctly with local protocols
  // Use BrowserRouter for web to have cleaner URLs
  const Router = isTauri ? HashRouter : BrowserRouter;
  
  // For Tauri, we don't want a relative basename like "./" from Vite to mess up HashRouter
  const routerBasename = isTauri ? "/" : basename;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={routerBasename}>
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
              <Route path="/json-to-toon" element={<JsonToToonPage />} />
              <Route path="/json-to-yaml" element={<JsonToYamlPage />} />
              <Route path="/json-to-toml" element={<JsonToTomlPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
