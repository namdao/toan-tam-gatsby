import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqAddOutSource } from "./types";

export const apiGetOutSourceList = () =>
  axios.get(appConstant.API_URL.OUTSOURCE);

export const apiAddOutSource = (body: IReqAddOutSource) =>
  axios.post(appConstant.API_URL.OUTSOURCE, body);
export const apiUpdateOutSource = (id: number, body: IReqAddOutSource) =>
  axios.put(`${appConstant.API_URL.OUTSOURCE}/${id}`, body);

export const apiDeleteOutSource = (id: number) =>
  axios.delete(`${appConstant.API_URL.OUTSOURCE}/${id}`);
