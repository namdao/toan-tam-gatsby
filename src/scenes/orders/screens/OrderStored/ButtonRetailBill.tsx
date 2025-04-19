import { Box, Stack } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Iconify from "components/iconify";
import React, { useEffect, useRef, FC } from "react";
import { useReactToPrint } from "react-to-print";
import { useOrderDetailList } from "scenes/orders/hooks/useOrderDetail";
import { IOrder } from "scenes/orders/redux/types";
import RetailBillV2 from "./Prints/RetailBill/RetailBillV2";

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
    documentTitle: "Hóa đơn bán hàng",
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        if (promiseResolveRef) {
          promiseResolveRef.current.triggerPrint = resolve;
          onOrderListDetail([data.id]);
        }
      });
    },
  });

  const typeIcon = loading ? "eos-icons:loading" : "material-symbols:print";

  return (
    <Stack direction="row" spacing={3}>
      <GridActionsCellItem
        onClick={handlePrint}
        label="Chi tiết"
        icon={<Iconify icon={typeIcon} />}
      />
      <Box
        sx={{
          display: "none",
        }}
      >
        <RetailBillV2 ref={retailBillRef} data={orderListDetail} />
      </Box>
    </Stack>
  );
};
export default ButonRetailBill;
