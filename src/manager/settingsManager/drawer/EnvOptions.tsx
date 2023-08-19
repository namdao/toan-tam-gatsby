import React, { useCallback, useState } from "react";
// @mui
import { RadioGroup, Typography } from "@mui/material";
import { StyledCard, StyledWrap, MaskControl } from "../styles";
import {
  settingsActions,
  SettingsSelector,
} from "services/settings/redux/slice";
import { useAppDispatch, useAppSelector } from "store";
import appConstant from "constant/appConstant";

const OPTIONS = ["DEV", "PROD"] as const;

export default function EnvOptions() {
  const dispatch = useAppDispatch();
  const url = useAppSelector(SettingsSelector.getUrl);
  const [env, setEnv] = useState<"DEV" | "PROD">(
    url === appConstant.ENV.DEV ? "DEV" : "PROD"
  );
  const onChangeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as "DEV" | "PROD";
    setEnv(value);
    let url = appConstant.ENV.PROD;
    if (value === "DEV") {
      url = appConstant.ENV.DEV;
    }
    dispatch(settingsActions.setUrl(url));
  };

  return (
    <RadioGroup name="themeMode" value={env} onChange={onChangeMode}>
      <StyledWrap>
        {OPTIONS.map((mode) => (
          <StyledCard key={mode} selected={env === mode}>
            <Typography>{mode}</Typography>
            <MaskControl value={mode} />
          </StyledCard>
        ))}
      </StyledWrap>
    </RadioGroup>
  );
}
