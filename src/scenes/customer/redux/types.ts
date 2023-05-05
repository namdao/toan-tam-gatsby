import { ICustomer } from "constant/commonType";

export type IResCustomerList = {
  items: ICustomer[];
  total: number;
};
export enum CUSTOMER_TYPE {
  VANG_LAI = 0,
  THUONG_XUYEN = 1,
}
export type IReqAddCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  ward: string;
  district: string;
  city: string;
  customer_type: CUSTOMER_TYPE;
  company_id?: number;
  personal: boolean;
};
