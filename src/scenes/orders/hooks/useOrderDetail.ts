import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {
  apiOrderDetail,
  apiOrderDetailList,
  apiSendEmailOrder,
} from "../redux/api";
import { IOrderDetail, IResOrderListDetail } from "../redux/types";

export const useOrderDetail = (orderId: number) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orderDetail, setOrderDetail] = useState<IOrderDetail>();

  const { enqueueSnackbar } = useSnackbar();

  const onOrderDetail = async () => {
    try {
      setLoading(true);
      const result: IResponseType<IOrderDetail> = await apiOrderDetail(orderId);
      if (result?.data) {
        setOrderDetail(result.data);
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onOrderDetail error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    onOrderDetail,
    orderDetail,
  };
};

export const useOrderDetailList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();
  const [loading, setLoading] = useState<boolean>(false);
  const [orderListDetail, setOrderListDetail] = useState<IResOrderListDetail[]>(
    []
  );
  const onOrderListDetail = async (orderId: number[]) => {
    try {
      setLoading(true);
      const result: IResponseType<IResOrderListDetail[]> =
        await apiOrderDetailList({
          order_ids: orderId,
        });
      if (result?.data) {
        setOrderListDetail(result.data);
      } else {
        enqueueSnackbar(translate("orders.orderNeedCollect.error.printFail"), {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onOrderListDetail error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSendEmailWithOrderList = async (orderId: number[]) => {
    try {
      setLoading(true);
      const result: IResponseType<IResOrderListDetail[]> =
        await apiSendEmailOrder({
          order_ids: orderId,
        });
      if (result?.data) {
        enqueueSnackbar(translate("orders.orderNeedCollect.success.sendEmail"));
      } else {
        enqueueSnackbar(
          translate("orders.orderNeedCollect.error.sendEmailFail"),
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      enqueueSnackbar(
        (error as Error)?.message || "onSendEmailWithOrderList error",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const getOrdersDetailSimple = async (orderId: number[]) => {
    const result: IResponseType<IResOrderListDetail[]> =
      await apiOrderDetailList({
        order_ids: orderId,
      });
    return result.data;
  };
  return {
    onOrderListDetail,
    onSendEmailWithOrderList,
    loading,
    orderListDetail,
    getOrdersDetailSimple,
  };
};
