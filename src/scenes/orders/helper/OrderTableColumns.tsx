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
import { useAppSelector } from "store";
import { PaperTypeSelector } from "scenes/papers/redux/slice";
import Label from "components/label";
import { fCurrency, fNumber } from "utils/formatNumber";
import { getTotalAmount } from "utils/utility";
import { useTheme } from "@mui/material/styles";
import { formatISO, parseISO } from "date-fns";
import { LabelColor } from "components/label/types";
import { ORDER_STATUS_NAME } from "./OrderConstant";
import { Link } from "gatsby-theme-material-ui";
import { PATH_APP } from "constant/routeConstant";
import FullScreenDialogs from "../screens/OrderProcessing/DialogOrderSelected";
import DialogOrderUpdate from "../screens/OrderUpdate";

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
    minWidth: 100,
    getActions: ({ row }: GridRowParams<IOrder>) => [
      <FullScreenDialogs orderId={row.id} orderName={row.order_no} />,
      <DialogOrderUpdate
        orderId={row.id}
        orderName={row.order_no}
        fromPage="ORDER_PROCESSING"
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
    field: "deposite",
    headerName: "Tạm ứng",
    minWidth: 200,
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
];
