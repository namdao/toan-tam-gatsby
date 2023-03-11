import React, { useCallback } from "react";
// @mui
import { RadioGroup } from "@mui/material";
import { StyledCard, StyledWrap, MaskControl, LayoutIcon } from "../styles";
import { useAppDispatch, useAppSelector } from "store";
import {
  settingsActions,
  SettingsSelector,
  ThemeLayoutValue,
} from "services/settings/redux/slice";

const OPTIONS = ["vertical", "horizontal", "mini"] as const;

export default function LayoutOptions() {
  const dispatch = useAppDispatch();
  const themeLayout = useAppSelector(SettingsSelector.getThemeLayout);
  const onChangeLayout = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeLayoutValue;
      dispatch(settingsActions.setThemeLayout(value));
    },
    []
  );

  return (
    <RadioGroup
      name="themeLayout"
      value={themeLayout}
      onChange={onChangeLayout}
    >
      <StyledWrap sx={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {OPTIONS.map((layout) => (
          <StyledCard
            key={layout}
            selected={themeLayout === layout}
            sx={{ p: 0.75, height: 56 }}
          >
            <LayoutIcon layout={layout} />

            <MaskControl value={layout} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
