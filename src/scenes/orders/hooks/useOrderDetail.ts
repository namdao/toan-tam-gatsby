import { IResponseType } from "constant/commonType";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { apiOrderDetail } from "../redux/api";
import { IOrderDetail } from "../redux/types";

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
      enqueueSnackbar((error as Error)?.message || "onOrderDetail error");
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
