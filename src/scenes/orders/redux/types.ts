import {
  ORDER_STATUS_NAME,
  ORDER_STATUS_VALUE,
  SEARCH_BY,
} from "../helper/OrderConstant";

export type IResTotalDebigProgress = {
  total_debit: number;
  total_paid: number;
};

export type IReqOrderStatus = {
  status: ORDER_STATUS_NAME;
  search_by: SEARCH_BY;
  per_page: number;
  page: number;
  created_date?: string;
  updated_date?: string;
  search?: string;
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
  date_collect_money: null | string;
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
