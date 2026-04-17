import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import viteCompression from "vite-plugin-compression";
import checker from "vite-plugin-checker";

// Set by `tauri dev` / `tauri build` — undefined during normal web builds
const isTauri = !!process.env.TAURI_ENV_PLATFORM;

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
  },
  plugins: [
    react(),
    svgr(),
    process.env.NODE_ENV === "production" ? null : checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}" --max-warnings=0',
        dev: {
          logLevel: ["error"],
        },
        useFlatConfig: true,
      },
      overlay: false,
    }),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
    }),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024,
    }),
  ].filter(Boolean),

  // Disable terminal clear — useful for Tauri dev, harmless for web
  clearScreen: false,

  server: {
    port: 3001,
    // Tauri requires a strict port so it knows where to connect
    strictPort: isTauri,
    // Allow Tauri's remote dev host (mobile/VM) when set
    host: process.env.TAURI_DEV_HOST || false,
    hmr: process.env.TAURI_DEV_HOST
      ? {
          protocol: "ws",
          host: process.env.TAURI_DEV_HOST,
          port: 5183,
        }
      : undefined,
  },

  resolve: {
    dedupe: ["react", "react-dom"],
  },

  optimizeDeps: {
    include: ["react", "react-dom", "@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
    // Exclude WASM module from pre-bundling — it is lazy-loaded at runtime
    exclude: ["json_engine"],
  },

  // Include WASM + standard image assets
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg", "**/*.gif", "**/*.webp", "**/*.wasm"],

  // Tauri needs relative paths; web build uses the GitHub Pages sub-path
  base: isTauri ? "./" : "/json-to-anything/",

  build: {
    outDir: "build",
    // WebView2 (Tauri on Windows) is Chromium-based; target chrome105 for Tauri,
    // keep es2021 for web to maximise compatibility
    target: isTauri ? "chrome105" : "es2021",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
              return "react-vendor";
            }
            if (id.includes("@mui") || id.includes("@emotion")) {
              return "mui-vendor";
            }
            if (id.includes("i18next")) {
              return "i18n-vendor";
            }
            if (id.includes("prismjs")) {
              return "prism-vendor";
            }
            if (id.includes("ajv")) {
              return "ajv-vendor";
            }
            if (id.includes("gpt-tokenizer")) {
              return "tokenizer-vendor";
            }
            if (id.includes("papaparse")) {
              return "csv-vendor";
            }
            if (id.includes("fast-xml-parser")) {
              return "xml-vendor";
            }
            if (id.includes("diff")) {
              return "diff-vendor";
            }
            if (id.includes("@fontsource")) {
              return "font-vendor";
            }
            // Do NOT include a catch-all. 
            // Letting Rollup handle the rest automatically ensures smart chunking
            // perfectly aligned with the lazy-loaded React routes.
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 2500,
    minify: true,
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
  },
});

