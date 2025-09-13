import React from "react";
import { GridColDef, GridRowParams } from "@mui/x-data-grid-pro";
import { IOrder } from "../redux/types";
import FullScreenDialogs from "../screens/OrderProcessing/DialogOrderSelected";
import DialogOrderUpdate from "../screens/OrderUpdate";
import { OrderBaseColumns } from "./OrderBaseColumns";

export const OrderCollectTableColumns: GridColDef[] = [
  ...OrderBaseColumns([
    {
      field: "actions",
      type: "actions",
      headerName: "Hành động",
      minWidth: 100,
      getActions: ({ row }: GridRowParams<IOrder>) => [
        <FullScreenDialogs orderId={row.id} orderName={row.order_no} />,
        <DialogOrderUpdate
          orderId={row.id}
          orderName={row.order_no}
          fromPage="ORDER_NEED_COLLECT"
        />,
      ],
    },
  ])
];
export const pinOrderLeft = OrderCollectTableColumns
  .filter((e) => e.field === "order_no" || e.field === "actions")
  .map((e) => e.field);

export const fieldStored = OrderCollectTableColumns
  .map((e) => {
    return e.field;
  })
  .reduce((result, item) => {
    //@ts-ignore
    result[item] = true;
    return result;
  }, {});
