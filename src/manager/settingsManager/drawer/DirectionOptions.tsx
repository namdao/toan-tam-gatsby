import React, { useCallback } from "react";
// @mui
import { RadioGroup } from "@mui/material";
import SvgColor from "components/svg-color";
import { StyledCard, StyledWrap, MaskControl } from "../styles";
import {
  settingsActions,
  SettingsSelector,
  ThemeDirectionValue,
} from "services/settings/redux/slice";
import { useAppDispatch, useAppSelector } from "store";
import Svg from "utils/svg";

const OPTIONS = ["ltr", "rtl"] as const;

export default function DirectionOptions() {
  const dispatch = useAppDispatch();
  const themeDirection = useAppSelector(SettingsSelector.getThemeDirection);
  const onChangeDirection = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value as ThemeDirectionValue;
      dispatch(settingsActions.setThemeDirection(value));
    },
    []
  );

  return (
    <RadioGroup
      name="themeDirection"
      value={themeDirection}
      onChange={onChangeDirection}
    >
      <StyledWrap>
        {OPTIONS.map((direction) => (
          <StyledCard key={direction} selected={themeDirection === direction}>
            <SvgColor
              src={
                direction === "rtl"
                  ? Svg.Setting.icAlignRight
                  : Svg.Setting.icAlignLeft
              }
            />

            <MaskControl value={direction} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
