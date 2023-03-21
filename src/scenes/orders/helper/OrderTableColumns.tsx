import React from "react";
import {
  GridColDef,
  GridRowParams,
  GridActionsCellItem,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid-pro";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import { IOrder } from "../redux/types";
import { useAppSelector } from "store";
import { PaperTypeSelector } from "scenes/papers/redux/slice";
import Label from "components/label";
import { fCurrency, fNumber } from "utils/formatNumber";
import { getTotalAmount } from "utils/utility";
import { useTheme } from "@mui/material/styles";

const PaperType = ({ paperId }: { paperId: number }) => {
  const listPaper = useAppSelector(PaperTypeSelector.getListPaper);
  const paperItem = listPaper.find((e) => e.id === paperId);
  return <span>{paperItem?.paper_name}</span>;
};
export const OrderColumnTable: GridColDef[] = [
  {
    field: "order_no",
    headerName: "Mã đơn hàng",
    minWidth: 150,
    renderCell: ({ value }: GridRenderCellParams<IOrder>) => {
      return <Label color="primary">{value}</Label>;
    },
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
    field: "paper_id",
    headerName: "Loại giấy",
    minWidth: 150,
    renderCell: ({ value }: GridRenderCellParams<IOrder>) => {
      return <PaperType paperId={value} />;
    },
  },
  {
    field: "method",
    headerName: "Kích thước",
    minWidth: 150,
    valueGetter: ({ value }) => (value ? `${value} mm` : "-"),
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
      const iconVat = row.vat
        ? "material-symbols:warning-outline-rounded"
        : "healthicons:yes-outline";
      const colorVat = row.vat ? theme.palette.error : theme.palette.primary;
      return (
        <Iconify width={ICON.NAV_ITEM} icon={iconVat} color={colorVat.main} />
      );
    },
  },
  {
    field: "action",
    type: "actions",
    headerName: "Hành động",
    minWidth: 100,
    getActions: (params: GridRowParams<IOrder>) => [
      <GridActionsCellItem
        icon={<Iconify width={ICON.NAV_ITEM} icon="mdi:show" />}
        label="Chi tiết"
      />,
      <GridActionsCellItem
        icon={
          <Iconify
            width={ICON.NAV_ITEM}
            icon="material-symbols:edit-document-outline"
          />
        }
        label="Cập nhật"
      />,
    ],
  },
];
