import axios, { AxiosResponse, AxiosError } from "axios";
import appConstant from "constant/appConstant";
import { IResponseType } from "constant/commonType";

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;

type Headers = {
  Accept: string;
  Authorization?: string | number | true;
  "Accept-Language"?: string;
  "Content-Type": string;
};
const initHeader = {
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
  "Accept-Language": "vi-VN",
};
const init = (): void => {
  const headers: Headers = initHeader;
  const auth = axios.defaults.headers.common.Authorization;
  if (auth) {
    headers.Authorization = auth;
  }
  axios.defaults.headers.common = headers;
};

const setBaseUrl = (newUrl: string): string => {
  let newBaseUrl = "";
  const { IS_TEST_MODE } = process.env;
  if (!IS_TEST_MODE) {
    newBaseUrl = appConstant.ENV.PROD;
  } else if (newUrl) {
    newBaseUrl = newUrl;
  } else {
    newBaseUrl = appConstant.ENV.DEV;
  }
  axios.defaults.baseURL = newBaseUrl;
  return newBaseUrl;
};

const setHeaderToken = (newToken: string): void => {
  if (!axios.defaults.headers || !newToken) {
    console.warn("-------- axios headers empty");
    return;
  }

  const bearerToken = `Bearer ${newToken}`;
  const currentToken = axios.defaults.headers?.common?.Authorization || "";

  if (currentToken === bearerToken) {
    console.warn("-------- axios headers token SAME");
    return;
  }
  axios.defaults.headers.common.Authorization = bearerToken;
};

const clearHeaderToken = (): void => {
  axios.defaults.headers.common = initHeader;
};
const setupOnResponseInterceptors = () => {
  const onResponseSuccess = (
    response: AxiosResponse<IResponseType<any>>
  ): any => {
    return response?.data;
  };
  const onResponseError = (errors: AxiosError): Promise<AxiosResponse<any>> => {
    throw errors.response;
  };
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

const SetupAxios = {
  init,
  setBaseUrl,
  setHeaderToken,
  clearHeaderToken,
  setupOnResponseInterceptors,
};

export default SetupAxios;
