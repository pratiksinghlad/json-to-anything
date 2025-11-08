import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import { themeConfig } from "./themeConfig";
import NavBar from "./components/navigation/NavBar";
import JsonToCsvPage from "./pages/JsonToCsvPage";
import ValidateJsonPage from "./pages/ValidateJsonPage";
import BeautifyJsonPage from "./pages/BeautifyJsonPage";
import ComparePage from "./pages/ComparePage";
import AboutPage from "./pages/AboutPage";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: themeConfig.PRIMARY_COLOR,
      dark: themeConfig.PRIMARY_DARK,
      light: themeConfig.PRIMARY_LIGHT,
    },
    background: {
      default: themeConfig.SURFACE_BG,
      paper: themeConfig.SURFACE_LIGHT,
    },
    text: {
      primary: themeConfig.TEXT_PRIMARY,
      secondary: themeConfig.TEXT_SECONDARY,
      disabled: themeConfig.TEXT_DISABLED,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  breakpoints: {
    values: themeConfig.BREAKPOINTS,
  },
});

// Detect base path from Vite config
const basename = import.meta.env.BASE_URL || "/";

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
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<JsonToCsvPage />} />
            <Route path="/validate" element={<ValidateJsonPage />} />
            <Route path="/beautify" element={<BeautifyJsonPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
