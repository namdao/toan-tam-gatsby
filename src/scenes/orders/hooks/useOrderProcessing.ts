import { IResponseType } from "constant/commonType";
import { format } from "date-fns";
import { isArray } from "lodash";
import isNumber from "lodash/isNumber";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "store";
import {
  initParams,
  ORDER_STATUS_NAME,
  SEARCH_BY,
} from "../helper/OrderConstant";
import { apiOrderStatus, apiTotalInProgress } from "../redux/api";
import { ordersAction, OrdersSelector } from "../redux/slice";
import {
  IReqOrderStatus,
  IReqParams,
  IResOrder2Status,
  IResTotalDebigProgress,
} from "../redux/types";

export const useTotalMoneyProgress = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [moneyDebitProgress, setMoneyDebitProgress] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();

  const onTotalProcess = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IResTotalDebigProgress> =
        await apiTotalInProgress();
      if (
        result?.data &&
        isNumber(result.data.total_debit) &&
        isNumber(result.data.total_paid)
      ) {
        const totalDebit = result.data.total_debit - result.data.total_paid;
        setMoneyDebitProgress(totalDebit);
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onTotalProcess error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    moneyDebitProgress,
    onTotalProcess,
  };
};

export const useOrderAllStatus = (status: ORDER_STATUS_NAME) => {
  const dispatch = useAppDispatch();
  const dataFilter = useAppSelector(OrdersSelector.getFilterOrder);

  const onOrderWithStatus = async (page = 1, pageSize = 20) => {
    try {
      dispatch(ordersAction.requestOrderByStatus(status));
      const payload: IReqOrderStatus = {
        status,
        created_date: dataFilter.createDate
          ? format(dataFilter.createDate, "yyyy/MM/dd")
          : undefined,
        updated_date: dataFilter.updateDate
          ? format(dataFilter.updateDate, "yyyy/MM/dd")
          : undefined,
        search: dataFilter.search || undefined,
        search_by: dataFilter.type ?? initParams.search_by,
        page: page ?? dataFilter.page ?? initParams.page,
        per_page: pageSize ?? dataFilter.pageSize ?? initParams.per_page,
      };
      const result: IResponseType<IResOrder2Status> = await apiOrderStatus(
        payload
      );
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          const data = result.data;
          dispatch(
            ordersAction.requestOrderByStatusSuccess({
              status,
              total: data.total,
              list: data.items,
            })
          );
        }
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onOrderWithStatus error", {
        variant: "error",
      });
      dispatch(ordersAction.requestOrderByStatusFailed(status));
    }
  };

  const onNextPage = (page: number, pageSize: number) => {
    onOrderWithStatus(page + 1, pageSize);
  };
  return {
    onOrderWithStatus,
    onNextPage,
  };
};
