import { IResponseType } from "constant/commonType";
import { format, startOfYear } from "date-fns";
import { isArray, isNumber } from "lodash";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { apiOrderConfirmList } from "../redux/api";
import {
  IOrder,
  IReqOrderListConfirm,
  IResOrderListCollect,
} from "../redux/types";
import { ISelectCustomer } from "../screens/OrderNeedConfirm/BlockFilter";

const startDateOfYear = startOfYear(new Date());
const currentDate = new Date();
export const useListOrderConfirm = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [customer, setCustomer] = useState<ISelectCustomer | null>(null);
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageModel, setPageModel] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 20 });
  const onOrderListConfirm = async (page = 1, pageSize = 20) => {
    try {
      setLoading(true);
      const payload: IReqOrderListConfirm = {
        start_date: format(startDateOfYear, "yyyy/MM/dd"),
        end_date: format(currentDate, "yyyy/MM/dd"),
        customer_id: customer ? customer.id : undefined,
        page: page,
        per_page: pageSize,
      };
      const result: IResponseType<IResOrderListCollect> =
        await apiOrderConfirmList(payload);
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
    total,
    pageModel,
    setPageModel,
  };
};
