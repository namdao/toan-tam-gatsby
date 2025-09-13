import React from "react";
import {
  GridColDef,
  GridRowParams,
  GridActionsCellItem,
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
import { magicTableRef } from "../screens/OrderNeedConfirm/OrderList";
import { useOrderUpdate } from "../hooks/useOrderUpdate";
import { getImageToAws } from "utils/imageHandler";
import ImagePopup from "../components/ImagePopup";
import { LIST_MONEY_SOURCE } from "./OrderConstant";
import { OrderBaseColumns } from "./OrderBaseColumns";

const QuickUpdateConfirm = ({ row }: { row: IOrder }) => {
  const { onUpdateOrder, loading } = useOrderUpdate(row.id);
  const callbackSuccess = () => {
    magicTableRef?.current?.updateRowSuccess(row);
  };
  const handlerQuickConfirm = () => {
    onUpdateOrder(
      {
        confirmed_money: !row.confirmed_money,
        note: "Admin đã xác nhận",
      },
      callbackSuccess
    );
  };
  const theme = useTheme();
  const { confirmed_money = false } = row;
  let iconName = confirmed_money
    ? "line-md:confirm-circle"
    : "material-symbols:error-circle-rounded-outline";
  iconName = loading ? "eos-icons:loading" : iconName;
  const color = confirmed_money
    ? theme.palette.primary.main
    : theme.palette.warning.main;
  return (
    <GridActionsCellItem
      label="Chi tiết"
      onClick={handlerQuickConfirm}
      icon={<Iconify width={ICON.NAV_ITEM} icon={iconName} color={color} />}
    />
  );
};
export const OrderNeedConfirmTableColumns: GridColDef[] = [
  ...OrderBaseColumns([
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
          fromPage="ORDER_NEED_CONFIRM"
        />,
        <QuickUpdateConfirm row={row} />,
      ],
    },
    {
      field: "money_source",
      headerName: "Nguồn thu",
      minWidth: 100,
      valueGetter: ({ value }: { value: keyof typeof LIST_MONEY_SOURCE }) =>
        value ? LIST_MONEY_SOURCE[value] : "-",
    },
    {
      field: "company_debit",
      headerName: "Công ty bù",
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
    },
  ]),
];

export const pinOrderLeft = OrderNeedConfirmTableColumns.filter(
  (e) => e.field === "order_no" || e.field === "actions"
).map((e) => e.field);

export const fieldStored = OrderNeedConfirmTableColumns.map((e) => {
  return e.field;
}).reduce((result, item) => {
  //@ts-ignore
  result[item] = true;
  return result;
}, {});
