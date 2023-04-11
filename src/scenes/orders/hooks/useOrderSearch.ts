import { IResponseType } from "constant/commonType";
import { format } from "date-fns";
import { isArray, isNumber } from "lodash";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { apiOrderSearch } from "../redux/api";
import { IOrder, IReqOrderSearch, IResOrderListCollect } from "../redux/types";
import { ISelect } from "../screens/OrderSearch/BlockFilter";

export const useOrderSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<ISelect | null>(null);
  const [method, setMethod] = useState<string>("");
  const [orderName, setOrderName] = useState<string>("");
  const [paperName, setPaperName] = useState<ISelect | null>(null);
  const [orderList, setOrderList] = useState<IOrder[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageModel, setPageModel] = useState<{
    page: number;
    pageSize: number;
  }>({ page: 0, pageSize: 20 });
  const onSearchOrder = async (page = 1, pageSize = 20) => {
    try {
      setLoading(true);
      const payload: IReqOrderSearch = {
        customer_id: customer ? customer.id : undefined,
        method,
        order_name: orderName,
        paper: paperName?.label,
        page: page,
        per_page: pageSize,
      };
      const result: IResponseType<IResOrderListCollect> = await apiOrderSearch(
        payload
      );
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          let timeCreate = format(new Date(), "dd/MM/yyyy");
          let isNotSame = false;
          const dataMap = result.data.items.map((e) => {
            const parseTime = format(e.created_time * 1000, "dd/MM/yyyy");
            if (timeCreate !== parseTime) {
              timeCreate = parseTime;
              isNotSame = true;
            } else {
              isNotSame = false;
            }
            const groupTime = !isNotSame
              ? [timeCreate, e.order_no]
              : [parseTime];
            return {
              group: groupTime,
              ...e,
            };
          });
          setOrderList(dataMap);
          setTotal(result.data.total);
        }
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onSearchOrder error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onNextPage = (page: number, pageSize: number) => {
    onSearchOrder(page + 1, pageSize);
    setPageModel({ page, pageSize });
  };
  return {
    onSearchOrder,
    onNextPage,
    customer,
    loading,
    orderList,
    orderName,
    paperName,
    method,
    setCustomer,
    setOrderName,
    setPaperName,
    total,
    setOrderList,
    setMethod,
    pageModel,
    setPageModel,
  };
};
