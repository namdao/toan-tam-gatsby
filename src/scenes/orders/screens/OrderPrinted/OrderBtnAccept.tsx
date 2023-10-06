import React, { FC } from "react";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ORDER_STATUS_NAME } from "scenes/orders/helper/OrderConstant";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import { magicTableRef } from "./OrderList";
import { useOrderPrinted } from "scenes/orders/hooks/useOrderPrinted";

type IOrderBtnAccept = {
  id: number;
};
const OrderBtnAccept: FC<IOrderBtnAccept> = ({ id }) => {
  const { onAcceptOrder } = useOrderPrinted();
  const handleAcceptOrder = async () => {
    const status = await onAcceptOrder(id, ORDER_STATUS_NAME.STORED);
    if (status) {
      magicTableRef.current?.refreshList();
    }
  };
  return (
    <GridActionsCellItem
      label="Xác nhận đơn"
      onClick={handleAcceptOrder}
      icon={
        <Iconify width={ICON.NAV_ITEM} color="green" icon="bi:house-down" />
      }
    />
  );
};
export default OrderBtnAccept;
