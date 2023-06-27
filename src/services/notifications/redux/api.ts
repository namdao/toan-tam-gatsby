import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqReadNoti } from "./types";

export const apiGetListNotification = () =>
  axios.get(appConstant.API_URL.NOTIFICATION);

export const apiReadNotification = (body: IReqReadNoti) =>
  axios.put(appConstant.API_URL.NOTIFICATION, body);
