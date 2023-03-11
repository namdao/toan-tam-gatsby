import React, { useMemo } from "react";
import merge from "lodash/merge";
// @mui
import {
  alpha,
  ThemeProvider,
  createTheme,
  useTheme,
} from "@mui/material/styles";
import { useAppSelector } from "store";
import { SettingsSelector } from "services/settings/redux/slice";
import { getPresets } from "./presets";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeColorPresets({ children }: Props) {
  const outerTheme = useTheme();

  const themeColorPresets = useAppSelector(
    SettingsSelector.getThemeColorPresets
  );

  const presetsColor = getPresets(themeColorPresets);

  const themeOptions = useMemo(() => {
    return {
      palette: {
        primary: presetsColor,
      },
      customShadows: {
        primary: `0 8px 16px 0 ${alpha(presetsColor.main, 0.24)}`,
      },
    };
  }, [presetsColor]);

  const theme = createTheme(merge(outerTheme, themeOptions));

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
