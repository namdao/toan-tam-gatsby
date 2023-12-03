import { CUSTOMER_TYPE } from "scenes/customer/redux/types";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";

export interface IResErrors {
  messages: string | Array<string> | Record<string, string>;
  message?: string;
  messasge?: string;
  code: number;
}
export interface IResponseType<T> {
  data?: T;
  errors?: IResErrors;
}

export type INotes = {
  created_time: string;
  note: string;
  status: ORDER_STATUS_NAME;
  new_status?: ORDER_STATUS_NAME;
  user_change: string;
};
export type ICompany = {
  accountant_email: string;
  address: string;
  city: string;
  company_code: number;
  company_name: string;
  created_time: string;
  district: string;
  email: string;
  id: number;
  personal: null;
  phone: string;
  tax_code: string;
  updated_time: string;
  ward: string;
};
export type IOurSources = {
  group: string;
  id: number;
  max_select: number;
  name: string;
};
export type IPaper = {
  id: number;
  paper_code: string;
  paper_name: string;
};
export type IPrintTypes = {
  group: string;
  id: number;
  max_select: number;
  print_type_name: string;
};
export type ICustomer = {
  address: string;
  city: string;
  company: ICompany;
  company_id: number;
  customer_type: CUSTOMER_TYPE;
  district: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  status: number;
  ward: string;
  personal: boolean;
};
