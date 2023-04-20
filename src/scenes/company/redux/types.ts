import { ICustomer, ICompany } from "constant/commonType";

export type IResCompanies = ICompany & {
  users: ICustomer[];
};
