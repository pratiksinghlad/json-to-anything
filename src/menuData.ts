/**
 * @file menuData.ts
 * Single source of truth for navigation structure.
 *
 * To re-prioritize which tools appear in the header vs. the "More Tools"
 * dropdown, simply change the `placement` field:
 *   - 'header'  → rendered as a direct button in the desktop header
 *   - 'more'    → rendered inside the "More Tools" dropdown
 *
 * The mobile drawer always shows all items regardless of placement.
 */

export type MenuPlacement = "header" | "more";

export interface MenuItem {
  key: string;
  labelKey: string;
  path: string;
  /** MUI icon name used in the mobile drawer and More Tools menu */
  iconName: string;
  placement: MenuPlacement;
}

export const menuItems: MenuItem[] = [
  // ── Primary Suite (always visible in desktop header) ──────────────────────
  {
    key: "beautify-json",
    labelKey: "menu.beautifyJson",
    path: "/",
    iconName: "AutoFixHigh",
    placement: "header",
  },
  {
    key: "json-to-csv",
    labelKey: "menu.jsonToCsv",
    path: "/json-to-csv",
    iconName: "TableChart",
    placement: "header",
  },
  {
    key: "json-to-xml",
    labelKey: "menu.jsonToXml",
    path: "/json-to-xml",
    iconName: "Code",
    placement: "header",
  },
  {
    key: "csv-to-json",
    labelKey: "menu.csvToJson",
    path: "/csv-to-json",
    iconName: "SwapHoriz",
    placement: "header",
  },
  {
    key: "validate-json",
    labelKey: "menu.validateJson",
    path: "/validate",
    iconName: "FactCheck",
    placement: "header",
  },
  {
    key: "compare",
    labelKey: "menu.compare",
    path: "/compare",
    iconName: "DifferenceOutlined",
    placement: "header",
  },
  {
    key: "about",
    labelKey: "menu.about",
    path: "/about",
    iconName: "Info",
    placement: "header",
  },
  {
    key: "xml-to-json",
    labelKey: "menu.xmlToJson",
    path: "/xml-to-json",
    iconName: "DataObject",
    placement: "more",
  },
  {
    key: "json-to-yaml",
    labelKey: "menu.jsonToYaml",
    path: "/json-to-yaml",
    iconName: "Description",
    placement: "more",
  },
  {
    key: "json-to-toml",
    labelKey: "menu.jsonToToml",
    path: "/json-to-toml",
    iconName: "Settings",
    placement: "more",
  },
  {
    key: "json-to-toon",
    labelKey: "menu.jsonToToon",
    path: "/json-to-toon",
    iconName: "AccountTree",
    placement: "more",
  },
];

/** Convenience selectors — derived from the canonical list above */
export const headerMenuItems = menuItems.filter((i) => i.placement === "header");
export const moreMenuItems = menuItems.filter((i) => i.placement === "more");

export interface LanguageOption {
  code: string;
  label: string;
  nativeLabel: string;
}

export const languageOptions: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
  },
  {
    code: "es",
    label: "Spanish",
    nativeLabel: "Español",
  },
  {
    code: "hi",
    label: "Hindi",
    nativeLabel: "हिन्दी",
  },
];
