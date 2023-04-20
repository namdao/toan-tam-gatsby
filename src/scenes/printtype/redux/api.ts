import axios from "axios";
import appConstant from "constant/appConstant";

const { API_URL } = appConstant;
export const apiGetPrintType = () => axios.get(API_URL.PRINT_TYPE);
