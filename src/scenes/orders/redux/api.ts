import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqOrderStatus, IRequestUpdateOrder } from "./types";

const { API_URL } = appConstant;
export const apiTotalInProgress = () => axios.get(API_URL.TOTAL_INPROGRESS);
export const apiOrderStatus = (params: IReqOrderStatus) =>
  axios.get(API_URL.ORDERS2, { params });

export const apiOrderDetail = (orderId: number) =>
  axios.get(API_URL.ORDERS_ACTIONS(orderId));

export const apiOrderUpdate = (orderId: number, payload: IRequestUpdateOrder) =>
  axios.put(API_URL.ORDERS_ACTIONS(orderId), payload);
