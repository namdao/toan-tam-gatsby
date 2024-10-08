const appConstant = {
  ENV: {
    DEV: "http://localhost:5001",
    PROD: "https://api.inantoantam.com/",
  },
  API_URL: {
    SESSION: "/users/session",
    TOTAL_INPROGRESS: "/total-inprogress",
    ORDERS: "/orders/",
    ORDERS2: "/orders2",
    PAPER_TYPE: "/paper-type",
    PAPER_TYPES: "/paper-types",
    ORDERS_ACTIONS: (id: number) => `/orders/${id}`,
    TOTAL_RECEIVABLES: "/total-receivables",
    ORDERS3: "/orders3",
    CUSTOMERS: "/customers",
    ORDER_DETAILS_LIST: "/order-detail",
    SEND_EMAIL: "/send-receipt",
    ORDERS4: "/orders4",
    SEARCH: "/search",
    USERS: "/users",
    REPORTS_EMPLOYEE: "/reports/employee",
    COMPANIES: "/companies",
    PRINT_TYPE: "/print-type",
    ALL_CATEGORY: "/all-category",
    OUTSOURCE: "/outsources",
    CATEGORIES: "/categories",
    HCM_CITY: "/city?city_id=10958",
    ALL_CITY: "/address",
    ASSIGN_ORDER: (id: number) => `orders/${id}/assign`,
    REJECT_ORDER: (id: number) => `orders/${id}/reject`,
    TOTAL_DEBIT: "/total-debit",
    CUSTOMER_DEBIT: "/customer-debit",
    REPORT_CUSTOMER: "/reports/customers",
    REPORT_CUSTOMER_DETAIL: (id: number) => `/reports/customers/${id}`,
    CREATE_ORDER: "/orders/create",
    REQUEST_UPLOAD_IMAGE: (id: number) => `/orders/${id}/uploads`,
    DELETE_IMAGE: (id: number) => `/orders/${id}/remove-image`,
    NOTIFICATION: "/notifications",
    //
    UPDATE_MULTI_ORDER_BY_STATUS: "/orders/batch",
    // Gom nhom don hang
    ORDER_GROUPS: "/orders/groups",
    UPDATE_ORDER_GROUPS: (idGroup: number) => `/orders/groups/${idGroup}`,
    // ds don hang theo khach hang
    GET_CUSTOMER_BY_ORDER_STATUS: `/orders/customers`,
    ORDER_BY_CUSTOMERS_ID: (idCustomer: number) =>
      `/orders/customers/${idCustomer}/groups`,
    // upload hình ảnh group
    REQUEST_UPLOAD_ORDER_GROUP_COMPLETE: (idGroup: number) =>
      `/orders/groups/${idGroup}/complete`,
    // Get ds group by order
    GET_LIST_GROUP_BY_ORDER: "/orders/group-poly",
  },
  LANGS_DEFAULT: "vi",
  ROLES: {
    ADMIN: "Admin",
    SALER: "Saler",
    DESIGNER: "Designer",
    PRINTER: "Printer",
    STORE: "Store",
    DELIVER: "Deliver",
    ACCOUNTANT: "Accountant",
    MANAGER: "Manager",
  },
  URL_IMG: "https://toantam-order-images.s3.amazonaws.com/",
};
export default appConstant;
