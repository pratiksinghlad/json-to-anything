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
    // Enable code splitting and chunk optimization
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for better caching
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
            // Separate Prism core from language components
            if (id.includes("prismjs")) {
              // Language components should be in their own chunks for dynamic loading
              if (id.includes("prismjs/components")) {
                return undefined; // Let Vite handle language components separately
              }
              // Core prismjs library
              return "prism-vendor";
            }
            // Other vendor dependencies
            return "vendor";
          }
        },
        // Optimize chunk file names
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
      },
    },
    // Increase chunk size warning limit to 600 KB because manual chunking (via manualChunks)
    // can produce larger vendor bundles; this avoids unnecessary warnings for intentionally large chunks.
    chunkSizeWarningLimit: 600,
    // Enable minification for optimized production builds
    minify: true,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate source maps for production debugging (optional, can be disabled)
    sourcemap: false,
    // Optimize dependencies
    // Target ES2021 for modern browser compatibility (Edge 93+, Chrome 93+, Firefox 92+, Safari 15+)
    target: "es2021",
    reportCompressedSize: false, // Faster builds
  },
});
