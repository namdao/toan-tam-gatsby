import React from "react";
// @mui
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import useLocales from "./useLocales";

type Props = {
  children: React.ReactNode;
};

export default function ThemeLocalization({ children }: Props) {
  const outerTheme = useTheme();

  const { dataCurrentLang } = useLocales();

  const theme = createTheme(outerTheme, dataCurrentLang.systemValue);

  return <ThemeProvider theme={theme}> {children} </ThemeProvider>;
}
