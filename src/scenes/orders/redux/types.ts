import {
  ICustomer,
  INotes,
  IOurSources,
  IPaper,
  IPrintTypes,
} from "constant/commonType";
import { IResUser } from "scenes/auth/redux/types";
import { IColor } from "scenes/printtype/redux/types";
import {
  ORDER_STATUS_NAME,
  SEARCH_BY,
  ORDER_TYPE,
  GROUP_ORDER_TYPE,
  STATUS_ORDER_GROUP,
} from "../helper/OrderConstant";

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
  order_by?: string;
  category?: string;
  sort_direction?: "asc" | "desc";
};
export type IReqOrderCategoryStatus = IPage & {
  status: ORDER_STATUS_NAME;
  order_by?: string;
  category?: string;
  sort_direction?: "asc" | "desc";
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
  order_type: ORDER_TYPE;
  outsource_after_print: null;
  outsource_date: number | null;
  outsource_ids: number[];
  paper_id: number;
  payment_method: string;
  print_type: string | null;
  print_type_id: number | null;
  print_type_ids: number[];
  print_types?: IColor[];
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
  images: string[];
};
export type IResOrder2Status = {
  items: IOrder[];
  total: number;
};
export type IResOrderByCategory = {
  items: IOrderDetail[];
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
  order_type: ORDER_TYPE;
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
  images: string[];
  order_detail_notes: string;
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
  money_source?: string;
  who_collect_money?: string;
  company_debit?: number;
  confirmed_money?: boolean;
  deliver_provider?: string;
  tracking_id?: string;
  status?: ORDER_STATUS_NAME;
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
  company_id?: number;
  start_date: string;
  end_date: string;
  search_by?: "all";
  money_source: string;
};

export type IReqOrderSearch = IPage & {
  method?: string;
  customer_id?: number;
  paper?: string;
  order_name?: string;
};

export type IReqRejectOrder = {
  reason: string;
};

export type IReqPrintDoneOrder = {
  note: string;
  status: ORDER_STATUS_NAME;
  outsource_date: string;
};

export type IReqCreateOrder = {
  customer_id: number;
  delivery_address: string;
  delivery_date: string;
  receiver_info: string;
  // order info
  order_type: ORDER_TYPE;
  name: string;
  method: string;
  category_id: number;
  paper_id: number;
  print_type_ids: number[];
  number_print_face: number;
  outsource_ids?: number[];
  // payment info
  template_number: number;
  quantity: number;
  unit_price: number;
  design_fee: number;
  shipping_fee: number;
  deposite: number;
  vat: boolean;
  status: ORDER_STATUS_NAME;
  payment_method: string;
  note: string;
  order_detail_notes: string;
};

export type IResCreateOrder = {
  id: number;
  created_time: string;
  updated_time: string;
  order_no: string;
  name: string | null;
  user_id: number | null;
  creator_id: number;
  customer_id: number;
  category_id: number;
  paper_id: number;
  quantity: number | null;
  template_number: number | null;
  reference_order: null | number;
  unit_price: number | null;
  deposite: number | null;
  design_fee: null | number;
  shipping_fee: null | number;
  note: null | string;
  order_detail_notes: null | string;
  delivery_date: string | null;
  payment_method: string | null;
  vat: boolean;
  print_type_ids: number[] | [];
  outsource_ids: number[] | [];
  status: ORDER_STATUS_NAME;
  number_print_face: number | null;
  method: string | null;
  delivery_address: string | null;
  receiver_info: string | null;
  receiver_phone: null;
  outsource_date: null;
  order_type: ORDER_TYPE;
  cash: number;
  cod: null | number;
  company_debit: null | number;
  done: boolean;
  need_check: boolean;
  debt: boolean;
  vat_value: number;
  tracking_id: string;
  deliver_provider: string;
  money_source: string;
  who_collect_money: string;
  date_collect_money: null | string;
  confirmed_money: boolean;
  images: null | string[];
};

export type IResUrlUpload = {
  upload_url: string;
};

export type IQuickUpdateOrder = {
  id: number;
  note: string;
  status: ORDER_STATUS_NAME;
};

export type IReqGroupByStatus = {
  status: GROUP_ORDER_TYPE;
};
export type IReqCustomerByStatus = IPage & {
  status: ORDER_STATUS_NAME;
};

export type IReqUpdateMultiOrder = {
  order_ids: number[];
  status: ORDER_STATUS_NAME;
  notes: string;
};

export type IReqCreateGroup = {
  order_ids: number[];
  group_type: GROUP_ORDER_TYPE;
  name: string;
};
export type IReqUpdateOrderPrinted = {
  order_ids: number[]; // cập nhật lại ds đơn theo group bị nhầm, có thể truyền rỗng nếu kg thay đổi
  group_type: GROUP_ORDER_TYPE;
  status: STATUS_ORDER_GROUP;
  printed_orders: number[]; // cập nhật những đơn đã in
  outsource_date: string;
  notes: string;
};

export type IResCustomerByStatusOrder = {
  items: ICustomer[];
  total: number;
};

export type IResOrderByCustomer = {
  items: IOrder[];
  total: number;
};

type IDataGroup = {
  created_time: string;
  updated_time: string;
  id: number;
  group_name: string;
  group_type: string;
  status: GROUP_ORDER_TYPE;
  orders: {
    id: number;
    order_no: string;
    image: string;
    status: ORDER_STATUS_NAME;
  };
};

export type IResCreateGroup = IDataGroup;

export type IResGroup = {
  items: IDataGroup[];
};
export type IReqOrderDelivery = {
  note: string;
  deliver_provider: string;
  tracking_id?: string;
  status: ORDER_STATUS_NAME;
};
