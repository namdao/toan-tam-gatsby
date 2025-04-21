import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
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
import PrintOrders from "./PrintOrders";
import PrintOrdersV2 from "./PrintOrdersV2";

export type IPropsPrint = {
  disablePrintPdf: () => void;
  disableSendEmail: () => void;
  enablePrintPdf: () => void;
  enableSendEmail: () => void;
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
    } = useOrderDetailList();
    const printRef = useRef(null);
    const promiseResolveRef = useRef<{ triggerPrint: any }>({} as any);
    const [disablePrint, setDisablePrint] = useState<boolean>(true);
    const [disableEmail, setDisableEmail] = useState<boolean>(true);
    const [orderIds, setOrderIds] = useState<number[]>([]);

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
    const actionParent = () => ({
      disablePrintPdf: () => setDisablePrint(true),
      disableSendEmail: () => setDisableEmail(true),
      enablePrintPdf: () => setDisablePrint(false),
      enableSendEmail: () => setDisableEmail(false),
      setListIds: (ids: number[]) => setOrderIds(ids),
    });
    useImperativeHandle(ref, actionParent);

    return (
      <Stack direction="row" spacing={3}>
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
          size="large"
          loading={loading}
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
    );
  }
);
export default BlockPrintAndSendEmail;
