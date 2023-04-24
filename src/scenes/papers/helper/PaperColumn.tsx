import React from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import Label from "components/label";
import Iconify from "components/iconify";
import { ICON } from "constant/layoutConstant";
import { IResPaperType } from "../redux/types";

export const PaperTypeColumn: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
    minWidth: 100,
    getActions: ({ row }: GridRowParams) => [
      <GridActionsCellItem
        icon={
          <Iconify icon="material-symbols:edit-outline" width={ICON.NAV_ITEM} />
        }
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
    field: "paper_name",
    headerName: "Loại giấy",
    flex: 1,
    renderCell: ({ value }: GridRenderCellParams<IResPaperType>) => {
      return <Label color="primary">{value}</Label>;
    },
  },
  {
    field: "paper_code",
    headerName: "Mã loại giấy",
    flex: 1,
  },
];
