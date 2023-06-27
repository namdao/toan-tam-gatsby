import React from "react";
import {
  GridColDef,
  GridRowParams,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import { IOrderDetail } from "../redux/types";
import Label from "components/label";
import { fNumber } from "utils/formatNumber";
import FullScreenDialogs from "../screens/OrderProcessing/DialogOrderSelected";
import { PaperType } from "./OrderTableColumns";
import OrderBtnDone from "../screens/OrderPrinting/OrderBtnDone";
import OrderBtnReject from "../screens/OrderPrinting/OrderBtnReject";
import { getImageToAws } from "utils/imageHandler";
import Iconify from "components/iconify";
import ImagePopup from "../components/ImagePopup";
import { ICON } from "constant/layoutConstant";

export const OrderPrintingTableColumns: GridColDef<IOrderDetail>[] = [
  {
    field: "order_no",
    headerName: "Mã đơn hàng",
    minWidth: 120,
    renderCell: ({ value }: GridRenderCellParams<IOrderDetail>) => {
      return <Label color="primary">{value}</Label>;
    },
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
    minWidth: 150,
    getActions: ({ row }: GridRowParams<IOrderDetail>) => [
      <OrderBtnReject order={row} />,
      <OrderBtnDone order={row} />,
      <FullScreenDialogs orderId={row.id} orderName={row.order_no} />,
    ],
  },
  {
    field: "name",
    headerName: "Tên file",
    minWidth: 300,
  },
  {
    field: "images",
    headerName: "Ảnh đơn hàng",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    renderCell: ({ value = [] }: GridRenderCellParams<IOrderDetail>) => {
      if (!value || value?.length < 0)
        return <Iconify width={ICON.NAV_ITEM} icon="mdi:image-off-outline" />;
      const imgUrl = getImageToAws(value[0]);
      return <ImagePopup url={[imgUrl]} />;
    },
  },
  {
    field: "order_detail_notes",
    headerName: "Ghi chú sản xuất",
    minWidth: 200,
    valueGetter: ({ value }) => (value ? value : "-"),
  },
  {
    field: "category",
    headerName: "Loại hàng",
    minWidth: 150,
    valueGetter: ({ row }) => row?.category?.category_name,
  },
  {
    field: "paper_id",
    headerName: "Loại giấy",
    minWidth: 150,
    renderCell: ({ value }) => {
      return <PaperType paperId={value} />;
    },
  },
  {
    field: "quantity",
    headerName: "Số lượng in",
    minWidth: 150,
    valueGetter: ({ value, row }) => {
      return `${row.number_print_face} mặt x ${fNumber(value)}`;
    },
  },
  {
    field: "template_number",
    headerName: "Số lượng mẫu",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => (value ? `${fNumber(value)} mẫu` : "-"),
  },
  {
    field: "print_types",
    headerName: "Loại in",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ row }) => {
      if (row.print_types) {
        return row?.print_types[0]?.print_type_name;
      }
      return "-";
    },
  },
  {
    field: "method",
    headerName: "Kích thước",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => `${value} x mm`,
  },
  {
    field: "outsources",
    headerName: "Gia công",
    minWidth: 300,
    headerAlign: "center",
    renderCell: ({ row }) => {
      if (row.outsources.length < 1) return "Không gia công";
      return row.outsources.map((e) => {
        return <Label sx={{ mr: 1 }}>{e.name}</Label>;
      });
    },
  },
  {
    field: "delivery_date",
    headerName: "Ngày giao hàng",
    headerAlign: "center",
    align: "center",
    minWidth: 200,
  },
];
export const pinOrderLeft = OrderPrintingTableColumns.filter(
  (e) => e.field === "order_no" || e.field === "actions"
).map((e) => e.field);

export const fieldStored = OrderPrintingTableColumns.map((e) => {
  return e.field;
}).reduce((result, item) => {
  //@ts-ignore
  result[item] = true;
  return result;
}, {});
