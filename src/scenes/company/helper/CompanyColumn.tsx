import React from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import Label from "components/label";
import DialogCustomerDetail from "../screens/CompanyList/DialogCompanyDetail";
import { IResCompanies } from "../redux/types";
import { Typography } from "@mui/material";
import TextMaxLine from "components/TextMaxLine";

export const CompanyColumn: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
    minWidth: 100,
    getActions: ({ row }: GridRowParams<IResCompanies>) => [
      <GridActionsCellItem
        icon={<DialogCustomerDetail company={row} />}
        label="Chi tiết"
      />,
    ],
  },
  {
    field: "company_name",
    headerName: "Công ty",
    minWidth: 500,
    renderCell: ({ value }: GridRenderCellParams<IResCompanies>) => {
      return (
        <Label color="primary">
          <TextMaxLine line={1}>{value}</TextMaxLine>
        </Label>
      );
    },
  },
  {
    field: "user",
    headerName: "Người đại diện",
    minWidth: 500,
    renderCell: ({ row }: GridRenderCellParams<IResCompanies>) => {
      return <Typography>{row.users?.[0]?.name}</Typography>;
    },
  },
];
