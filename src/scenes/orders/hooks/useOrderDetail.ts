import { IResponseType } from "constant/commonType";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { apiOrderDetail, apiOrderDetailList } from "../redux/api";
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
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onOrderListDetail error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    onOrderListDetail,
    loading,
    orderListDetail,
  };
};
