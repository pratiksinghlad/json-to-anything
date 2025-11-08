import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "build", "coverage", "node_modules", "**/__snapshots__"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // React rules
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
      // TypeScript rules
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-shadow": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.stories.*"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
);
