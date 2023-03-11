import SetupAxios from "manager/axiosManager";
import { AuthSelector } from "scenes/auth/redux/slice";
import React, { useEffect, useLayoutEffect } from "react";
import { SettingsSelector } from "services/settings/redux/slice";
import { useAppSelector } from "store";

const CommonManager = () => {
  const token = useAppSelector(AuthSelector.getToken);
  const url = useAppSelector(SettingsSelector.getUrl);
  useLayoutEffect(() => {
    SetupAxios.init();
    SetupAxios.setBaseUrl(url);
    SetupAxios.setupOnResponseInterceptors();
  }, [url]);

  useEffect(() => {
    if (token !== "") {
      SetupAxios.setHeaderToken(token);
    } else {
      SetupAxios.clearHeaderToken();
    }
  }, [token]);
  return <></>;
};

export default CommonManager;
