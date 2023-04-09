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
import { fCurrency, fNumber } from "utils/formatNumber";
import { getTotalAmount } from "utils/utility";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import { ORDER_STATUS_VALUE } from "./OrderConstant";
import FullScreenDialogs from "../screens/OrderProcessing/DialogOrderSelected";
import DialogOrderUpdate from "../screens/OrderUpdate";

export const OrderCollectTableColumns: GridColDef[] = [
  {
    field: "order_no",
    headerName: "Mã đơn hàng",
    minWidth: 120,
    renderCell: ({ value }: GridRenderCellParams<IOrder>) => {
      return <Label color="primary">{value}</Label>;
    },
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
    minWidth: 100,
    getActions: ({ row }: GridRowParams<IOrder>) => [
      <GridActionsCellItem
        icon={<FullScreenDialogs orderId={row.id} orderName={row.order_no} />}
        label="Chi tiết"
      />,
      <GridActionsCellItem
        icon={
          <DialogOrderUpdate
            orderId={row.id}
            orderName={row.order_no}
            fromPage="ORDER_NEED_COLLECT"
          />
        }
        label="Cập nhật"
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
    field: "category_name",
    headerName: "Loại hàng",
    minWidth: 200,
  },
  {
    field: "template_number",
    headerName: "SL mẫu",
    minWidth: 100,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "quantity",
    headerName: "SL in",
    minWidth: 100,
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "unit_price",
    headerName: "Đơn giá",
    minWidth: 100,
    valueGetter: ({ value }) => (value ? fCurrency(value) : "-"),
  },
  {
    field: "design_fee",
    headerName: "Phí thiết kế",
    minWidth: 100,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => (value ? fCurrency(value) : "-"),
  },
  {
    field: "shipping_fee",
    headerName: "Phí ship",
    minWidth: 100,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => (value ? fCurrency(value) : "-"),
  },
  {
    field: "deposite",
    headerName: "Tạm ứng",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    valueGetter: ({ value }) => (value ? fCurrency(value) : "-"),
  },
  {
    field: "amount",
    headerName: "Thành tiền",
    minWidth: 150,
    renderCell: ({ row }: GridRenderCellParams<IOrder>) => {
      const formatAmount = fCurrency(getTotalAmount(row));
      return (
        <Label color="primary" variant="outlined">
          {formatAmount}
        </Label>
      );
    },
  },
  {
    field: "vat",
    headerName: "VAT",
    minWidth: 50,
    renderCell: ({ row }: GridRenderCellParams<IOrder>) => {
      const theme = useTheme();
      const iconVat = row.vat ? "ic:outline-info" : "healthicons:yes-outline";
      const colorVat = row.vat ? theme.palette.error : theme.palette.primary;
      return (
        <Iconify width={ICON.NAV_ITEM} icon={iconVat} color={colorVat.main} />
      );
    },
  },
  {
    field: "status",
    headerName: "Trạng thái",
    minWidth: 150,
    valueGetter: ({ value }: { value: keyof typeof ORDER_STATUS_VALUE }) =>
      value ? ORDER_STATUS_VALUE[value] : "-",
  },
  {
    field: "deliver",
    headerName: "Giao hàng",
    minWidth: 150,
  },
  {
    field: "cod",
    headerName: "Còn lại",
    minWidth: 100,
    valueGetter: ({ value }) => (value ? fCurrency(value) : "-"),
  },
  {
    field: "cash",
    headerName: "Đã thu",
    minWidth: 100,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => value || "-",
  },
  {
    field: "deliver_provider",
    headerName: "Đơn vị GH",
    minWidth: 100,
  },
  {
    field: "updated_time",
    headerName: "Ngày cập nhật",
    minWidth: 150,
    valueGetter: ({ value }: { value: number }) =>
      format(value * 1000, "dd/MM/yyyy"),
  },
];
