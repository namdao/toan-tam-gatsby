import React, { useMemo } from "react";
import merge from "lodash/merge";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useAppSelector } from "store";
import { SettingsSelector } from "services/settings/redux/slice";

type Props = {
  children: React.ReactNode;
};

export default function ThemeContrast({ children }: Props) {
  const outerTheme = useTheme();

  const themeMode = useAppSelector(SettingsSelector.getThemeMode);
  const themeContrast = useAppSelector(SettingsSelector.getThemeContract);
  const isLight = themeMode === "light";

  const isContrastBold = themeContrast === "bold";

  const themeOptions = useMemo(
    () => ({
      palette: {
        background: {
          ...(isContrastBold && {
            default: isLight
              ? outerTheme.palette.grey[100]
              : outerTheme.palette.grey[900],
          }),
        },
      },
      components: {
        MuiCard: {
          styleOverrides: {
            ...(isContrastBold && {
              root: {
                boxShadow: outerTheme.customShadows.z4,
              },
            }),
          },
        },
      },
    }),

    [isLight, themeContrast]
  );
  const theme = createTheme(merge(outerTheme, themeOptions));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
