import React from "react";
import {
  GridColDef,
  GridRowParams,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import Label from "components/label";
import { fNumber } from "utils/formatNumber";
import { getTotalAmount } from "utils/utility";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import { IOrder } from "scenes/orders/redux/types";
import DialogOrderUpdate from "scenes/orders/screens/OrderUpdate";
import { ORDER_STATUS_VALUE } from "scenes/orders/helper/OrderConstant";
import FullScreenDialogs from "scenes/orders/screens/OrderProcessing/DialogOrderSelected";

export const DeibitCompanyDetailColumn: GridColDef[] = [
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
      <FullScreenDialogs orderId={row.id} orderName={row.order_no} />,
      <DialogOrderUpdate
        orderId={row.id}
        orderName={row.order_no}
        fromPage="ORDER_COMPANY_DEBIT"
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
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "design_fee",
    headerName: "Phí thiết kế",
    minWidth: 100,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "shipping_fee",
    headerName: "Phí ship",
    minWidth: 100,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "deposite",
    headerName: "Tạm ứng",
    headerAlign: "center",
    align: "center",
    minWidth: 100,
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "amount",
    headerName: "Thành tiền",
    minWidth: 150,
    renderCell: ({ row }: GridRenderCellParams<IOrder>) => {
      const formatAmount = fNumber(getTotalAmount(row));
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
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "cash",
    headerName: "Đã thu",
    minWidth: 100,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
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

export const fieldStored = DeibitCompanyDetailColumn.map((e) => {
  return e.field;
}).reduce((result, item) => {
  //@ts-ignore
  result[item] = true;
  return result;
}, {});
