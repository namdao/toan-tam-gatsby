import axios from "axios";
import appConstant from "constant/appConstant";

const { API_URL } = appConstant;

export const apiGetTotalDebit = () => axios.get(API_URL.TOTAL_DEBIT);
export const apiGetListCustomerDebit = () =>
  axios.get(`${API_URL.CUSTOMER_DEBIT}?per_page=500`);
