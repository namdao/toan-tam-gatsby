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
