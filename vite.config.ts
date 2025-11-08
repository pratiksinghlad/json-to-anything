import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import viteCompression from "vite-plugin-compression";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
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
      ext: ".gz", // File extension for Gzip compressed files
      threshold: 1024,
    }),
  ],
  server: {
    port: 3001, // <- Change this to any port you want
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@mui/material", "@emotion/react", "@emotion/styled"],
  },
  // Ensure proper handling of asset files
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg", "**/*.gif", "**/*.webp"],
  base: "/json-to-anything/",
  build: {
    outDir: "build",
  },
});
