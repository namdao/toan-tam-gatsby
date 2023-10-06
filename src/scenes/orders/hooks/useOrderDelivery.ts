import { IResponseType } from "constant/commonType";
import { useLocales } from "locales";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";
import { apiOrderUpdate, apiUpdateMultiOrderByOrderStatus } from "../redux/api";
import {
  IReqOrderDelivery,
  IRequestUpdateOrder,
  IReqUpdateMultiOrder,
  IResUpdateOrder,
} from "../redux/types";

export const useOrderDelivery = () => {
  const { translate } = useLocales();
  const [loading, setLoading] = useState<boolean>(false);

  const onUpdateMultiOrderDelivery = async (
    payload: IReqOrderDelivery,
    orderIds: number[],
    callback: ({ statusSuccess }: { statusSuccess: boolean }) => void
  ) => {
    let isSuccess = true;
    try {
      setLoading(true);
      for (let i = 0; i <= orderIds.length - 1; i++) {
        const result: IResponseType<IResUpdateOrder> = await apiOrderUpdate(
          orderIds[i],
          payload
        );
        if (!result.data) {
          isSuccess = false;
          enqueueSnackbar(
            translate("orders.orderUpdate.error.orderProcessing"),
            {
              variant: "error",
            }
          );
          break;
        }
      }
      if (isSuccess) {
        enqueueSnackbar(translate("orders.orderStore.messageDeliverSuccess"));
      }
    } catch (error) {
      enqueueSnackbar(
        (error as Error)?.message || "onUpdateMultiOrderDelivery error",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
      callback({ statusSuccess: isSuccess });
    }
  };

  // Update chi status, note
  const onUpdateMultiOrderGeneral = async (
    payload: IReqUpdateMultiOrder,
    callback: ({ statusSuccess }: { statusSuccess: boolean }) => void
  ) => {
    let isSuccess = true;
    try {
      setLoading(true);
      const result: IResponseType<IResUpdateOrder> =
        await apiUpdateMultiOrderByOrderStatus(payload);
      if (!result.data) {
        isSuccess = false;
        enqueueSnackbar(translate("orders.orderUpdate.error.orderProcessing"), {
          variant: "error",
        });
      } else if (isSuccess) {
        enqueueSnackbar(translate("orders.orderStore.messageDeliverSuccess"));
      }
    } catch (error) {
      isSuccess = false;
      enqueueSnackbar(
        (error as Error)?.message || "rejectMultiOrderDelivery error",
        {
          variant: "error",
        }
      );
    } finally {
      setLoading(false);
      callback({ statusSuccess: isSuccess });
    }
  };
  return {
    onUpdateMultiOrderDelivery,
    onUpdateMultiOrderGeneral,
    loading,
  };
};
