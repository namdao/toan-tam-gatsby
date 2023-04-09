import {
  ICustomer,
  INotes,
  IOurSources,
  IPaper,
  IPrintTypes,
} from "constant/commonType";
import { IResUser } from "scenes/auth/redux/types";
import { ORDER_STATUS_NAME, SEARCH_BY } from "../helper/OrderConstant";

export type IResTotalDebigProgress = {
  total_debit: number;
  total_paid: number;
};
export type IPage = {
  per_page: number;
  page: number;
};
export type IReqOrderStatus = IPage & {
  status: ORDER_STATUS_NAME;
  search_by: SEARCH_BY;
  created_date?: string;
  updated_date?: string;
  search?: string;
  customer_id?: number;
};
export type IReqParams = Omit<IReqOrderStatus, "status">;

export type IOrder = {
  cash: number;
  category_id: number;
  category_name: string;
  cod: number;
  company_address: string;
  company_debit: string;
  company_email: string;
  company_name: string;
  company_phone: string;
  confirmed_money: boolean;
  created_time: number;
  creator_id: number;
  customer_address: string;
  customer_customer_id: number;
  customer_email: string;
  customer_id: number;
  customer_name: string;
  customer_phone: string;
  date_collect_money: number | string;
  debt: boolean;
  deliver: string;
  deliver_provider: string;
  delivery_address: string;
  delivery_date: number;
  deposite: number;
  design_fee: number;
  design_file_name: string | null;
  done: boolean;
  full_count: number;
  id: number;
  method: string;
  money_source: string;
  name: string;
  need_check: boolean;
  note: string;
  number_print_face: number;
  order_no: string;
  order_type: "CUSTOM";
  outsource_after_print: null;
  outsource_date: number | null;
  outsource_ids: number[];
  paper_id: number;
  payment_method: string;
  print_type: string | null;
  print_type_id: number | null;
  print_type_ids: number[];
  quantity: number;
  receiver_info: string;
  receiver_phone: null | string;
  reference_order: null | string;
  shipping_fee: number;
  status: ORDER_STATUS_NAME;
  template_number: number;
  total_cost: number;
  tracking_id: string;
  unit_price: number;
  updated_time: number;
  user_id: null | number;
  vat: boolean;
  vat_value: number;
  who_collect_money: string;
};
export type IResOrder2Status = {
  items: IOrder[];
  total: number;
};
export type IOrderDetail = {
  cash: number;
  category: {
    category_name: string;
    deleted_at: string | null;
    id: number;
    parent_id: number;
  };
  category_id: number;
  cod: number;
  company_debit: string;
  confirmed_money: boolean;
  created_time: string;
  creator_id: number;
  customer: ICustomer;
  customer_id: number;
  date_collect_money: null | number;
  debt: boolean;
  deliver: string;
  deliver_provider: string;
  delivery_address: string;
  delivery_date: string;
  deposite: number;
  design_fee: number;
  design_file_name: string | null;
  done: boolean;
  id: number;
  method: string;
  money_source: string;
  name: string;
  need_check: boolean;
  notes: INotes[];
  number_print_face: number;
  order_no: string;
  order_type: "CUSTOM";
  outsource_date: string | null;
  outsource_ids: number[];
  outsources: IOurSources[];
  paper: IPaper;
  paper_id: number;
  payment_method: string;
  print_type_ids: number[];
  print_types: IPrintTypes[];
  quantity: number;
  receiver_info: string;
  receiver_phone: null | string;
  reference_order: null | string;
  saler: IResUser;
  shipping_fee: number;
  status: ORDER_STATUS_NAME;
  template_number: number;
  total_cost: number;
  tracking_id: string;
  unit_price: number;
  updated_time: string;
  user: IResUser;
  user_id: null | number;
  vat: boolean;
  vat_value: number;
  who_collect_money: string;
};

export type IRequestUpdateOrder = {
  note: string;
  payment_method?: string;
  deposite?: number;
  cash?: number;
  code?: number;
  done?: boolean;
  debt?: boolean;
  need_check?: boolean;
  date_collect_money?: Date;
  money_source?: number;
  who_collect_money?: string;
  company_debit?: number;
  confirmed_money?: boolean;
};

export type IResUpdateOrder = {
  message: string;
};

export type IResTotalReceive = {
  total_debit: number;
  total_paid: number;
};

export type IReqOrderListCollect = IPage & {
  customer_id?: number;
  created_date?: string;
  updated_date?: string;
};

export type IResOrderListCollect = IResOrder2Status;

export type IResOrderListDetail = IOrderDetail & {
  real_delivery_date: string;
};

export type IReqOrderListConfirm = IPage & {
  customer_id?: number;
  start_date: string;
  end_date: string;
};
