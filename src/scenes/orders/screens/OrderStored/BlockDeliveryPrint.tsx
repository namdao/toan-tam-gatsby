import { LoadingButton } from "@mui/lab";
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
import { useOrderDetailList } from "scenes/orders/hooks/useOrderDetail";
import DeliveryBill from "./Prints/DeliveryBill/DeliveryBill";
import DeliveryBillV2 from "./Prints/DeliveryBillV2/DeliveryBillV2";

export type IPropsDeliveryPrint = {
  disablePrintDelivery: () => void;
  disablePrintDeliveryV2: () => void;
  enablePrintDelivery: () => void;
  enablePrintDeliveryV2: () => void;
  setListIds: (ids: number[]) => void;
};
const BlockDeliveryPrint = React.forwardRef(
  (_props, ref: Ref<IPropsDeliveryPrint>) => {
    const { translate } = useLocales();
    const { loading, orderListDetail, onOrderListDetail } =
      useOrderDetailList();
    const deliveryRef = useRef(null);
    const deliveryRefV2 = useRef(null);
    const promiseResolveRef = useRef<{ triggerPrint: any }>({} as any);
    const [disablePrintDelivery, setDisablePrintDelivery] =
      useState<boolean>(true);
    const [disablePrintDeliveryV2, setDisablePrintDeliveryV2] =
      useState<boolean>(true);
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

    const actionParent = () => ({
      disablePrintDelivery: () => setDisablePrintDelivery(true),
      disablePrintDeliveryV2: () => setDisablePrintDeliveryV2(true),
      enablePrintDelivery: () => setDisablePrintDelivery(false),
      enablePrintDeliveryV2: () => setDisablePrintDeliveryV2(false),
      setListIds: (ids: number[]) => setOrderIds(ids),
    });
    useImperativeHandle(ref, actionParent);

    return (
      <Stack direction="row" spacing={3}>
        <LoadingButton
          variant="outlined"
          size="large"
          loading={loading}
          disabled={disablePrintDelivery}
          onClick={handlePrintDelivery}
        >
          {translate("orders.orderStore.btnBillDelivery")}
        </LoadingButton>
        <Button
          size="large"
          variant="outlined"
          disabled={disablePrintDeliveryV2}
          onClick={handlePrintDeliveryV2}
        >
          {translate("orders.orderStore.btnBillDelivery2")}
        </Button>
        <Box
          sx={{
            display: "none",
            position: "absolute",
            background: "red",
            top: 0,
            left: 10,
            zIndex: 999,
          }}
        >
          <DeliveryBill ref={deliveryRef} data={orderListDetail} />
          <DeliveryBillV2 ref={deliveryRefV2} data={orderListDetail} />
        </Box>
      </Stack>
    );
  }
);
export default BlockDeliveryPrint;
