import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqCompanyDebitDetail, IReqReportRevenue } from "./type";

const { API_URL } = appConstant;

export const apiGetTotalDebit = () => axios.get(API_URL.TOTAL_DEBIT);
export const apiGetListCustomerDebit = () =>
  axios.get(`${API_URL.CUSTOMER_DEBIT}?per_page=500`);
export const apiOrderLisDetailCompanyDebit = (params: IReqCompanyDebitDetail) =>
  axios.get(API_URL.ORDERS3, {
    params,
  });
export const apiRevenueCustomer = (params: IReqReportRevenue) =>
  axios.get(API_URL.REPORT_CUSTOMER, { params });
