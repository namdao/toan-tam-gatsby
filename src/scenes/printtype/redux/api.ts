import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqPrintType } from "./types";

const { API_URL } = appConstant;
export const apiGetPrintType = () => axios.get(API_URL.PRINT_TYPE);
export const apiAddPrintType = (body: IReqPrintType) =>
  axios.post(appConstant.API_URL.PRINT_TYPE, body);
export const apiUpdatePrintType = (id: number, body: IReqPrintType) =>
  axios.put(`${appConstant.API_URL.PRINT_TYPE}/${id}`, body);

export const apiDeletePrintType = (id: number) =>
  axios.delete(`${appConstant.API_URL.PRINT_TYPE}/${id}`);
