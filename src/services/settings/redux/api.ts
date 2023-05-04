import axios from "axios";
import appConstant from "constant/appConstant";

export const apiGetInfoHochiminhCity = () =>
  axios.get(appConstant.API_URL.HCM_CITY);

export const apiGetCity = () => axios.get(appConstant.API_URL.ALL_CITY);
