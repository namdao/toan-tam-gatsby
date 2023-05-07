import React, { FC } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { useOrderWaitingPrint } from "scenes/orders/hooks/useOrderWaitingPrint";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import { magicTableRef } from "./OrderList";

type IOrderBtnAccept = {
  id: number;
};
const OrderBtnAccept: FC<IOrderBtnAccept> = ({ id }) => {
  const { onAcceptOrder } = useOrderWaitingPrint();
  const handleAcceptOrder = async () => {
    const status = await onAcceptOrder(id, ORDER_STATUS_NAME.PRINTING);
    if (status) {
      magicTableRef.current?.refreshList();
    }
  };
  return (
    <GridActionsCellItem
      label="Xác nhận đơn"
      onClick={handleAcceptOrder}
      icon={
        <Iconify width={ICON.NAV_ITEM} color="green" icon="mdi:book-check" />
      }
    />
  );
};
export default OrderBtnAccept;
