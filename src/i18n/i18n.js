import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import uk from "./locales/uk/translation.json";
import sk from "./locales/sk/translation.json";

const savedLanguage = localStorage.getItem("language");

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    uk: { translation: uk },
    sk: { translation: sk },
  },
  lng: savedLanguage || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
