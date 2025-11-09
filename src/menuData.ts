export interface MenuItem {
  key: string;
  labelKey: string;
  path: string;
  icon?: string;
}

export const menuItems: MenuItem[] = [
  {
    key: "json-to-csv",
    labelKey: "menu.jsonToCsv",
    path: "/",
  },
  {
    key: "json-to-xml",
    labelKey: "menu.jsonToXml",
    path: "/json-to-xml",
  },
  {
    key: "beautify-json",
    labelKey: "menu.beautifyJson",
    path: "/beautify",
  },
  {
    key: "compare",
    labelKey: "menu.compare",
    path: "/compare",
  },
  {
    key: "about",
    labelKey: "menu.about",
    path: "/about",
  },
];

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
