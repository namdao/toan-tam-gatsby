import React, { useCallback } from "react";
// @mui
import { Stack, Box } from "@mui/material";
//
import Iconify from "components/iconify";
//
import { StyledCard } from "../styles";
import { useAppDispatch, useAppSelector } from "store";
import {
  settingsActions,
  SettingsSelector,
} from "services/settings/redux/slice";

// ----------------------------------------------------------------------

export default function StretchOptions() {
  const dispatch = useAppDispatch();
  const themeStretch = useAppSelector(SettingsSelector.getThemeStretch);
  const onToggleStretch = () => {
    const value = !themeStretch;
    dispatch(settingsActions.setThemeStretch(value));
  };

  return (
    <StyledCard
      selected={themeStretch}
      onClick={onToggleStretch}
      sx={{ height: 48, px: 1 }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: 0.24,
          transition: (theme) => theme.transitions.create("width"),
          ...(themeStretch && {
            width: 0.5,
          }),
        }}
      >
        <Iconify
          icon={
            themeStretch
              ? "eva:arrow-ios-back-fill"
              : "eva:arrow-ios-forward-fill"
          }
        />

        <Box sx={{ flexGrow: 1, borderBottom: `dashed 1.5px currentcolor` }} />

        <Iconify
          icon={
            themeStretch
              ? "eva:arrow-ios-forward-fill"
              : "eva:arrow-ios-back-fill"
          }
        />
      </Stack>
    </StyledCard>
  );
}
