import axios from "axios";
import appConstant from "constant/appConstant";

const { API_URL } = appConstant;
export const apiGetListCustomer = () =>
  axios.get(API_URL.CUSTOMERS, { params: { per_page: 2000 } });
