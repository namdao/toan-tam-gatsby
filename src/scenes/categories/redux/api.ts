import axios from "axios";
import appConstant from "constant/appConstant";

const { API_URL } = appConstant;
export const apiGetAllCategory = () => axios.get(API_URL.ALL_CATEGORY);
