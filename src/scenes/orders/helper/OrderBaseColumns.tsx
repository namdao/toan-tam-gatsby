import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid-pro";
import { IOrder } from "../redux/types";
import { ICON } from "constant/layoutConstant";
import { getImageToAws } from "utils/imageHandler";
import ImagePopup from "../components/ImagePopup";
import Iconify from "components/iconify";
import Label from "components/label";
import React from "react";
import { fNumber } from "utils/formatNumber";
import { getTotalAmount } from "utils/utility";
import { ORDER_STATUS_VALUE } from "./OrderConstant";
import { useTheme } from "@mui/material";
import { format } from "date-fns";

const orderBaseCustomerColumns: GridColDef[] = [
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
];
const fakeColumnsActions: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
  },
];
export const OrderBaseColumns = (
  replaceColumns: GridColDef[] = [],
  showCustomerColumns: boolean = true
): GridColDef[] => {
  const baseColumns: GridColDef[] = [
    {
      field: "order_no",
      headerName: "Mã đơn hàng",
      minWidth: 120,
    },
    // để columns actions bên ngoài replace fake columns
    ...fakeColumnsActions,
    ...(showCustomerColumns ? orderBaseCustomerColumns : []),
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
        const colorVat = row.vat ? theme.palette.primary : theme.palette.error;
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
      field: "other_fee",
      headerName: "Phí khác",
      minWidth: 100,
      valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
    },
    {
      field: "vat_fee",
      headerName: "VAT",
      minWidth: 100,
      valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
    },
    {
      field: "discount",
      headerName: "Khuyến mãi",
      minWidth: 100,
      valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
    },
    {
      field: "cod",
      headerName: "Còn lại",
      minWidth: 100,
      renderCell: ({ row }: GridRenderCellParams<IOrder>) => {
        if(row.cod === 0 || row.cod === row.cash) return "-";
        return  (row.cod ? fNumber(row.cod) : "-");
      },
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

  if (replaceColumns.length > 0) {
    const newColumns = baseColumns.map((column) => {
      const replaceColumn = replaceColumns.find(
        (replaceColumn) => replaceColumn.field === column.field
      );
      if (replaceColumn) {
        return replaceColumn;
      }
      return column;
    });
    return newColumns;
  }
  return baseColumns;
};
