import { IResponseType } from "constant/commonType";
import isNumber from "lodash/isNumber";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useState } from "react";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import { apiOrderStatus, apiTotalInProgress } from "../redux/api";
import {
  IOrder,
  IReqOrderStatus,
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

export const useTotalOrderAllStatus = (status: typeof ORDER_STATUS_NAME) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [totalOrder, setTotalOrder] = useState<number>(0);
  const [listOrder, setListOrder] = useState<IOrder[]>([]);
  const onOrderWithStatus = async () => {
    try {
      setLoading(true);
      const payload: IReqOrderStatus = {
        status: status,
        page: 1,
        per_page: 20,
        search_by: "all",
      };
      const result: IResponseType<IResOrder2Status> = await apiOrderStatus(
        payload
      );
      if (result?.data) {
        if (isNumber(result.data.total)) {
          setTotalOrder(result.data.total);
        }
        if (result.data.item) {
          setListOrder(result.data.item);
        }
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onOrderWithStatus error");
    } finally {
      setLoading(false);
    }
  };
  return {
    loading,
    totalOrder,
    listOrder,
    onOrderWithStatus,
  };
};
