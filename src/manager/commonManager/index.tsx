import SetupAxios from "manager/axiosManager";
import { AuthSelector } from "scenes/auth/redux/slice";
import React, { useEffect, useLayoutEffect } from "react";
import {
  settingsActions,
  SettingsSelector,
} from "services/settings/redux/slice";
import { useAppDispatch, useAppSelector } from "store";
import { usePaperTypes } from "scenes/papers/hooks/usePaperTypes";

const CommonManager = () => {
  const dispatch = useAppDispatch();
  const { onGetPaperList } = usePaperTypes();
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
      onGetPaperList();
    } else {
      SetupAxios.clearHeaderToken();
    }
  }, [token]);
  return <></>;
};

export default CommonManager;
