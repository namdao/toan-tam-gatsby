import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogTitle,
  Stack,
} from "@mui/material";
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
import PrintOrdersV2 from "./PrintOrdersV2";
import BlockFormOrderNeedCollect from "../OrderUpdate/BlockFormOrderNeedCollect";
import { IOrderDetail } from "scenes/orders/redux/types";

export type IPropsPrint = {
  disablePrintPdf: () => void;
  disableSendEmail: () => void;
  disablePayment: () => void;
  enablePrintPdf: () => void;
  enableSendEmail: () => void;
  enablePayment: () => void;
  setListIds: (ids: number[]) => void;
};
const BlockPrintAndSendEmail = React.forwardRef(
  (_props, ref: Ref<IPropsPrint>) => {
    const { translate } = useLocales();
    const {
      loading,
      orderListDetail,
      onOrderListDetail,
      onSendEmailWithOrderList,
      getOrdersDetailSimple,
    } = useOrderDetailList();
    const printRef = useRef(null);
    const promiseResolveRef = useRef<{ triggerPrint: any }>({} as any);
    const [disablePrint, setDisablePrint] = useState<boolean>(true);
    const [disableEmail, setDisableEmail] = useState<boolean>(true);
    const [disablePayment, setDisablePayment] = useState<boolean>(true);
    const [orderIds, setOrderIds] = useState<number[]>([]);
    const [openPayment, setOpenPayment] = useState<boolean>(false);
    const [paymentOrders, setPaymentOrders] = useState<IOrderDetail[]>([]);

    useEffect(() => {
      if (!loading && orderListDetail?.length > 0) {
        promiseResolveRef && promiseResolveRef?.current?.triggerPrint();
      }
    }, [orderListDetail, loading]);

    const handlePrint = useReactToPrint({
      content: () => printRef.current,
      onBeforeGetContent: () => {
        return new Promise((resolve) => {
          if (promiseResolveRef) {
            promiseResolveRef.current.triggerPrint = resolve;
            onOrderListDetail(orderIds);
          }
        });
      },
    });

    const handleSendEmail = () => {
      onSendEmailWithOrderList(orderIds);
    };

    const handleOpenPayment = async () => {
      const details = await getOrdersDetailSimple(orderIds);
      if (Array.isArray(details) && details.length > 0) {
        setPaymentOrders(details as unknown as IOrderDetail[]);
        setOpenPayment(true);
      }
    };

    const actionParent = () => ({
      disablePrintPdf: () => setDisablePrint(true),
      disableSendEmail: () => setDisableEmail(true),
      disablePayment: () => setDisablePayment(true),
      enablePrintPdf: () => setDisablePrint(false),
      enableSendEmail: () => setDisableEmail(false),
      enablePayment: () => setDisablePayment(false),
      setListIds: (ids: number[]) => setOrderIds(ids),
    });
    useImperativeHandle(ref, actionParent);

    return (
      <>
        <Stack direction="row" spacing={3}>
          <LoadingButton
            variant="contained"
            size="large"
            loading={loading}
            disabled={disablePayment}
            onClick={handleOpenPayment}
          >
            {translate("orders.orderNeedCollect.pay")}
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            size="large"
            loading={loading}
            disabled={disablePrint}
            onClick={handlePrint}
          >
            {translate("orders.orderNeedCollect.debit")}
          </LoadingButton>
          <LoadingButton
            loading={loading}
            size="large"
            variant="outlined"
            disabled={disableEmail}
            onClick={handleSendEmail}
          >
            {translate("orders.orderNeedCollect.emailDebit")}
          </LoadingButton>

          <Box
            sx={{
              display: "none",
            }}
          >
            <PrintOrdersV2 ref={printRef} data={orderListDetail} />
          </Box>
        </Stack>

        <Dialog
          open={openPayment}
          scroll="paper"
          fullWidth
          maxWidth="lg"
          onClose={() => setOpenPayment(false)}
        >
          <DialogTitle>
            {translate("orders.orderNeedCollect.pay")} ({paymentOrders.length})
          </DialogTitle>
          <BlockFormOrderNeedCollect
            handleClose={setOpenPayment}
            orderDetails={paymentOrders}
          />
        </Dialog>
      </>
    );
  }
);
export default BlockPrintAndSendEmail;
