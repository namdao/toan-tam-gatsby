const ROOTS_AUTH = "/auth";
const ROOT_STATISTIC = "/thong-ke";
const ROOT_USER = "/user";
const ROOT_CUSTOMER = "/customer";
const ROOT_COMPANY = "/company";
const ROOT_PRINTTYPE = "/print-type";
const ROOT_CATEGORIES = "/categories";
const ROOT_PAPERTYPE = "/paper-type";
const ROOT_OUTSOURCE = "/oursource";
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
    invidual: `${ROOT_STATISTIC}/thong-ke-ca-nhan`,
    customer: `${ROOT_STATISTIC}/doanh-so-khach-hang`,
    debit: `${ROOT_STATISTIC}/doanh-so-cong-no`,
    debitDetail: `${ROOT_STATISTIC}/doanh-so-cong-no/:company_id`,
  },
  profile: `/profile`,
  user: {
    root: ROOT_USER,
    list: `${ROOT_USER}/danh-sach-user`,
    add: `${ROOT_USER}/tao-user`,
    view: `${ROOT_USER}/view/:userId`,
    update: `${ROOT_USER}/edit/:userId`,
    profile: `${ROOT_USER}/profile`,
  },
  customer: {
    root: `${ROOT_CUSTOMER}`,
    list: `${ROOT_CUSTOMER}/danh-sach-khach-hang`,
    add: `${ROOT_CUSTOMER}/tao-khach-hang`,
    view: `${ROOT_CUSTOMER}/view/:customerId`,
    update: `${ROOT_CUSTOMER}/edit/:customerId`,
  },
  company: {
    root: `${ROOT_COMPANY}`,
    list: `${ROOT_COMPANY}/danh-sach-cong-ty`,
    add: `${ROOT_COMPANY}/tao-cong-ty`,
    view: `${ROOT_COMPANY}/view/:companyId`,
    update: `${ROOT_COMPANY}/edit/:companyId`,
  },
  printType: {
    root: `${ROOT_PRINTTYPE}/quan-ly-kieu-in`,
  },
  categories: {
    root: `${ROOT_CATEGORIES}`,
    list: `${ROOT_CATEGORIES}/danh-muc-hang-hoa`,
    add: `${ROOT_CATEGORIES}/them-danh-muc`,
    view: `${ROOT_CATEGORIES}/view/:categoryId`,
    update: `${ROOT_CATEGORIES}/edit/:categoryId`,
  },
  paperType: {
    root: `${ROOT_PAPERTYPE}/quan-ly-loai-giay`,
  },
  outsource: {
    root: `${ROOT_OUTSOURCE}/quan-ly-gia-cong`,
  },
  order: {
    root: ROOT_ORDER,
    search: `${ROOT_ORDER}/tim-kiem-don-hang`,
    detail: {
      route: `${ROOT_ORDER}/thong-tin-don-hang/:orderId`,
      link: (orderId: number) => `${ROOT_ORDER}/thong-tin-don-hang/${orderId}`,
    },
    update: {
      route: `${ROOT_ORDER}/cap-nhat-don-hang/:orderId`,
      link: (orderId: number) => `${ROOT_ORDER}/cap-nhat-don-hang/${orderId}`,
    },
    processing: `${ROOT_ORDER}/don-hang-dang-thuc-hien`,
    needPaid: `${ROOT_ORDER}/don-hang-can-thanh-toan`,
    needCheck: `${ROOT_ORDER}/don-hang-can-kiem-tra`,
    needConfirm: `${ROOT_ORDER}/don-hang-can-xac-nhan`,
    stored: `${ROOT_ORDER}/don-hang-luu-kho`,
    waitingPrint: `${ROOT_ORDER}/don-hang-cho-in`,
    printing: `${ROOT_ORDER}/don-hang-dang-in`,
  },
};
