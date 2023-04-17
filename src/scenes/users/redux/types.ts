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
