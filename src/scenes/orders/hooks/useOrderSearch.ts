import { IResponseType } from "constant/commonType";
import { format } from "date-fns";
import { groupBy, isArray, isNumber } from "lodash";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import { apiOrderSearch } from "../redux/api";
import { IOrder, IReqOrderSearch, IResOrderListCollect } from "../redux/types";
import { ISelect } from "../screens/OrderSearch/BlockFilter";

type IGroupOrder = IOrder & {
  group: string[];
  createdTime: string;
};
export const useOrderSearch = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<ISelect | null>(null);
  const [method, setMethod] = useState<string>("");
  const [orderName, setOrderName] = useState<string>("");
  const [orderNo, setOrderNo] = useState<string>("");
  const [paperName, setPaperName] = useState<ISelect | null>(null);
  const [orderList, setOrderList] = useState<IGroupOrder[]>([]);
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
        order_no: orderNo,
        paper: paperName?.label,
        page: page,
        per_page: pageSize,
      };
      const result: IResponseType<IResOrderListCollect> = await apiOrderSearch(
        payload
      );
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          // Filter order without status cancel and Convert timeStamp to date time
          const convertCreatedTime = result.data.items
            .filter((f) => f.status !== ORDER_STATUS_NAME.CANCEL)
            .map((e) => {
              const parseTime = format(e.created_time * 1000, "dd/MM/yyyy");
              return {
                ...e,
                createdTime: parseTime,
              };
            });
          // group by datetime
          const groupByTimeCreate = Object.entries(
            groupBy(convertCreatedTime, "createdTime")
          );

          const dataMap: IGroupOrder[] = [];
          groupByTimeCreate.forEach((e) => {
            const dataKey = e[0];
            const dataBykey = e[1];
            dataBykey.forEach((dt, index) => {
              const row = {
                group: [dataKey],
                ...dt,
              };
              if (index !== 0) {
                row.group = [dataKey, dt.order_no];
              }

              dataMap.push(row);
            });
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
    setOrderNo,
    orderNo,
    total,
    setOrderList,
    setMethod,
    pageModel,
    setPageModel,
  };
};
