import authLangs from "scenes/auth/langs/en";
import orderLangs from "scenes/orders/langs/en";
import userLangs from "scenes/users/langs/en";
import customerLangs from "scenes/customer/langs/en";
import companyLangs from "scenes/company/langs/en";
import printTypeLangs from "scenes/printtype/langs/en";
import categoryLangs from "scenes/categories/langs/en";
import paperLangs from "scenes/papers/langs/vi";
import outsourceLangs from "scenes/outsources/langs/vi";
import statisticLangs from "scenes/statistic/langs/vi";

const en = {
  hi: "Hi",
  logout: "Logout",
  logoutSuccess: "Logout success",
  logoutFail: "Logout fail",
  wellcomeCompany: "Wellcome to Toan Tam Print Pro Co.,Ltd",
  permissionDenied: "Permission denied!!!",
  notfound: "Page not found!",
  gotoHome: "Go to home",
  statistic: {
    title: "Statistic",
    sumary: "Sumary",
    invidual: "Statistic for invidual",
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
  order: orderLangs,
  users: userLangs,
  customer: customerLangs,
  company: companyLangs,
  printtype: printTypeLangs,
  category: categoryLangs,
  paper: paperLangs,
  outsource: outsourceLangs,
  statistic: statisticLangs,
};
