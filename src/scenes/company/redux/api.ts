import axios from "axios";
import appConstant from "constant/appConstant";
import { ICompany } from "constant/commonType";
import { IReqAddCompany } from "./types";

const { API_URL } = appConstant;
export const apiGetListCompanies = (signal: AbortSignal) =>
  axios.get(API_URL.COMPANIES, { signal });

export const apiAddCompanies = (data: IReqAddCompany) =>
  axios.post(API_URL.COMPANIES, data);

export const apiUpdateCompanies = (id: number, data: IReqAddCompany) =>
  axios.put(`${API_URL.COMPANIES}/${id}`, data);
