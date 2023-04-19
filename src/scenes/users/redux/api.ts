import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqEmployeeReport, IReqUpdateUser, IReqAddUser } from "./types";
const { API_URL } = appConstant;
export const apiGetUserList = () => axios.get(API_URL.USERS);

export const apiGetReportEmployee = (
  params: IReqEmployeeReport,
  signal: AbortSignal
) => axios.get(API_URL.REPORTS_EMPLOYEE, { params, signal });

export const apiUpdateUser = (idUser: number, payload: IReqUpdateUser) =>
  axios.put(`${API_URL.USERS}/${idUser}`, payload);
export const apiAddUser = (payload: IReqAddUser) =>
  axios.post(API_URL.USERS, payload);
