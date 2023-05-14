import { LabelColor } from "components/label/types";
import { ICategoryDefault } from "scenes/categories/redux/types";
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
  PRINTING = 6,
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
export type IOrderTabWaitingPrint = {
  name: string;
  value: ICategoryDefault;
  color: string;
};
export const ORDER_TAB_PROCESSING: IOrderTabProcessing[] = [
  {
    name: "orders.orderProcessing.sale",
    value: ORDER_STATUS_NAME.SALE,
    color: "info",
  },
  {
    name: "orders.orderProcessing.designed",
    value: ORDER_STATUS_NAME.DESIGNED,
    color: "info",
  },
  {
    name: "orders.orderProcessing.waitingPrint",
    value: ORDER_STATUS_NAME.PRINTING,
    color: "warning",
  },
  {
    name: "orders.orderProcessing.printed",
    value: ORDER_STATUS_NAME.PRINTED,
    color: "success",
  },
  {
    name: "orders.orderProcessing.draft",
    value: ORDER_STATUS_NAME.DRAFT,
    color: "default",
  },
];
export const ORDER_TAB_STORED: IOrderTabProcessing[] = [
  {
    name: "orders.orderStore.tabStored",
    value: ORDER_STATUS_NAME.STORED,
    color: "primary",
  },
  {
    name: "orders.orderStore.tabDelivery",
    value: ORDER_STATUS_NAME.DELIVER,
    color: "info",
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
  search_by: SEARCH_BY.ALL,
};

export const listPayment = ["Công nợ", "Chuyển khoản", "Tiền mặt"];
export const listPaymentTypeViaNeedCollect = [
  {
    label: "Thu đủ",
    value: "done",
  },
  {
    label: "Thu chưa đủ",
    value: "debt",
  },
  {
    label: "Cần kiểm tra lại",
    value: "need_check",
  },
];
export const listPaymentTypeViaCompanyDebit = [
  {
    label: "Thu đủ",
    value: "done",
  },
  {
    label: "Thu chưa đủ",
    value: "debt",
  },
];
export const listPaymentTypeViaNeedCheck = [
  {
    label: "Thu đủ",
    value: "done",
  },
  {
    label: "Cần kiểm tra lại",
    value: "need_check",
  },
];
export const listConfirmMoney = [
  {
    label: "Xác nhận đủ",
    value: true,
  },
  {
    label: "Xác nhận lại với kế toán",
    value: false,
  },
];
export const LIST_MONEY_SOURCE = {
  VIB_PERSON: "VIB cá nhân",
  VIB_COMPANY: "VIB công ty",
  SACOMBANK_PERSON: "Sacombank cá nhân",
  SACOMBANK_COMPANY: "Sacombank công ty",
  ZALO_PAY: "Zalo pay",
  MOMO: "Momo",
  CASH: "Tiền mặt",
};

export const ORDER_TAB_WAITING_PRINT: IOrderTabWaitingPrint[] = [
  {
    name: "orders.orderWaitingPrintList.card",
    value: "Card",
    color: "info",
  },
  {
    name: "orders.orderWaitingPrintList.toroi",
    value: "Tờ rơi",
    color: "warning",
  },
  {
    name: "orders.orderWaitingPrintList.sticker",
    value: "Sticker",
    color: "success",
  },
  {
    name: "orders.orderWaitingPrintList.other",
    value: "other",
    color: "default",
  },
];
