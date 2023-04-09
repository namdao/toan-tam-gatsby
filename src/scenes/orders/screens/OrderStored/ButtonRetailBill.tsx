import { Box, Stack } from "@mui/material";
import Iconify from "components/iconify";
import React, { useEffect, useRef, FC } from "react";
import { useReactToPrint } from "react-to-print";
import { useOrderDetailList } from "scenes/orders/hooks/useOrderDetail";
import { IOrder } from "scenes/orders/redux/types";
import RetailBill from "./Prints/RetailBill/RetailBill";

export type IPropsRetailBill = {
  data: IOrder;
};
const ButonRetailBill: FC<IPropsRetailBill> = ({ data }) => {
  const { loading, orderListDetail, onOrderListDetail } = useOrderDetailList();
  const retailBillRef = useRef(null);
  const promiseResolveRef = useRef<{ triggerPrint: any }>({} as any);

  useEffect(() => {
    if (!loading && orderListDetail?.length > 0) {
      promiseResolveRef && promiseResolveRef?.current?.triggerPrint();
    }
  }, [orderListDetail, loading]);

  const handlePrint = useReactToPrint({
    content: () => retailBillRef.current,
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        if (promiseResolveRef) {
          promiseResolveRef.current.triggerPrint = resolve;
          onOrderListDetail([data.id]);
        }
      });
    },
  });

  return (
    <Stack direction="row" spacing={3}>
      <Iconify icon="material-symbols:print" onClick={handlePrint} />
      <Box
        sx={{
          display: "none",
        }}
      >
        <RetailBill ref={retailBillRef} data={orderListDetail} />
      </Box>
    </Stack>
  );
};
export default ButonRetailBill;
