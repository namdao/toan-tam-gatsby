const appConstant = {
  ENV: {
    DEV: "http://localhost:5001",
    PROD: "https://api.inantoantam.com/",
  },
  API_URL: {
    SESSION: "/users/session",
    TOTAL_INPROGRESS: "/total-inprogress",
    ORDERS2: "/orders2",
    PAPER_TYPE: "/paper-type",
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
};
export default appConstant;
