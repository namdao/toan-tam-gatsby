import React, { useCallback } from "react";
// @mui
import { alpha } from "@mui/material/styles";
import { RadioGroup } from "@mui/material";
//
import {
  StyledCard,
  StyledWrap,
  MaskControl,
  StyledCircleColor,
} from "../styles";
import { useAppDispatch, useAppSelector } from "store";
import {
  settingsActions,
  SettingsSelector,
  ThemeColorPresetsValue,
} from "services/settings/redux/slice";
import { presetsOption } from "../presets";

export default function ColorPresetsOptions() {
  const dispatch = useAppDispatch();
  const themeColorPresets = useAppSelector(
    SettingsSelector.getThemeColorPresets
  );
  const onChangeColorPresets = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeColorPresetsValue;
      dispatch(settingsActions.setThemeColorPresets(value));
    },
    []
  );

  return (
    <RadioGroup
      name="themeColorPresets"
      value={themeColorPresets}
      onChange={onChangeColorPresets}
    >
      <StyledWrap sx={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {presetsOption.map((color) => {
          const { name, value } = color;

          const selected = themeColorPresets === name;

          return (
            <StyledCard
              key={name}
              selected={selected}
              sx={{
                height: 48,
                ...(selected && {
                  bgcolor: alpha(value, 0.08),
                  borderColor: alpha(value, 0.24),
                }),
              }}
            >
              <StyledCircleColor selected={selected} color={value} />

              <MaskControl value={name} />
            </StyledCard>
          );
        })}
      </StyledWrap>
    </RadioGroup>
  );
}
