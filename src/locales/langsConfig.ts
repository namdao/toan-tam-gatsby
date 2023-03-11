// @mui
import { enUS, viVN } from "@mui/material/locale";
import Svg from "utils/svg";

export const allLangs = [
  {
    label: "Vietnamese",
    value: "vi",
    systemValue: viVN,
    icon: Svg.flag.icFlagVn,
  },
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: Svg.flag.icFlagEn,
  },
];

export const defaultLang = allLangs[0];
