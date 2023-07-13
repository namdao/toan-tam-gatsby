import { IResponseType } from "constant/commonType";
import { format, startOfYear } from "date-fns";
import { isArray, isNumber } from "lodash";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "store";
import {
  IOrderTabNeedConfirm,
  ORDER_TAB_NEED_CONFIRM,
} from "../helper/OrderConstant";
import { apiOrderConfirmList } from "../redux/api";
import { OrdersSelector, ordersAction } from "../redux/slice";
import {
  IOrder,
  IReqOrderListConfirm,
  IResOrderListCollect,
} from "../redux/types";
import { ISelectCustomer } from "../screens/OrderNeedConfirm/BlockFilter";

const startDateOfYear = startOfYear(new Date("2023/01/01"));
const currentDate = new Date();
export const useListOrderConfirm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [customer, setCustomer] = useState<ISelectCustomer | null>(null);
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const dispatch = useAppDispatch();
  const totalMoneySource = useAppSelector(OrdersSelector.getTotalMoneySource);

  const [pageModel, setPageModel] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 20 });
  const [moneySource, setMoneySource] = useState<IOrderTabNeedConfirm>(
    ORDER_TAB_NEED_CONFIRM[0]
  );
  const onOrderListConfirm = async (page = 1, pageSize = 20) => {
    try {
      setLoading(true);
      const payload: IReqOrderListConfirm = {
        start_date: format(startDateOfYear, "yyyy/MM/dd"),
        end_date: format(currentDate, "yyyy/MM/dd"),
        customer_id: customer ? customer.id : undefined,
        page: page,
        per_page: pageSize,
        money_source: moneySource.value,
      };
      const result: IResponseType<IResOrderListCollect> =
        await apiOrderConfirmList(payload);
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          setOrderList(result.data.items);
          dispatch(
            ordersAction.setTotalTabSource({
              source: moneySource.value,
              total: result.data.total,
            })
          );
          // setTotal({ ...total, [moneySource.value]: result.data.total });
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
  const onOrderListConfirmByMoneySource = async (source: string) => {
    try {
      setLoading(true);
      const payload: IReqOrderListConfirm = {
        start_date: format(startDateOfYear, "yyyy/MM/dd"),
        end_date: format(currentDate, "yyyy/MM/dd"),
        customer_id: customer ? customer.id : undefined,
        page: 1,
        per_page: 20,
        money_source: source,
      };
      const result: IResponseType<IResOrderListCollect> =
        await apiOrderConfirmList(payload);
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          setOrderList(result.data.items);
          dispatch(
            ordersAction.setTotalTabSource({ source, total: result.data.total })
          );
          // setTotal({ ...total, [source]: result.data.total });
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
    onOrderListConfirm(page + 1, pageSize);
    setPageModel({ page, pageSize });
  };

  return {
    onOrderListConfirm,
    onNextPage,
    customer,
    loading,
    orderList,
    setCustomer,
    totalMoneySource,
    pageModel,
    setPageModel,
    setMoneySource,
    moneySource,
    setOrderList,
    onOrderListConfirmByMoneySource,
  };
};
