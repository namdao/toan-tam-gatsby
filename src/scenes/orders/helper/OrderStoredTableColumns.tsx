import React from "react";
import {
  GridColDef,
  GridRowParams,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import { IOrder } from "../redux/types";
import Label from "components/label";
import { fNumber } from "utils/formatNumber";
import { getTotalAmount } from "utils/utility";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import { ORDER_STATUS_VALUE } from "./OrderConstant";
import FullScreenDialogs from "../screens/OrderProcessing/DialogOrderSelected";
import DialogOrderUpdate from "../screens/OrderUpdate";
import ButonRetailBill from "../screens/OrderStored/ButtonRetailBill";
import { getImageToAws } from "utils/imageHandler";
import ImagePopup from "../components/ImagePopup";
import { OrderBaseColumns } from "./OrderBaseColumns";

export const OrderStoredTableColumns: GridColDef[] = [
  ...OrderBaseColumns(
    [
      {
        field: "actions",
        type: "actions",
        headerName: "Hành động",
        minWidth: 150,
        getActions: ({ row }: GridRowParams<IOrder>) => [
          <FullScreenDialogs orderId={row.id} orderName={row.order_no} />,
          <DialogOrderUpdate
            orderId={row.id}
            orderName={row.order_no}
            fromPage="ORDER_PROCESSING"
          />,
          <ButonRetailBill data={row} />,
        ],
      },
      {
        field: "updated_time",
        headerName: "Ngày cập nhật",
        minWidth: 150,
        valueGetter: ({ value }: { value: string }) =>
          format(new Date(value), "dd/MM/yyyy"),
      },
    ],
    false,
  ),
];

export const pinOrderLeft = OrderStoredTableColumns.filter(
  (e) => e.field === "order_no" || e.field === "actions"
).map((e) => e.field);

export const fieldStored = OrderStoredTableColumns.map((e) => {
  return e.field;
}).reduce((result, item) => {
  //@ts-ignore
  result[item] = true;
  return result;
}, {});
