import { ICustomer, ICompany } from "constant/commonType";

export type IResCompanies = ICompany & {
  users: ICustomer[];
};

export type IReqAddCompany = {
  company_name: string;
  tax_code?: string;
  email?: string;
  accountant_email?: string;
  phone?: string;
  address?: string;
  ward?: string;
  district?: string;
  city?: string;
};
