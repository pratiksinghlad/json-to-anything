import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme, Box } from "@mui/material";
import { themeConfig } from "./themeConfig";
import NavBar from "./components/navigation/NavBar";
import JsonToCsvPage from "./pages/JsonToCsvPage";
import JsonToXmlPage from "./pages/JsonToXmlPage";
import BeautifyJsonPage from "./pages/BeautifyJsonPage";
import ComparePage from "./pages/ComparePage";
import AboutPage from "./pages/AboutPage";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: themeConfig.PRIMARY_COLOR,
      dark: themeConfig.PRIMARY_DARK,
      light: themeConfig.PRIMARY_LIGHT,
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  breakpoints: {
    values: themeConfig.BREAKPOINTS,
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          "& .MuiSwitch-switchBase": {
            color: "#bdbdbd",
            "&.Mui-checked": {
              color: themeConfig.PRIMARY_COLOR,
              "& + .MuiSwitch-track": {
                backgroundColor: themeConfig.PRIMARY_COLOR,
                opacity: 0.5,
              },
            },
          },
          "& .MuiSwitch-track": {
            backgroundColor: "#9e9e9e",
            opacity: 0.38,
          },
        },
      },
    },
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
            backgroundColor: "#ffffff",
          }}
        >
          <NavBar />
          <Routes>
            <Route path="/" element={<JsonToCsvPage />} />
            <Route path="/json-to-xml" element={<JsonToXmlPage />} />
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
