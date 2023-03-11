import React, { useMemo } from "react";
// @mui
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeOptions,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
// components
import palette from "./palette";
import typography from "./typography";
import shadows from "./shadows";
import componentsOverride from "./overides";
import customShadows from "./customShadows";
import GlobalStyles from "./globalStyles";
// redux
import { useAppSelector } from "store";
import { SettingsSelector } from "services/settings/redux/slice";

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const themeMode = useAppSelector(SettingsSelector.getThemeMode);
  const themeDirection = useAppSelector(SettingsSelector.getThemeDirection);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: palette(themeMode),
      typography,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: shadows(themeMode),
      customShadows: customShadows(themeMode),
    }),
    [themeDirection, themeMode]
  );

  const theme = createTheme(themeOptions);

  theme.components = componentsOverride(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
