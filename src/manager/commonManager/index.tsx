import SetupAxios from "manager/axiosManager";
import { AuthSelector } from "scenes/auth/redux/slice";
import React, { useEffect, useLayoutEffect } from "react";
import {
  settingsActions,
  SettingsSelector,
} from "services/settings/redux/slice";
import { useAppDispatch, useAppSelector } from "store";
import { usePaperTypes } from "scenes/papers/hooks/usePaperTypes";
import { useCustomer } from "scenes/customer/hooks/useCustomer";
import { CitySelector } from "services/settings/redux/city.slice";
import { useCity } from "services/settings/hooks/useCity";

const CommonManager = () => {
  const dispatch = useAppDispatch();
  const { onGetPaperList } = usePaperTypes();
  const { getCustomerList } = useCustomer();
  const { getDataCity, getAllCity } = useCity();
  const token = useAppSelector(AuthSelector.getToken);
  const url = useAppSelector(SettingsSelector.getUrl);
  const listDistrict = useAppSelector(CitySelector.getListDistrict);
  const listWards = useAppSelector(CitySelector.getListWards);
  const listCity = useAppSelector(CitySelector.getListCity);
  useLayoutEffect(() => {
    SetupAxios.init();
    const newUrl = SetupAxios.setBaseUrl(url);
    SetupAxios.setupOnResponseInterceptors();
    if (newUrl !== url) {
      dispatch(settingsActions.setUrl(newUrl));
    }
  }, [url]);

  useEffect(() => {
    if (listDistrict.length < 1 || listWards.length < 1) {
      getDataCity();
    }
  }, [listDistrict, listWards]);

  useEffect(() => {
    if (listCity.length < 1) {
      getAllCity();
    }
  }, [listCity]);

  useLayoutEffect(() => {
    if (token !== "") {
      SetupAxios.setHeaderToken(token);
      onGetPaperList("idle");
      getCustomerList();
    } else {
      SetupAxios.clearHeaderToken();
    }
  }, [token]);
  return <></>;
};

export default CommonManager;
