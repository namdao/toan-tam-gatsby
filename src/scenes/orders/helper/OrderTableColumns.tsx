import React from "react";
import {
  GridColDef,
  GridRowParams,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import { IOrder } from "../redux/types";
import { useAppSelector } from "store";
import { PaperTypeSelector } from "scenes/papers/redux/slice";
import Label from "components/label";
import { fNumber } from "utils/formatNumber";
import { getTotalAmount } from "utils/utility";
import { useTheme } from "@mui/material/styles";
import { format, formatISO, parseISO } from "date-fns";
import { LabelColor } from "components/label/types";
import { ORDER_STATUS_NAME } from "./OrderConstant";
import FullScreenDialogs from "../screens/OrderProcessing/DialogOrderSelected";
import DialogOrderUpdate from "../screens/OrderUpdate";
import { getImageToAws } from "utils/imageHandler";
import ImagePopup from "../components/ImagePopup";
import ButonRetailBill from "../screens/OrderStored/ButtonRetailBill";
import { OrderBaseColumns } from "./OrderBaseColumns";

export const PaperType = ({ paperId }: { paperId: number }) => {
  const listPaper = useAppSelector(PaperTypeSelector.getListPaper);
  const paperItem = listPaper.find((e) => e.id === paperId);
  return <span>{paperItem?.paper_name}</span>;
};
export const OrderColumnTable: GridColDef<IOrder>[] = [
  ...OrderBaseColumns([
    {
      field: "order_no",
      headerName: "Mã đơn hàng",
      minWidth: 150,
      renderCell: ({ value, row }: GridRenderCellParams<IOrder>) => {
        const theme = useTheme();
        const updatedTime = parseISO(
          formatISO(row.updated_time * 1000)
        ).getTime();
        const daysNoAction =
          (new Date().getTime() - updatedTime) / (24 * 60 * 60 * 1000);
        let icon: JSX.Element | null = null;
        let colorOrder: LabelColor = "primary";
        if (
          row.status === ORDER_STATUS_NAME.CANCEL ||
          row.status === ORDER_STATUS_NAME.DONE
        ) {
          icon = null;
        } else if (daysNoAction >= 3 && daysNoAction < 5) {
          icon = (
            <Iconify
              width={ICON.NAV_ITEM}
              icon="mdi:number-three-circle-outline"
              color={theme.palette.warning.main}
            />
          );
          colorOrder = "warning";
        } else if (daysNoAction >= 5) {
          icon = (
            <Iconify
              width={ICON.NAV_ITEM}
              icon="mdi:number-five-circle-outline"
              color={theme.palette.error.main}
            />
          );
          colorOrder = "error";
        }
        return (
          <Label color={colorOrder} endIcon={icon}>
            {value}
          </Label>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Hành động",
      minWidth: 150,
      getActions: ({ row }: GridRowParams<IOrder>) => {
        return [
          <FullScreenDialogs orderId={row.id} orderName={row.order_no} />,
          <DialogOrderUpdate
            orderId={row.id}
            orderName={row.order_no}
            fromPage="ORDER_PROCESSING"
          />,
          <ButonRetailBill data={row} />,
        ];
      },
    },
  ]),
];

export const pinOrderLeft = OrderColumnTable.filter(
  (e) => e.field === "order_no" || e.field === "actions"
).map((e) => e.field);

export const fieldStored = OrderColumnTable.map((e) => {
  return e.field;
}).reduce((result, item) => {
  //@ts-ignore
  result[item] = true;
  return result;
}, {});
