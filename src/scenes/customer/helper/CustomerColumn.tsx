import React from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { ICustomer } from "constant/commonType";
import Label from "components/label";
import DialogCustomerDetail from "../screens/CustomerList/DialogCustomerDetail";
import TextMaxLine from "components/TextMaxLine";

export const CustomerColumn: GridColDef[] = [
  {
    field: "name",
    headerName: "Khách hàng",
    minWidth: 120,
    renderCell: ({ value }: GridRenderCellParams<ICustomer>) => {
      return (
        <Label color="primary">
          <TextMaxLine line={1} style={{ whiteSpace: "normal" }}>
            {value}
          </TextMaxLine>
        </Label>
      );
    },
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
    minWidth: 100,
    getActions: ({ row }: GridRowParams<ICustomer>) => [
      <GridActionsCellItem
        icon={<DialogCustomerDetail customer={row} />}
        label="Chi tiết"
      />,
    ],
  },
  {
    field: "phone",
    headerName: "ĐT khách hàng",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "customer_type",
    headerName: "Loại khách hàng",
    minWidth: 200,
    valueGetter: ({ value }) =>
      value === 1 ? "Khách thường xuyên" : "Khách vãng lai",
  },
  {
    field: "company",
    headerName: "Công ty",
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams<ICustomer>) => {
      return <Label color="primary">{row.company.company_name}</Label>;
    },
  },
];
