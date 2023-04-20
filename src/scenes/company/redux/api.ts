import axios from "axios";
import appConstant from "constant/appConstant";

const { API_URL } = appConstant;
export const apiGetListCompanies = (signal: AbortSignal) =>
  axios.get(API_URL.COMPANIES, { signal });
