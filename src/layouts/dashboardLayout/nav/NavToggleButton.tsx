import React from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import { IconButton, IconButtonProps } from "@mui/material";
// hooks
import useResponsive from "utils/useResponsive";
// utils
import { bgBlur } from "utils/cssStyles";
// config
import { NAV } from "constant/layoutConstant";
// components
import Iconify from "components/iconify";
import { useAppDispatch, useAppSelector } from "store";
import {
  settingsActions,
  SettingsSelector,
} from "services/settings/redux/slice";

export default function NavToggleButton({ sx, ...other }: IconButtonProps) {
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const themeLayout = useAppSelector(SettingsSelector.getThemeLayout);
  const toggleLayout = () => {
    const toggle = themeLayout === "vertical" ? "mini" : "vertical";
    dispatch(settingsActions.setThemeLayout(toggle));
  };
  const isDesktop = useResponsive("up", "lg");

  if (!isDesktop) {
    return null;
  }

  return (
    <IconButton
      size="small"
      onClick={toggleLayout}
      sx={{
        p: 0.5,
        top: 32,
        position: "fixed",
        left: NAV.W_DASHBOARD - 12,
        zIndex: theme.zIndex.appBar + 1,
        border: `dashed 1px ${theme.palette.divider}`,
        ...bgBlur({ opacity: 0.48, color: theme.palette.background.default }),
        "&:hover": {
          bgcolor: "background.default",
        },
        ...sx,
      }}
      {...other}
    >
      <Iconify
        width={16}
        icon={
          themeLayout === "vertical"
            ? "eva:arrow-ios-back-fill"
            : "eva:arrow-ios-forward-fill"
        }
      />
    </IconButton>
  );
}
