import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import esTranslations from "./locales/es.json";
import hiTranslations from "./locales/hi.json";

import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      hi: { translation: hiTranslations },
    },
    fallbackLng: "en",
    supportedLngs: ["en", "es", "hi"],
    nonExplicitSupportedLngs: true, // Allows 'en-US' to fallback to 'en'
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "appLanguage", // Match existing localStorage key
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Update document language on change
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng.split("-")[0];
});

export default i18n;
