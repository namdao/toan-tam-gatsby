import React from "react";
import {
  GridColDef,
  GridRowParams,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import Label from "components/label";
import { fNumber } from "utils/formatNumber";
import FullScreenDialogs from "scenes/orders/screens/OrderProcessing/DialogOrderSelected";
import { format } from "date-fns";
import { useTheme } from "@mui/material";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import { IOrder } from "scenes/orders/redux/types";
import { getTotalAmount } from "utils/utility";

export const RevenueCompanyDetailTableColumns: GridColDef<IOrder>[] = [
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
    minWidth: 150,
    getActions: ({ row }: GridRowParams<IOrder>) => [
      <FullScreenDialogs orderId={row.id} orderName={row.order_no} />,
    ],
  },
  {
    field: "name",
    headerName: "Tên file",
    minWidth: 300,
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
    field: "quantity",
    headerName: "Số lượng in",
    minWidth: 150,
    valueGetter: ({ value, row }) => {
      return `${row.number_print_face} mặt x ${fNumber(value)}`;
    },
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
    field: "cod",
    headerName: "Còn lại",
    minWidth: 150,
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "cash",
    headerName: "Đã thu",
    minWidth: 150,
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "updated_time",
    headerName: "Ngày cập nhật",
    minWidth: 200,
    valueGetter: ({ value }: { value: number }) =>
      format(value * 1000, "dd/MM/yyyy"),
  },
];
