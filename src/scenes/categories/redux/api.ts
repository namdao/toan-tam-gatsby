import axios from "axios";
import appConstant from "constant/appConstant";
import { IReqCategory } from "./types";

const { API_URL } = appConstant;
export const apiGetAllCategory = () => axios.get(API_URL.ALL_CATEGORY);

export const apiAddCategory = (body: IReqCategory) =>
  axios.post(API_URL.CATEGORIES, body);
export const apiUpdateCategory = (id: number, body: IReqCategory) =>
  axios.put(`${API_URL.CATEGORIES}/${id}`, body);
export const apiDeleteCategory = (id: number) =>
  axios.delete(`${API_URL.CATEGORIES}/${id}`);
