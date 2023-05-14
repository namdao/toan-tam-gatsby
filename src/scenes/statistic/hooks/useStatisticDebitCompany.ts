import { IResponseType } from "constant/commonType";
import { isArray, isNumber } from "lodash";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import { IOrder, IResOrderListCollect } from "scenes/orders/redux/types";
import { apiOrderLisDetailCompanyDebit } from "../redux/api";
import { IReqCompanyDebitDetail } from "../redux/type";

export const useStatisticDebitCompany = (companyId: number) => {
  const [pageModel, setPageModel] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 20 });
  const { enqueueSnackbar } = useSnackbar();
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const onGetOrdetListDebitByCompany = async () => {
    try {
      const payload: IReqCompanyDebitDetail = {
        status: ORDER_STATUS_NAME.DONE,
        page: pageModel.page + 1,
        per_page: pageModel.pageSize,
        company_id: companyId,
        debt: true,
        done: false,
        need_check: false,
        search_by: "all",
      };
      const result: IResponseType<IResOrderListCollect> =
        await apiOrderLisDetailCompanyDebit(payload);
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          setOrderList(result.data.items);
          setTotal(result.data.total);
        }
      }
    } catch (error) {
      enqueueSnackbar(
        (error as Error)?.message || "onGetOrdetListDebitByCompany error",
        {
          variant: "error",
        }
      );
    }
  };

  useEffect(() => {
    onGetOrdetListDebitByCompany();
  }, [pageModel]);

  const onNextPage = (page: number, pageSize: number) => {
    setPageModel({ page, pageSize });
  };
  return {
    onGetOrdetListDebitByCompany,
    orderList,
    total,
    pageModel,
    onNextPage,
  };
};
