import { IResponseType } from "constant/commonType";
import format from "date-fns/format";
import { isArray, isNumber } from "lodash";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useState } from "react";
import { apiOrderListReceivable, apiTotalReceivables } from "../redux/api";
import {
  IOrder,
  IReqOrderListCollect,
  IResOrderListCollect,
  IResTotalReceive,
} from "../redux/types";
import { ISelectCustomer } from "../screens/OrderNeedCollect/BlockFilter";

export const useTotalMoneyReceive = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [moneyReceive, setMoneyReceive] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();

  const onTotalReceive = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IResTotalReceive> =
        await apiTotalReceivables();
      if (
        result?.data &&
        isNumber(result.data.total_debit) &&
        isNumber(result.data.total_paid)
      ) {
        const totalDebit = result.data.total_debit - result.data.total_paid;
        setMoneyReceive(totalDebit);
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onTotalReceive error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    moneyReceive,
    onTotalReceive,
  };
};

export const useListOrderColect = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [customer, setCustomer] = useState<ISelectCustomer | null>(null);
  const [createdDate, setDateCreated] = useState<Date | null>(null);
  const [updatedDate, setDateUpdated] = useState<Date | null>(null);
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageModel, setPageModel] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 20 });
  const onOrderListCollect = async (page = 1, pageSize = 20) => {
    try {
      setLoading(true);
      const payload: IReqOrderListCollect = {
        created_date: createdDate
          ? format(createdDate, "yyyy/MM/dd")
          : undefined,
        updated_date: updatedDate
          ? format(updatedDate, "yyyy/MM/dd")
          : undefined,
        customer_id: customer ? customer.id : undefined,
        page: page,
        per_page: pageSize,
      };
      const result: IResponseType<IResOrderListCollect> =
        await apiOrderListReceivable(payload);
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          setOrderList(result.data.items);
          setTotal(result.data.total);
        }
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onOrderListCollect error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onNextPage = (page: number, pageSize: number) => {
    onOrderListCollect(page + 1, pageSize);
    setPageModel({ page, pageSize });
  };
  return {
    onOrderListCollect,
    onNextPage,
    customer,
    loading,
    orderList,
    setCustomer,
    setDateCreated,
    setDateUpdated,
    total,
    createdDate,
    updatedDate,
    pageModel,
    setPageModel,
  };
};
