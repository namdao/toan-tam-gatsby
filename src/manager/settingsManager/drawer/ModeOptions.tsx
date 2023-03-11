import React, { useCallback } from "react";
// @mui
import { RadioGroup } from "@mui/material";
import SvgColor from "components/svg-color";
import { StyledCard, StyledWrap, MaskControl } from "../styles";
import {
  settingsActions,
  SettingsSelector,
  ThemeModeValue,
} from "services/settings/redux/slice";
import { useAppDispatch, useAppSelector } from "store";
import Svg from "utils/svg";

const OPTIONS = ["light", "dark"] as const;

export default function ModeOptions() {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(SettingsSelector.getThemeMode);
  const onChangeMode = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeModeValue;
      dispatch(settingsActions.setThemeMode(value));
    },
    []
  );

  return (
    <RadioGroup name="themeMode" value={themeMode} onChange={onChangeMode}>
      <StyledWrap>
        {OPTIONS.map((mode) => (
          <StyledCard key={mode} selected={themeMode === mode}>
            <SvgColor
              src={mode === "light" ? Svg.Setting.icSun : Svg.Setting.icMoon}
            />

            <MaskControl value={mode} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
