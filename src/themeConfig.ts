/**
 * Theme Configuration
 * Single source of truth for theme colors.
 * Update PRIMARY_COLOR to change the menu color throughout the application.
 */

export const themeConfig = {
  // Primary color - Change this to update menu colors
  PRIMARY_COLOR: "#1976d2",
  PRIMARY_DARK: "#115293",
  PRIMARY_LIGHT: "#4791db",

  // Surface colors
  SURFACE_BG: "#ffffff",
  SURFACE_LIGHT: "#f5f5f5",
  SURFACE_LIGHTER: "#eeeeee",

  // Text colors
  TEXT_PRIMARY: "#000000",
  TEXT_SECONDARY: "#000000",
  TEXT_DISABLED: "#666666",

  // States
  HOVER_BG: "rgba(255, 255, 255, 0.08)",
  ACTIVE_BG: "rgba(25, 118, 210, 0.12)",
  FOCUS_OUTLINE: "#4791db",

  // Breakpoints (matches SCSS)
  BREAKPOINTS: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
} as const;

export type ThemeConfig = typeof themeConfig;
