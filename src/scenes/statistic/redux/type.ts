import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";

export type IResTotalDebit = {
  total_debit: number;
  total_paid: number;
};

export type ICustomerDebit = {
  company_id: number;
  company_name: string;
  delta: number;
  full_count: number;
  total_debit: number;
  total_paid: number;
};
export type IResCustomerDebit = {
  items: ICustomerDebit[];
  total: number;
};

export type IReqCompanyDebitDetail = {
  status: ORDER_STATUS_NAME.DONE;
  search_by: "all";
  page: number;
  per_page: number;
  done: boolean;
  need_check: boolean;
  debt: boolean;
  company_id: number;
};

export type IReqReportRevenue = {
  page: number;
  per_page: number;
  date_from: string;
  date_to: string;
  money: number;
};
export type IReportRevenue = {
  company_id: number;
  company_name: string;
  total_income: number;
  total_orders: number;
};
export type IResReportRevenue = {
  items: IReportRevenue[];
  total: number;
};
export type IReqReportRevenueDetail = {
  page: number;
  per_page: number;
  date_from: string;
  date_to: string;
};

export type IReqTotalDebit = {
  company_id: string;
};