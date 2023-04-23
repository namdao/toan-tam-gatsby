import axios, { AxiosResponse, AxiosError } from "axios";
import appConstant from "constant/appConstant";
import { enqueueSnackbar } from "notistack";
import { IResponseType } from "constant/commonType";
import { isArray } from "lodash";

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
  if (!process.env.IS_TEST_MODE) {
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
let interceptorInit = false;
const setupOnResponseInterceptors = () => {
  const onResponseSuccess = (
    response: AxiosResponse<IResponseType<any>>
  ): any => {
    if (response.data?.errors) {
      let { messages } = response.data.errors;
      if (typeof messages === "object") {
        messages = Object.values(messages);
      }
      if (isArray(messages)) {
        const firstMessage = messages.find((e) => {
          if (typeof e === "string") {
            return e;
          } else if (isArray(e)) {
            return e[0];
          } else {
            return "lỗi không xác định";
          }
        });
        const messageFinal = firstMessage?.[0] || firstMessage;
        return enqueueSnackbar(messageFinal, { variant: "error" });
      }
      return enqueueSnackbar(messages, { variant: "error" });
    }
    return response?.data;
  };
  const onResponseError = (errors: AxiosError): Promise<AxiosResponse<any>> => {
    throw errors;
  };
  if (!interceptorInit) {
    axios.interceptors.response.use(onResponseSuccess, onResponseError);
    interceptorInit = true;
  }
};

const SetupAxios = {
  init,
  setBaseUrl,
  setHeaderToken,
  clearHeaderToken,
  setupOnResponseInterceptors,
};

export default SetupAxios;
