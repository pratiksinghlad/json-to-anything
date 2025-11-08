import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import esTranslations from "./locales/es.json";
import hiTranslations from "./locales/hi.json";

// Detect saved language or use browser language
const savedLanguage = localStorage.getItem("appLanguage");
const browserLanguage = navigator.language.split("-")[0];
const defaultLanguage = savedLanguage || (["en", "es", "hi"].includes(browserLanguage) ? browserLanguage : "en");

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      hi: { translation: hiTranslations },
    },
    lng: defaultLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Save language preference when it changes
i18n.on("languageChanged", (lng) => {
  localStorage.setItem("appLanguage", lng);
  document.documentElement.lang = lng;
});

export default i18n;
