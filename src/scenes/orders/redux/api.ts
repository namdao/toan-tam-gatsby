import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqOrderStatus } from "./types";

const { API_URL } = appConstant;
export const apiTotalInProgress = () => axios.get(API_URL.TOTAL_INPROGRESS);
export const apiOrderStatus = (params: IReqOrderStatus) =>
  axios.get(API_URL.ORDERS2, { params });

export const apiOrderDetail = (orderId: number) =>
  axios.get(API_URL.ORDERS_DETAIL(orderId));
