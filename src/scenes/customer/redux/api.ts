import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqAddCustomer } from "./types";

const { API_URL } = appConstant;
export const apiGetListCustomer = () =>
  axios.get(API_URL.CUSTOMERS, { params: { per_page: 2000 } });

export const apiAddCustomer = (data: IReqAddCustomer) =>
  axios.post(API_URL.CUSTOMERS, data);
export const apiUpdateCustomer = (id: number, data: IReqAddCustomer) =>
  axios.put(`${API_URL.CUSTOMERS}/${id}`, data);
