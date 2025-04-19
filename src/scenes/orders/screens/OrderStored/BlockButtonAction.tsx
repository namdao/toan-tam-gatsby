import { Box, Button, Stack } from "@mui/material";
import { useLocales } from "locales";
import React, {
  Ref,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useReactToPrint } from "react-to-print";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import { useOrderDelivery } from "scenes/orders/hooks/useOrderDelivery";
import { useOrderDetailList } from "scenes/orders/hooks/useOrderDetail";
import { IReqUpdateMultiOrder } from "scenes/orders/redux/types";
import { useAppSelector } from "store";
import DiaLogDelivery, { magicOrderDeliveryRef } from "./DialogDelivery";
import DeliveryBill from "./Prints/DeliveryBill/DeliveryBill";
import DeliveryBillV2 from "./Prints/DeliveryBillV2/DeliveryBillV2";
import { AuthSelector } from "scenes/auth/redux/slice";
import { LoadingButton } from "@mui/lab";
import RetailBillV2 from "./Prints/RetailBill/RetailBillV2";

export type IPropsDeliveryPrint = {
  disablePrintDelivery: () => void;
  disablePrintDeliveryV2: () => void;
  enablePrintDelivery: () => void;
  enablePrintDeliveryV2: () => void;
  disableBtnDelivery: () => void;
  enableBtnDelivery: () => void;
  disableBtnDone: () => void;
  enableBtnDone: () => void;
  setListIds: (ids: number[]) => void;
};
type IProps = {
  status: ORDER_STATUS_NAME;
  onRefreshList: () => void;
};
const BlockButtonAction = React.forwardRef(
  ({ status, onRefreshList }: IProps, ref: Ref<IPropsDeliveryPrint>) => {
    const { translate } = useLocales();
    const { loading, orderListDetail, onOrderListDetail } =
      useOrderDetailList();
    const { onUpdateMultiOrderGeneral, loading: loadingOrderDone } =
      useOrderDelivery();
    const profile = useAppSelector(AuthSelector.getProfile);
    const deliveryRef = useRef(null);
    const deliveryRefV2 = useRef(null);
    const retailBillRef = useRef(null);
    const promiseResolveRef = useRef<{ triggerPrint: any }>({} as any);
    const [disablePrintDelivery, setDisablePrintDelivery] =
      useState<boolean>(true);
    const [disablePrintDeliveryV2, setDisablePrintDeliveryV2] =
      useState<boolean>(true);
    const [disableBtnGroupDelivery, setDisableBtnDelivery] =
      useState<boolean>(true);
    const [disableRetailBill, setDisableRetailBill] = useState<boolean>(true);
    const [disableBtnGroupDone, setDisableBtnDone] = useState<boolean>(true);
    const [orderIds, setOrderIds] = useState<number[]>([]);

    useEffect(() => {
      if (!loading && orderListDetail?.length > 0) {
        promiseResolveRef && promiseResolveRef?.current?.triggerPrint();
      }
    }, [orderListDetail, loading]);

    const handlePrintDelivery = useReactToPrint({
      content: () => deliveryRef.current,
      onBeforeGetContent: () => {
        return new Promise((resolve) => {
          if (promiseResolveRef) {
            promiseResolveRef.current.triggerPrint = resolve;
            onOrderListDetail(orderIds);
          }
        });
      },
    });
    const handlePrintDeliveryV2 = useReactToPrint({
      content: () => deliveryRefV2.current,
      onBeforeGetContent: () => {
        return new Promise((resolve) => {
          if (promiseResolveRef) {
            promiseResolveRef.current.triggerPrint = resolve;
            onOrderListDetail(orderIds);
          }
        });
      },
    });
    const handlePrintRetailBillV2 = useReactToPrint({
      content: () => retailBillRef.current,
      onBeforeGetContent: () => {
        return new Promise((resolve) => {
          if (promiseResolveRef) {
            promiseResolveRef.current.triggerPrint = resolve;
            onOrderListDetail(orderIds);
          }
        });
      },
    });

    useEffect(() => {
      console.log("useEffect", orderIds);
      if (orderIds?.length > 1 || orderIds?.length === 0) {
        setDisableRetailBill(true);
      } else {
        setDisableRetailBill(false);
      }
    }, [orderIds]);

    const callbackSubmit = ({ statusSuccess }: { statusSuccess: boolean }) => {
      if (statusSuccess) {
        onRefreshList();
      }
    };

    const onDoneOrder = () => {
      const data: IReqUpdateMultiOrder = {
        notes: translate("orders.orderStore.messageDone", {
          name: profile.userName,
        }),
        status: ORDER_STATUS_NAME.DONE,
        order_ids: orderIds,
      };
      onUpdateMultiOrderGeneral(data, callbackSubmit);
    };

    const openDialogDelivery = () =>
      magicOrderDeliveryRef.current?.onOpen(orderIds);
    const openDialogReject = () =>
      magicOrderDeliveryRef.current?.onOpen(orderIds, true);

    const actionParent = () => ({
      disablePrintDelivery: () => setDisablePrintDelivery(true),
      disablePrintDeliveryV2: () => setDisablePrintDeliveryV2(true),
      enablePrintDelivery: () => setDisablePrintDelivery(false),
      enablePrintDeliveryV2: () => setDisablePrintDeliveryV2(false),
      disableBtnDelivery: () => setDisableBtnDelivery(true),
      enableBtnDelivery: () => setDisableBtnDelivery(false),
      disableBtnDone: () => setDisableBtnDone(true),
      enableBtnDone: () => setDisableBtnDone(false),
      setListIds: (ids: number[]) => setOrderIds(ids),
    });

    useImperativeHandle(ref, actionParent);

    return (
      <Stack direction="row" spacing={3}>
        {status === ORDER_STATUS_NAME.STORED && (
          <>
            <Button
              variant="outlined"
              color="error"
              size="large"
              disabled={disableBtnGroupDelivery}
              onClick={openDialogReject}
            >
              {translate("orders.orderStore.cancel")}
            </Button>
            <Button
              variant="outlined"
              size="large"
              disabled={disableBtnGroupDelivery}
              onClick={openDialogDelivery}
            >
              {translate("orders.orderStore.confirmDelivery")}
            </Button>
          </>
        )}
        {status === ORDER_STATUS_NAME.DELIVER && (
          <>
            <Button
              variant="outlined"
              color="error"
              size="large"
              disabled={disableBtnGroupDone}
              onClick={openDialogReject}
            >
              {translate("orders.orderStore.cancelDelivery")}
            </Button>
            <LoadingButton
              variant="outlined"
              size="large"
              loading={loadingOrderDone}
              disabled={disableBtnGroupDone || loadingOrderDone}
              onClick={onDoneOrder}
            >
              {translate("orders.orderStore.done")}
            </LoadingButton>
          </>
        )}
        <Button
          variant="outlined"
          size="large"
          disabled={disableRetailBill || loading}
          onClick={handlePrintRetailBillV2}
        >
          {translate("orders.orderStore.btnRetailBill")}
        </Button>
        <Button
          variant="outlined"
          size="large"
          disabled={disablePrintDelivery || loading}
          onClick={handlePrintDelivery}
        >
          {translate("orders.orderStore.btnBillDelivery")}
        </Button>
        <Button
          size="large"
          variant="outlined"
          disabled={disablePrintDeliveryV2 || loading}
          onClick={handlePrintDeliveryV2}
        >
          {translate("orders.orderStore.btnBillDelivery2")}
        </Button>
        <Box
          sx={{
            display: "none",
            position: "absolute",
            top: 0,
            left: 10,
            zIndex: 999,
          }}
        >
          <DeliveryBill ref={deliveryRef} data={orderListDetail} />
          <DeliveryBillV2 ref={deliveryRefV2} data={orderListDetail} />
          <RetailBillV2 ref={retailBillRef} data={orderListDetail} />
        </Box>
        <DiaLogDelivery onRefreshList={onRefreshList} status={status} />
      </Stack>
    );
  }
);
export default BlockButtonAction;
