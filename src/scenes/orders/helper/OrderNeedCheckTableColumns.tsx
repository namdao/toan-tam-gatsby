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
import FullScreenDialogs from "../screens/OrderProcessing/DialogOrderSelected";
import DialogOrderUpdate from "../screens/OrderUpdate";
import { getImageToAws } from "utils/imageHandler";
import ImagePopup from "../components/ImagePopup";
import { OrderBaseColumns } from "./OrderBaseColumns";

export const OrderNeedCheckTableColumns: GridColDef[] = [
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
          fromPage="ORDER_NEED_CHECK"
        />,
      ],
    },
  ]),
  {
    field: "company_debit",
    headerName: "Công ty bù",
    minWidth: 100,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
];
export const pinOrderLeft = OrderNeedCheckTableColumns.filter(
  (e) => e.field === "order_no" || e.field === "actions"
).map((e) => e.field);

export const fieldStored = OrderNeedCheckTableColumns.map((e) => {
  return e.field;
}).reduce((result, item) => {
  //@ts-ignore
  result[item] = true;
  return result;
}, {});
