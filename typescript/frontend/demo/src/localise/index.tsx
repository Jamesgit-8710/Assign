import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Find the Photographer": "Find the Photographer",
      },
    },
    h: {
        translation: {
          "Find the Photographer": "फ़ोटोग्राफ़र ढूंढें",
          "Market": "बाज़ार"
        },
      },
  },
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
