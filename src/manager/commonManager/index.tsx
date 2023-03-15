import SetupAxios from "manager/axiosManager";
import { AuthSelector } from "scenes/auth/redux/slice";
import React, { useEffect, useLayoutEffect } from "react";
import {
  settingsActions,
  SettingsSelector,
} from "services/settings/redux/slice";
import { useAppDispatch, useAppSelector } from "store";

const CommonManager = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(AuthSelector.getToken);
  const url = useAppSelector(SettingsSelector.getUrl);
  useLayoutEffect(() => {
    SetupAxios.init();
    const newUrl = SetupAxios.setBaseUrl(url);
    SetupAxios.setupOnResponseInterceptors();
    if (newUrl !== url) {
      dispatch(settingsActions.setUrl(newUrl));
    }
  }, [url]);

  useLayoutEffect(() => {
    if (token !== "") {
      SetupAxios.setHeaderToken(token);
    } else {
      SetupAxios.clearHeaderToken();
    }
  }, [token]);
  return <></>;
};

export default CommonManager;
