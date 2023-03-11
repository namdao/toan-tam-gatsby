import React, { useCallback } from "react";
// @mui
import { RadioGroup } from "@mui/material";
//
import SvgColor from "components/svg-color";
import { StyledCard, StyledWrap, MaskControl } from "../styles";
import { useAppDispatch, useAppSelector } from "store";
import {
  settingsActions,
  SettingsSelector,
  ThemeContrastValue,
} from "services/settings/redux/slice";
import Svg from "utils/svg";

const OPTIONS = ["default", "bold"] as const;

export default function ContrastOptions() {
  const dispatch = useAppDispatch();
  const themeContrast = useAppSelector(SettingsSelector.getThemeContract);
  const onChangeContrast = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as ThemeContrastValue;
    dispatch(settingsActions.setThemeContrast(value));
  };
  return (
    <RadioGroup
      name="themeContrast"
      value={themeContrast}
      onChange={onChangeContrast}
    >
      <StyledWrap>
        {OPTIONS.map((contrast) => (
          <StyledCard key={contrast} selected={themeContrast === contrast}>
            <SvgColor
              src={
                contrast === "bold"
                  ? Svg.Setting.icContrastBold
                  : Svg.Setting.icContrast
              }
            />

            <MaskControl value={contrast} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
