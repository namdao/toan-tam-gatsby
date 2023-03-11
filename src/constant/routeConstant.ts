const ROOTS_AUTH = "/auth";
const ROOTS_APP = "/app";
const ROOT_USER = "/user";
const ROOT_CUSTOMER = "/customer";
const ROOT_COMPANY = "/company";
const ROOT_PRINTTYPE = "/print-type";
const ROOT_CATEGORIES = "/categories";
const ROOT_PAPERTYPE = "/paper-type";
const ROOT_OUTSOURC = "/oursource";
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: `${ROOTS_AUTH}/login`,
  register: `${ROOTS_AUTH}/register`,
};
export const PATH_APP = {
  root: ROOTS_APP,
  statistic: {
    summary: `${ROOTS_APP}/thong-ke-tong-quat`,
    sale: `${ROOTS_APP}/thong-ke-don-hang-sale`,
    customer: `${ROOTS_APP}/doanh-so-khach-hang`,
    debit: `${ROOTS_APP}/doanh-so-cong-no`,
  },
  profile: `${ROOTS_APP}/profile`,
  user: {
    root: `${ROOTS_APP}${ROOT_USER}`,
    list: `${ROOTS_APP}${ROOT_USER}/list`,
    add: `${ROOTS_APP}${ROOT_USER}/add`,
    view: `${ROOTS_APP}${ROOT_USER}/view/:userId`,
    update: `${ROOTS_APP}${ROOT_USER}/edit/:userId`,
    profile: `${ROOTS_APP}${ROOT_USER}/profile`,
  },
  customer: {
    root: `${ROOTS_APP}${ROOT_CUSTOMER}`,
    list: `${ROOTS_APP}${ROOT_CUSTOMER}/list`,
    add: `${ROOTS_APP}${ROOT_CUSTOMER}/add`,
    view: `${ROOTS_APP}${ROOT_CUSTOMER}/view/:customerId`,
    update: `${ROOTS_APP}${ROOT_CUSTOMER}/edit/:customerId`,
  },
  company: {
    root: `${ROOTS_APP}${ROOT_COMPANY}`,
    list: `${ROOTS_APP}${ROOT_COMPANY}/list`,
    add: `${ROOTS_APP}${ROOT_COMPANY}/add`,
    view: `${ROOTS_APP}${ROOT_COMPANY}/view/:companyId`,
    update: `${ROOTS_APP}${ROOT_COMPANY}/edit/:companyId`,
  },
  printType: {
    root: `${ROOTS_APP}${ROOT_PRINTTYPE}`,
    list: `${ROOTS_APP}${ROOT_PRINTTYPE}/list`,
    add: `${ROOTS_APP}${ROOT_PRINTTYPE}/add`,
    view: `${ROOTS_APP}${ROOT_PRINTTYPE}/view/:printTypeId`,
    update: `${ROOTS_APP}${ROOT_PRINTTYPE}/edit/:printTypeId`,
  },
  categories: {
    root: `${ROOTS_APP}${ROOT_CATEGORIES}`,
    list: `${ROOTS_APP}${ROOT_CATEGORIES}/list`,
    add: `${ROOTS_APP}${ROOT_CATEGORIES}/add`,
    view: `${ROOTS_APP}${ROOT_CATEGORIES}/view/:categoryId`,
    update: `${ROOTS_APP}${ROOT_CATEGORIES}/edit/:categoryId`,
  },
  paperType: {
    root: `${ROOTS_APP}${ROOT_PAPERTYPE}`,
    list: `${ROOTS_APP}${ROOT_PAPERTYPE}/list`,
    add: `${ROOTS_APP}${ROOT_PAPERTYPE}/add`,
    view: `${ROOTS_APP}${ROOT_PAPERTYPE}/view/:paperTypeId`,
    update: `${ROOTS_APP}${ROOT_PAPERTYPE}/edit/:paperTypeId`,
  },
  outsource: {
    root: `${ROOTS_APP}${ROOT_OUTSOURC}`,
    list: `${ROOTS_APP}${ROOT_OUTSOURC}/list`,
    add: `${ROOTS_APP}${ROOT_OUTSOURC}/add`,
    view: `${ROOTS_APP}${ROOT_OUTSOURC}/view/:outsourceId`,
    update: `${ROOTS_APP}${ROOT_OUTSOURC}/edit/:outsourceId`,
  },

  orther: {
    permissionDenied: `${ROOTS_APP}/permission-denied`,
    blank: `${ROOTS_APP}/blank`,
  },
};
