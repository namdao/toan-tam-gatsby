import axios from "axios";
import appConstant from "constant/appConstant";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import {
  IQuickUpdateOrder,
  IReqCreateGroup,
  IReqCreateOrder,
  IReqCustomerByStatus,
  IReqGroupByStatus,
  IReqOrderCategoryStatus,
  IReqOrderListCollect,
  IReqOrderListConfirm,
  IReqOrderSearch,
  IReqOrderStatus,
  IReqPrintDoneOrder,
  IReqRejectOrder,
  IRequestUpdateOrder,
  IReqUpdateMultiOrder,
  IReqUpdateOrderPrinted,
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
      search_by: "all",
      done: false,
      need_check: false,
      debt: false,
      ...payload,
    },
  });

export const apiOrderListNeedCheck = (payload: IReqOrderListCollect) =>
  axios.get(API_URL.ORDERS3, {
    params: {
      status: ORDER_STATUS_NAME.DONE,
      search_by: "all",
      done: false,
      need_check: true,
      debt: false,
      ...payload,
    },
  });
export const apiOrderDetailList = (payload: { order_ids: number[] }) =>
  axios.post(API_URL.ORDER_DETAILS_LIST, payload);

export const apiSendEmailOrder = (payload: { order_ids: number[] }) =>
  axios.post(API_URL.SEND_EMAIL, payload);

export const apiOrderConfirmList = (params: IReqOrderListConfirm) =>
  axios.get(API_URL.ORDERS4, {
    params: {
      ...params,
      search_by: "all",
      done: true,
      status: ORDER_STATUS_NAME.DONE,
    },
  });
export const apiOrderSearch = (params: IReqOrderSearch) =>
  axios.get(API_URL.SEARCH, { params });

export const apiOrderCategory = (params: IReqOrderCategoryStatus) =>
  axios.get(API_URL.ORDERS, { params });

export const apiAssignOrder = (id: number, status: ORDER_STATUS_NAME) =>
  axios.put(API_URL.ASSIGN_ORDER(id), { status });
export const apiRejectOrder = (id: number, data: IReqRejectOrder) =>
  axios.put(API_URL.REJECT_ORDER(id), data);

export const apiDonePrintOrder = (id: number, data: IReqPrintDoneOrder) =>
  axios.put(API_URL.ORDERS_ACTIONS(id), data);

export const apiCreateOrder = (data: IReqCreateOrder) =>
  axios.post(API_URL.CREATE_ORDER, data);

export const apiRequestUploadImg = (id: number, filename: string) =>
  axios.post(API_URL.REQUEST_UPLOAD_IMAGE(id), { filename });

export const apiUpdateOrderCreate = (
  orderId: number,
  data: IReqCreateOrder | IQuickUpdateOrder
) => axios.put(API_URL.ORDERS_ACTIONS(orderId), data);

export const apiRemoveImg = (orderId: number, image_name: string) =>
  axios.delete(API_URL.DELETE_IMAGE(orderId), {
    data: {
      image_name,
    },
  });

export const apiGetOrderGroup = (params: IReqGroupByStatus) =>
  axios.get(API_URL.ORDER_GROUPS, { params });

export const apiCreateGroup = (data: IReqCreateGroup) =>
  axios.post(API_URL.ORDER_GROUPS, data);

export const apiUpdateOrderGroup = (
  idGroup: number,
  data: IReqUpdateOrderPrinted
) => axios.put(API_URL.UPDATE_ORDER_GROUPS(idGroup), data);

export const apiUpdateMultiOrderByOrderStatus = (data: IReqUpdateMultiOrder) =>
  axios.put(API_URL.UPDATE_MULTI_ORDER_BY_STATUS, data);

export const apiGetOrderByCustomer = (
  customerId: number,
  status: ORDER_STATUS_NAME
) =>
  axios.get(API_URL.ORDER_BY_CUSTOMERS_ID(customerId), {
    params: {
      status,
    },
  });

export const apiGetCustomerByOrderStatus = (params: IReqCustomerByStatus) =>
  axios.get(API_URL.GET_CUSTOMER_BY_ORDER_STATUS, { params });
