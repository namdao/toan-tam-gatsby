import axios from "axios";
import appConstant from "constant/appConstant";

export const apiGetPaperList = () => axios.get(appConstant.API_URL.PAPER_TYPE);
