import authLangs from "scenes/auth/langs/en";

const en = {
  hi: "Hi",
  logout: "Logout",
  logoutSuccess: "Logout success",
  logoutFail: "Logout fail",
  wellcomeCompany: "Wellcome to Toan Tam Print Pro Co.,Ltd",
  statistic: {
    title: "Statistic",
    sumary: "Sumary",
    sale: "Statistic for Sale",
    customer: "Customer income",
    debit: "Customer debit",
  },
  basicInfo: {
    title: "Basic info",
    user: "Manage user",
    customer: "Manage customer",
    company: "Manage company",
    printType: "Manage print type",
    categories: "Manage categories",
    paperType: "Manage paper type",
    outsource: "Manage outsource",
  },
  order: {
    title: "Order",
    search: "Order serach",
    processing: "Order processing",
    needPaid: "Order need paid",
    needCheck: "Order need check",
    needConfirm: "Order need confirm",
    stored: "Order stored",
  },
};

export default {
  ...en,
  auth: authLangs,
};
