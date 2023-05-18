import { IResponseType } from "constant/commonType";
import { format } from "date-fns";
import { isArray } from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { apiRevenueCustomer } from "../redux/api";
import {
  IReportRevenue,
  IReqReportRevenue,
  IResReportRevenue,
} from "../redux/type";

export type Ipage = {
  page: number;
  pageSize: number;
};
export const useRevenueCompany = () => {
  const [dataRevenue, setDataRevenue] = useState<IReportRevenue[]>([]);
  const [pageModel, setPageModel] = useState<Ipage>({ page: 0, pageSize: 20 });
  const [total, setTotal] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const getRevenueByMoney = async (
    money = 0,
    date_from: Date,
    date_to: Date
  ) => {
    try {
      const payload: IReqReportRevenue = {
        page: 1,
        per_page: 10,
        money,
        date_from: format(date_from, "yyyy-MM-dd"),
        date_to: format(date_to, "yyyy-MM-dd"),
      };
      const result: IResponseType<IResReportRevenue> = await apiRevenueCustomer(
        payload
      );
      if (result.data && isArray(result.data.items)) {
        setDataRevenue(result.data.items);
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "getRevenueByMoney error", {
        variant: "error",
      });
    }
  };
  const getRevenueByList = async (
    date_from: Date,
    date_to: Date,
    page: Ipage = {
      page: 1,
      pageSize: 20,
    }
  ) => {
    try {
      const payload: IReqReportRevenue = {
        page: page.page,
        per_page: page.pageSize,
        money: 0,
        date_from: format(date_from, "yyyy-MM-dd"),
        date_to: format(date_to, "yyyy-MM-dd"),
      };
      const result: IResponseType<IResReportRevenue> = await apiRevenueCustomer(
        payload
      );
      if (result.data && isArray(result.data.items)) {
        setDataRevenue(result.data.items);
        setTotal(result.data.total);
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "getRevenueByMoney error", {
        variant: "error",
      });
    }
  };

  const onNextPage = (date_from: Date, date_to: Date, pageModel: Ipage) => {
    const nextPage = {
      ...pageModel,
      page: pageModel.page + 1,
    };
    setPageModel(nextPage);
    getRevenueByList(date_from, date_to, nextPage);
  };
  return {
    dataRevenue,
    pageModel,
    total,
    getRevenueByMoney,
    onNextPage,
    getRevenueByList,
  };
};
