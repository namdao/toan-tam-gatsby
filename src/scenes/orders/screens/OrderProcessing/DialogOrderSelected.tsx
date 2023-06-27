import React from "react";
import Iconify from "components/iconify";

import { useState } from "react";
import { ICON } from "constant/layoutConstant";
import { GridActionsCellItem } from "@mui/x-data-grid";
import DiaLogDetail, { magicOrderDetailRef } from "../OrderDetail/DiaLogDetail";

function DialogOrderSelected({
  orderId,
  orderName,
}: {
  orderId: number;
  orderName: string;
}) {
  const openOrderDetail = () => {
    magicOrderDetailRef.current?.onOpen({
      orderId,
      orderName,
    });
  };

  return (
    <>
      <GridActionsCellItem
        label="Chi tiết"
        onClick={openOrderDetail}
        icon={<Iconify width={ICON.NAV_ITEM} icon="mdi:show" />}
      />
      <DiaLogDetail />
    </>
  );
}
export default DialogOrderSelected;
