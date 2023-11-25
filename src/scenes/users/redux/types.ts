import { IRoles } from "scenes/auth/redux/slice";

export type IResUser = {
  created_time: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  phone: string;
  username: string;
  roles: IRoles[];
  status: IStatusUser;
};

export type IReqEmployeeReport = {
  employee_id: number;
  date_from: string;
  date_to: string;
  isInYear?: boolean;
  isCurrent?: boolean;
  isLastMonth?: boolean;
};

export type IResEmployeeReport = {
  company_debit: number;
  total_income: number;
  total_order: number;
  total_paid: number;
  total_quantity: number;
};
export type IReqUpdateUser = {
  first_name?: string;
  last_name?: string;
  username?: string;
  role_name?: string;
  email: string;
  status: IStatusUser;
};
export enum IStatusUser {
  INACTIVE = -1,
  PENDING = 0,
  ACTIVE = 1,
}
export type IReqAddUser = IReqUpdateUser;
