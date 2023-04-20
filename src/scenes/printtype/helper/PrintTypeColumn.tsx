import React from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import Label from "components/label";
import DialogPrintTypeDetail from "../screens/PrintTypeList/DialogPrintTypeDetail";
import { IColor, IResPrintType } from "../redux/types";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";

export const PrintTypeColumn: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
    minWidth: 100,
    getActions: ({ row }: GridRowParams<IColor>) => [
      <GridActionsCellItem
        icon={<DialogPrintTypeDetail printType={row} />}
        label="Chi tiết"
      />,
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
    field: "print_type_name",
    headerName: "Tên",
    flex: 1,
    renderCell: ({ value }: GridRenderCellParams<IResPrintType>) => {
      return <Label color="primary">{value}</Label>;
    },
  },
  {
    field: "group",
    headerName: "Nhóm",
    flex: 1,
  },
];
