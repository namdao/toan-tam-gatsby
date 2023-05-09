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
