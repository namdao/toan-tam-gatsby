import { IResponseType } from "constant/commonType";
import { isArray } from "lodash";
import isNumber from "lodash/isNumber";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useState } from "react";
import { useAppDispatch } from "store";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import { apiOrderStatus, apiTotalInProgress } from "../redux/api";
import { ordersAction } from "../redux/slice";
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
  const onOrderWithStatus = async (dataRequest: IReqParams) => {
    try {
      dispatch(ordersAction.requestOrderByStatus(status));
      const payload: IReqOrderStatus = {
        status,
        ...dataRequest,
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

  const onNextPage = (payload: IReqParams) => {
    const data: IReqParams = {
      ...payload,
      page: payload.page + 1,
    };
    onOrderWithStatus(data);
  };
  return {
    onOrderWithStatus,
    onNextPage,
  };
};
