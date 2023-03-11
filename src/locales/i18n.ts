import appConstant from "constant/appConstant";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// utils
import viLocales from "./langs/vi";
import enLocales from "./langs/en";

let lng = appConstant.LANGS_DEFAULT;

lng = localStorage.getItem("i18nextLng") || appConstant.LANGS_DEFAULT;
export const defaultNS = "trans";
export const resources = {
  vi: {
    trans: viLocales,
  },
  en: {
    trans: enLocales,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng: appConstant.LANGS_DEFAULT,
  debug: false,
  ns: ["trans"],
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
