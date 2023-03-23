import { LabelColor } from "components/label/types";
import { IReqParams } from "../redux/types";

export const ORDER_STATUS_VALUE = {
  "-1": "Đã hủy",
  0: "Nháp",
  1: "Sale",
  2: "Đang thiết kế",
  3: "Chờ phản hồi thiết kế",
  4: "Đang thiết kế theo phản hồi",
  5: "Đã thiết kế",
  6: "Chờ in",
  7: "Đã in",
  8: "Lưu kho",
  9: "Giao hàng",
  10: "Hoàn thành",
};

export enum ORDER_STATUS_NAME {
  CANCEL = -1,
  DRAFT = 0,
  SALE = 1,
  DESIGNING = 2,
  WAITING_FEEDBACK = 3,
  DESIGNING_AFTER_FEEDBACK = 4,
  DESIGNED = 5,
  WAITING_PRINT = 6,
  PRINTED = 7,
  STORED = 8,
  DELIVER = 9,
  DONE = 10,
}
export enum SEARCH_BY {
  ALL = "all",
  CUSTOMER_NAME = "customer_name",
  COMPANY_NAME = "company_name",
  ORDER_NO = "order_no",
  ORDER_NAME = "order_name",
}
export type IOrderTabProcessing = {
  name: string;
  value: ORDER_STATUS_NAME;
  color: LabelColor;
};
export const ORDER_TAB_PROCESSING: IOrderTabProcessing[] = [
  {
    name: "orders.orderProcessing.designed",
    value: ORDER_STATUS_NAME.DESIGNED,
    color: "info",
  },
  {
    name: "orders.orderProcessing.waitingPrint",
    value: ORDER_STATUS_NAME.WAITING_PRINT,
    color: "warning",
  },
  {
    name: "orders.orderProcessing.printed",
    value: ORDER_STATUS_NAME.PRINTED,
    color: "success",
  },
  {
    name: "orders.orderProcessing.cancel",
    value: ORDER_STATUS_NAME.CANCEL,
    color: "error",
  },
  {
    name: "orders.orderProcessing.draft",
    value: ORDER_STATUS_NAME.DRAFT,
    color: "default",
  },
];
export const ORDER_FILTER = [
  {
    name: "orders.filterGroup.all",
    value: "all",
  },
  {
    name: "orders.filterGroup.customerName",
    value: "customer_name",
  },
  {
    name: "orders.filterGroup.companyName",
    value: "company_name",
  },
  {
    name: "orders.filterGroup.orderNo",
    value: "order_no",
  },
  {
    name: "orders.filterGroup.orderFile",
    value: "order_name",
  },
];

export const initParams: IReqParams = {
  page: 1,
  per_page: 20,
  search_by: "all",
};
