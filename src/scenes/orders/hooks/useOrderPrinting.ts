import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { isArray, isNumber } from "lodash";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import {
  apiDonePrintOrder,
  apiOrderCategory,
  apiRejectOrder,
} from "../redux/api";
import {
  IOrderDetail,
  IReqOrderCategoryStatus,
  IReqPrintDoneOrder,
  IReqRejectOrder,
  IResOrderByCategory,
} from "../redux/types";

export type IPage = {
  page: number;
  pageSize: number;
};
export const useOrderPrinting = () => {
  const [orderList, setOrderList] = useState<IOrderDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [pageModel, setPageModel] = useState<IPage>({
    page: 0,
    pageSize: 20,
  });
  const { translate } = useLocales();
  const onOrderPrintingList = async (pageReqModel: IPage = pageModel) => {
    try {
      const payload: IReqOrderCategoryStatus = {
        status: ORDER_STATUS_NAME.PRINTING,
        order_by: "updated_time",
        page: pageReqModel.page,
        per_page: pageReqModel.pageSize,
        sort_direction: "desc",
      };
      const result: IResponseType<IResOrderByCategory> = await apiOrderCategory(
        payload
      );
      if (result?.data) {
        if (isNumber(result.data.total) && isArray(result.data.items)) {
          setOrderList(result.data.items);
          setTotal(result.data.total);
        }
      }
    } catch (error) {
      enqueueSnackbar(
        (error as Error)?.message || "onOrderPrintingList error",
        {
          variant: "error",
        }
      );
    }
  };

  const onNextPage = (page: number, pageSize: number) => {
    setPageModel({ page: page, pageSize });
    onOrderPrintingList({ page: page + 1, pageSize });
  };

  const onFinishOrder = async (id: number, data: IReqPrintDoneOrder) => {
    let status = true;
    try {
      setLoading(true);
      const result = await apiDonePrintOrder(id, data);
      if (result.data) {
        enqueueSnackbar(translate("orders.orderPrintingList.success.done"));
      } else {
        enqueueSnackbar(translate("orders.orderPrintingList.error.done"), {
          variant: "error",
        });
        status = false;
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onAcceptOrder error", {
        variant: "error",
      });
      status = false;
    } finally {
      setLoading(false);
    }
    return status;
  };
  const onRejectOrder = async (id: number, data: IReqRejectOrder) => {
    let status = true;
    setLoading(true);
    try {
      const result = await apiRejectOrder(id, data);
      if (result.data) {
        enqueueSnackbar(translate("orders.orderPrintingList.success.reject"));
      } else {
        enqueueSnackbar(translate("orders.orderPrintingList.error.reject"), {
          variant: "error",
        });
        status = false;
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onRejectOrder error", {
        variant: "error",
      });
      status = false;
    } finally {
      setLoading(false);
    }
    return status;
  };
  return {
    onOrderPrintingList,
    onNextPage,
    onFinishOrder,
    onRejectOrder,
    orderList,
    total,
    pageModel,
    loading,
  };
};
