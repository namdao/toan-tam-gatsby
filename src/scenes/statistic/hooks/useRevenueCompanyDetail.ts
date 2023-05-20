import { IResponseType } from "constant/commonType";
import { format } from "date-fns";
import { isArray } from "lodash";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { IOrder, IResOrder2Status } from "scenes/orders/redux/types";
import { apiRevenueCustomerDetail } from "../redux/api";
import { IReqReportRevenueDetail } from "../redux/type";

export type Ipage = {
  page: number;
  pageSize: number;
};
export const useRevenueCompanyDetail = (companyId: number) => {
  const [dataRevenue, setDataRevenue] = useState<IOrder[]>([]);
  const [pageModel, setPageModel] = useState<Ipage>({ page: 0, pageSize: 20 });
  const [total, setTotal] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();

  const getRevenueByList = async (
    date_from: string,
    date_to: string,
    page: Ipage = {
      page: 1,
      pageSize: 20,
    }
  ) => {
    try {
      const payload: IReqReportRevenueDetail = {
        page: page.page,
        per_page: page.pageSize,
        date_from,
        date_to,
      };
      const result: IResponseType<IResOrder2Status> =
        await apiRevenueCustomerDetail(companyId, payload);
      if (result.data && isArray(result.data.items)) {
        setDataRevenue(result.data.items);
        setTotal(result.data.total);
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "getRevenueByList error", {
        variant: "error",
      });
    }
  };

  const onNextPage = (dateFrom: string, dateTo: string, pageModel: Ipage) => {
    const nextPage = {
      ...pageModel,
      page: pageModel.page + 1,
    };
    setPageModel(nextPage);
    getRevenueByList(dateFrom, dateTo, nextPage);
  };
  return {
    dataRevenue,
    pageModel,
    total,
    onNextPage,
    getRevenueByList,
  };
};
