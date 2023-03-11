import { useTranslation } from "react-i18next";
import {
  settingsActions,
  SettingsSelector,
} from "services/settings/redux/slice";
import { useAppDispatch, useAppSelector } from "store";
import { allLangs, defaultLang } from "./langsConfig";
export default function useLocales() {
  const { i18n, t: translate } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector(SettingsSelector.getLangsDefault);
  const dataCurrentLang =
    allLangs.find((_lang) => _lang.value === currentLang) || defaultLang;

  const handleChangeLanguage = (newlang: "vi" | "en") => {
    i18n.changeLanguage(newlang);
    localStorage.setItem("i18nextLng", newlang);
    dispatch(settingsActions.onChangeLangs(newlang));
  };

  return {
    onChangeLang: handleChangeLanguage,
    translate,
    dataCurrentLang,
    allLangs,
  };
}
