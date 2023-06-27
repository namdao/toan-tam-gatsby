import React from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid-pro";
import { IOrder } from "../redux/types";
import { useAppSelector } from "store";
import { PaperTypeSelector } from "scenes/papers/redux/slice";
import Label from "components/label";
import { fNumber } from "utils/formatNumber";
import { LabelColor } from "components/label/types";
import FullScreenDialogs from "../screens/OrderProcessing/DialogOrderSelected";
import Iconify from "components/iconify";
import { getImageToAws } from "utils/imageHandler";
import ImagePopup from "../components/ImagePopup";
import { ICON } from "constant/layoutConstant";
import DialogOrderUpdate from "../screens/OrderUpdate";

const PaperType = ({ paperId }: { paperId: number }) => {
  const listPaper = useAppSelector(PaperTypeSelector.getListPaper);
  const paperItem = listPaper.find((e) => e.id === paperId);
  return <span>{paperItem?.paper_name}</span>;
};
export const OrderSearchColumnTable: GridColDef[] = [
  {
    field: "order_no",
    headerName: "Mã đơn hàng",
    minWidth: 150,
    renderCell: ({ value, row }: GridRenderCellParams<IOrder>) => {
      let icon: JSX.Element | null = null;
      let colorOrder: LabelColor = "primary";
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
    minWidth: 100,
    getActions: ({ row }: GridRowParams<IOrder>) => [
      <FullScreenDialogs orderId={row.id} orderName={row.order_no} />,
      <DialogOrderUpdate
        orderId={row.id}
        orderName={row.order_no}
        fromPage="ORDER_SEARCH"
      />,
    ],
  },
  {
    field: "customer_name",
    headerName: "Tên khách hàng",
    minWidth: 200,
  },
  {
    field: "customer_phone",
    headerName: "ĐT khách hàng",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
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
    renderCell: ({ value = [] }: GridRenderCellParams<IOrder>) => {
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
    field: "category_name",
    headerName: "Loại hàng",
    minWidth: 200,
  },
  {
    field: "paper_id",
    headerName: "Loại giấy",
    minWidth: 150,
    renderCell: ({ value }: GridRenderCellParams<IOrder>) => {
      return <PaperType paperId={value} />;
    },
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    minWidth: 100,
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "method",
    headerName: "Kích thước",
    minWidth: 150,
    valueGetter: ({ value }) => (value ? `${value} mm` : "-"),
  },
  {
    field: "unit_price",
    headerName: "Đơn giá",
    minWidth: 100,
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
];

export const pinOrderLeft = OrderSearchColumnTable.filter(
  (e) => e.field === "order_no" || e.field === "actions"
).map((e) => e.field);

export const fieldStored = OrderSearchColumnTable.map((e) => {
  return e.field;
}).reduce((result, item) => {
  //@ts-ignore
  result[item] = true;
  return result;
}, {});
