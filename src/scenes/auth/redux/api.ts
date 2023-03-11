import axios from "axios";
import appConstant from "constant/appConstant";
import { IRequestLogin } from "./types";

const { API_URL } = appConstant;
export const apiLogin = (body: IRequestLogin) =>
  axios.post(API_URL.SESSION, body);
export const apiLogout = () => axios.delete(API_URL.SESSION);
