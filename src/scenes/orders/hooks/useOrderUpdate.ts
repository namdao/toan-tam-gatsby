import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { apiOrderUpdate } from "../redux/api";
import { IRequestUpdateOrder, IResUpdateOrder } from "../redux/types";

export const useOrderUpdate = (orderId: number) => {
  const { translate } = useLocales();
  const [loading, setLoading] = useState<boolean>(false);
  const onUpdateOrder = async (
    payload: IRequestUpdateOrder,
    callbackSuccess: () => void
  ) => {
    try {
      setLoading(true);
      const result: IResponseType<IResUpdateOrder> = await apiOrderUpdate(
        orderId,
        payload
      );
      if (result.data) {
        callbackSuccess();
        enqueueSnackbar(
          translate("orders.orderUpdate.success.orderProcessing")
        );
      } else {
        enqueueSnackbar(translate("orders.orderUpdate.error.orderProcessing"), {
          variant: "error",
        });
      }
    } catch (error) {
      enqueueSnackbar((error as Error)?.message || "onOrderWithStatus error", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    onUpdateOrder,
    loading,
  };
};
