import axios from "axios";
import appConstant from "constant/appConstant";

export const apiGetOutSourceList = () =>
  axios.get(appConstant.API_URL.OUTSOURCE);
