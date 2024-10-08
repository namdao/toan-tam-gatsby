import React from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import Label from "components/label";
import { IDataTableCategory } from "../redux/types";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";

export const CategoryColumn: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
    minWidth: 100,
    getActions: ({ row }: GridRowParams<IDataTableCategory>) => [
      <GridActionsCellItem
        icon={
          <Iconify
            icon="material-symbols:delete-outline"
            width={ICON.NAV_ITEM}
          />
        }
        label="Xoá"
      />,
    ],
  },
  {
    field: "category_name",
    headerName: "Danh mục",
    minWidth: 300,
    renderCell: ({ value }: GridRenderCellParams<IDataTableCategory>) => {
      return <Label color="primary">{value}</Label>;
    },
  },
];
