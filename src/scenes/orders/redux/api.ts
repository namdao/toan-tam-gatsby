import axios from "axios";
import appConstant from "constant/appConstant";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import {
  IReqOrderListCollect,
  IReqOrderStatus,
  IRequestUpdateOrder,
} from "./types";

const { API_URL } = appConstant;
export const apiTotalInProgress = () => axios.get(API_URL.TOTAL_INPROGRESS);
export const apiOrderStatus = (params: IReqOrderStatus) =>
  axios.get(API_URL.ORDERS2, { params });

export const apiOrderDetail = (orderId: number) =>
  axios.get(API_URL.ORDERS_ACTIONS(orderId));

export const apiOrderUpdate = (orderId: number, payload: IRequestUpdateOrder) =>
  axios.put(API_URL.ORDERS_ACTIONS(orderId), payload);

export const apiTotalReceivables = () => axios.get(API_URL.TOTAL_RECEIVABLES);

export const apiOrderListReceivable = (payload: IReqOrderListCollect) =>
  axios.get(API_URL.ORDERS3, {
    params: {
      status: ORDER_STATUS_NAME.DONE,
      seearch_by: "all",
      done: false,
      need_check: false,
      debt: false,
      ...payload,
    },
  });

export const apiOrderDetailList = (payload: { order_ids: number[] }) =>
  axios.post(API_URL.ORDER_DETAILS_LIST, payload);

export const apiSendEmailOrder = (payload: { order_ids: number[] }) =>
  axios.post(API_URL.SEND_EMAIL, payload);
