import { lazy, Suspense } from "react";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, Box, CircularProgress } from "@mui/material";
import { globalThemeConfig } from "./themeConfig";
import BidirectionalConverterPage from "./pages/BidirectionalConverterPage";

// Lazy load page components for code splitting and better performance
const BeautifyJsonPage = lazy(() => import("./pages/BeautifyJsonPage"));
const ValidateJsonPage = lazy(() => import("./pages/ValidateJsonPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

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
              <Route path="/" element={<BeautifyJsonPage />} />
              <Route path="/beautify" element={<BeautifyJsonPage />} />
              
              {/* Bidirectional Conversions */}
              <Route path="/json-to-csv" element={<BidirectionalConverterPage key="csv-forward" primaryFormat="json" secondaryFormat="csv" initialDirection="forward" />} />
              <Route path="/csv-to-json" element={<BidirectionalConverterPage key="csv-reverse" primaryFormat="json" secondaryFormat="csv" initialDirection="reverse" />} />
              
              <Route path="/json-to-xml" element={<BidirectionalConverterPage key="xml-forward" primaryFormat="json" secondaryFormat="xml" initialDirection="forward" />} />
              <Route path="/xml-to-json" element={<BidirectionalConverterPage key="xml-reverse" primaryFormat="json" secondaryFormat="xml" initialDirection="reverse" />} />
              
              <Route path="/json-to-yaml" element={<BidirectionalConverterPage key="yaml-forward" primaryFormat="json" secondaryFormat="yaml" initialDirection="forward" />} />
              <Route path="/yaml-to-json" element={<BidirectionalConverterPage key="yaml-reverse" primaryFormat="json" secondaryFormat="yaml" initialDirection="reverse" />} />
              
              <Route path="/json-to-toml" element={<BidirectionalConverterPage key="toml-forward" primaryFormat="json" secondaryFormat="toml" initialDirection="forward" />} />
              <Route path="/toml-to-json" element={<BidirectionalConverterPage key="toml-reverse" primaryFormat="json" secondaryFormat="toml" initialDirection="reverse" />} />
              
              <Route path="/json-to-toon" element={<BidirectionalConverterPage key="toon" primaryFormat="json" secondaryFormat="toon" initialDirection="forward" />} />
              <Route path="/json-to-graphql" element={<BidirectionalConverterPage key="graphql" primaryFormat="json" secondaryFormat="graphql" initialDirection="forward" />} />
              <Route path="/json-to-markdown" element={<BidirectionalConverterPage key="markdown" primaryFormat="json" secondaryFormat="markdown" initialDirection="forward" />} />

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
