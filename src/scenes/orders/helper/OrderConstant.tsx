import React from "react";
import {
  GridColDef,
  GridRowParams,
  GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import { LabelColor } from "components/label/types";
import { Button } from "@mui/material";
import { IOrder } from "../redux/types";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";

export const ORDER_STATUS_VALUE = {
  "-1": "Đã hủy",
  0: "Nháp",
  1: "Sale",
  2: "Đang thiết kế",
  3: "Chờ phản hồi thiết kế",
  4: "Đang thiết kế theo phản hồi",
  5: "Đã thiết kế",
  6: "Chờ in",
  7: "Đã in",
  8: "Lưu kho",
  9: "Giao hàng",
  10: "Hoàn thành",
};

export enum ORDER_STATUS_NAME {
  CANCEL = -1,
  DRAFT = 0,
  SALE = 1,
  DESIGNING = 2,
  WAITING_FEEDBACK = 3,
  DESIGNING_AFTER_FEEDBACK = 4,
  DESIGNED = 5,
  WAITING_PRINT = 6,
  PRINTED = 7,
  STORED = 8,
  DELIVER = 9,
  DONE = 10,
}

export type IOrderTabProcessing = {
  name: string;
  value: ORDER_STATUS_NAME;
  color: LabelColor;
};
export const ORDER_TAB_PROCESSING: IOrderTabProcessing[] = [
  {
    name: "orders.orderProcessing.designed",
    value: ORDER_STATUS_NAME.DESIGNED,
    color: "info",
  },
  {
    name: "orders.orderProcessing.waitingPrint",
    value: ORDER_STATUS_NAME.WAITING_PRINT,
    color: "warning",
  },
  {
    name: "orders.orderProcessing.printed",
    value: ORDER_STATUS_NAME.PRINTED,
    color: "success",
  },
  {
    name: "orders.orderProcessing.cancel",
    value: ORDER_STATUS_NAME.CANCEL,
    color: "error",
  },
  {
    name: "orders.orderProcessing.draft",
    value: ORDER_STATUS_NAME.DRAFT,
    color: "default",
  },
];

export const OrderColumnTable: GridColDef[] = [
  {
    field: "order_no",
    headerName: "Mã đơn hàng",
    minWidth: 150,
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
  },
  {
    field: "name",
    headerName: "Tên file",
    minWidth: 250,
  },
  {
    field: "category_name",
    headerName: "Loại hàng",
    minWidth: 100,
  },
  {
    field: "paper_name",
    headerName: "Loại giấy",
    minWidth: 100,
  },
  {
    field: "method",
    headerName: "Kích thước",
    minWidth: 100,
  },
  {
    field: "template_number",
    headerName: "SL mẫu",
    minWidth: 100,
  },
  {
    field: "quantity",
    headerName: "SL in",
    minWidth: 100,
  },
  {
    field: "unit_price",
    headerName: "Đơn giá",
    minWidth: 200,
  },
  {
    field: "design_fee",
    headerName: "Phí thiết kế",
    minWidth: 200,
  },
  {
    field: "shipping_fee",
    headerName: "Phí ship",
    minWidth: 100,
  },
  {
    field: "amount",
    headerName: "Thành tiền",
    minWidth: 200,
  },
  {
    field: "vat",
    headerName: "VAT",
    minWidth: 100,
    valueGetter: ({ value }) => (value ? "Có" : "Không"),
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
    // renderCell: (params: GridRenderCellParams<IOrder>) => {
    //   console.log(params);
    //   return (
    //     <Button
    //       variant="contained"
    //       size="small"
    //       style={{ marginLeft: 16 }}
    //       tabIndex={params.hasFocus ? 0 : -1}
    //     >
    //       Open
    //     </Button>
    //   );
    // },
  },
];
