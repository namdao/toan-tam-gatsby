const ROOTS_AUTH = "/auth";
const ROOT_STATISTIC = "/thong-ke";
const ROOT_USER = "/user";
const ROOT_CUSTOMER = "/customer";
const ROOT_COMPANY = "/company";
const ROOT_PRINTTYPE = "/print-type";
const ROOT_CATEGORIES = "/categories";
const ROOT_PAPERTYPE = "/paper-type";
const ROOT_OUTSOURC = "/oursource";
const ROOT_ORDER = "/order";
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: `${ROOTS_AUTH}/login`,
  register: `${ROOTS_AUTH}/register`,
};
export const PATH_APP = {
  statistic: {
    root: ROOT_STATISTIC,
    summary: `${ROOT_STATISTIC}/thong-ke-tong-quat`,
    sale: `${ROOT_STATISTIC}/thong-ke-don-hang-sale`,
    customer: `${ROOT_STATISTIC}/doanh-so-khach-hang`,
    debit: `${ROOT_STATISTIC}/doanh-so-cong-no`,
  },
  profile: `/profile`,
  user: {
    root: ROOT_USER,
    list: `${ROOT_USER}/list`,
    add: `${ROOT_USER}/add`,
    view: `${ROOT_USER}/view/:userId`,
    update: `${ROOT_USER}/edit/:userId`,
    profile: `${ROOT_USER}/profile`,
  },
  customer: {
    root: `${ROOT_CUSTOMER}`,
    list: `${ROOT_CUSTOMER}/list`,
    add: `${ROOT_CUSTOMER}/add`,
    view: `${ROOT_CUSTOMER}/view/:customerId`,
    update: `${ROOT_CUSTOMER}/edit/:customerId`,
  },
  company: {
    root: `${ROOT_COMPANY}`,
    list: `${ROOT_COMPANY}/list`,
    add: `${ROOT_COMPANY}/add`,
    view: `${ROOT_COMPANY}/view/:companyId`,
    update: `${ROOT_COMPANY}/edit/:companyId`,
  },
  printType: {
    root: `${ROOT_PRINTTYPE}`,
    list: `${ROOT_PRINTTYPE}/list`,
    add: `${ROOT_PRINTTYPE}/add`,
    view: `${ROOT_PRINTTYPE}/view/:printTypeId`,
    update: `${ROOT_PRINTTYPE}/edit/:printTypeId`,
  },
  categories: {
    root: `${ROOT_CATEGORIES}`,
    list: `${ROOT_CATEGORIES}/list`,
    add: `${ROOT_CATEGORIES}/add`,
    view: `${ROOT_CATEGORIES}/view/:categoryId`,
    update: `${ROOT_CATEGORIES}/edit/:categoryId`,
  },
  paperType: {
    root: `${ROOT_PAPERTYPE}`,
    list: `${ROOT_PAPERTYPE}/list`,
    add: `${ROOT_PAPERTYPE}/add`,
    view: `${ROOT_PAPERTYPE}/view/:paperTypeId`,
    update: `${ROOT_PAPERTYPE}/edit/:paperTypeId`,
  },
  outsource: {
    root: `${ROOT_OUTSOURC}`,
    list: `${ROOT_OUTSOURC}/list`,
    add: `${ROOT_OUTSOURC}/add`,
    view: `${ROOT_OUTSOURC}/view/:outsourceId`,
    update: `${ROOT_OUTSOURC}/edit/:outsourceId`,
  },
  order: {
    root: ROOT_ORDER,
    search: `${ROOT_ORDER}/tim-kiem-don-hang`,
    processing: `${ROOT_ORDER}/don-hang-dang-thuc-hien`,
    needPaid: `${ROOT_ORDER}/don-hang-can-thanh-toan`,
    needCheck: `${ROOT_ORDER}/don-hang-can-kiem-tra`,
    needConfirm: `${ROOT_ORDER}/don-hang-can-xac-nhan`,
    stored: `${ROOT_ORDER}/don-hang-luu-kho`,
  },

  orther: {
    permissionDenied: `/permission-denied`,
    blank: `/blank`,
  },
};
