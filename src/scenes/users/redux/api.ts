import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqEmployeeReport } from "./types";
const { API_URL } = appConstant;
export const apiGetUserList = () => axios.get(API_URL.USERS);

export const apiGetReportEmployee = (params: IReqEmployeeReport) =>
  axios.get(API_URL.REPORTS_EMPLOYEE, { params });
