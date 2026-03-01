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
  server: {
    port: 3001,
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@mui/material", "@emotion/react", "@emotion/styled"],
    // Exclude WASM module from pre-bundling — it is lazy-loaded at runtime
    exclude: ["json_engine"],
  },
  // Include WASM + standard image assets
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg", "**/*.gif", "**/*.webp", "**/*.wasm"],
  base: "/json-to-anything/",
  build: {
    outDir: "build",
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
            return "vendor";
          }
        },
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    chunkSizeWarningLimit: 600,
    minify: true,
    cssCodeSplit: true,
    sourcemap: false,
    target: "es2021",
    reportCompressedSize: false,
  },
});
