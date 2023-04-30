import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqPaper } from "./types";

export const apiGetPaperList = () => axios.get(appConstant.API_URL.PAPER_TYPE);

export const apiAddPaper = (body: IReqPaper) =>
  axios.post(appConstant.API_URL.PAPER_TYPES, body);
export const apiUpdatePaper = (id: number, body: IReqPaper) =>
  axios.put(`${appConstant.API_URL.PAPER_TYPES}/${id}`, body);

export const apiDeletePaper = (id: number) =>
  axios.delete(`${appConstant.API_URL.PAPER_TYPES}/${id}`);
