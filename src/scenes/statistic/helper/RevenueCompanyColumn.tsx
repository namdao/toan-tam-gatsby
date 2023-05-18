import React from "react";
import {
  GridColDef,
  GridRowParams,
  GridActionsCellItem,
  GridRenderCellParams,
} from "@mui/x-data-grid-pro";
import { ICON } from "constant/layoutConstant";
import Label from "components/label";
import { fNumber } from "utils/formatNumber";
import { IReportRevenue } from "../redux/type";
import { navigate } from "gatsby";
import Iconify from "components/iconify";
import { PATH_APP } from "constant/routeConstant";

const navigateCompanyRevenueDetail =
  (company_id: number, company_name: string) => () => {
    navigate(
      PATH_APP.statistic.customerRevenueDetail.replace(
        ":company_id",
        `${company_id.toString()}?company=${company_name}`
      )
    );
  };
export const RevenueCompanyColumn: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
    minWidth: 100,
    getActions: ({ row }: GridRowParams<IReportRevenue>) => [
      <GridActionsCellItem
        label="Chi tiết"
        onClick={navigateCompanyRevenueDetail(row.company_id, row.company_name)}
        icon={<Iconify width={ICON.NAV_ITEM} icon="mdi:show" />}
      />,
    ],
  },
  {
    field: "company_name",
    headerName: "Công ty khách hàng",
    minWidth: 300,
    renderCell: ({ value }: GridRenderCellParams<IReportRevenue>) => {
      return <Label color="primary">{value}</Label>;
    },
  },

  {
    field: "total_income",
    headerName: "Doanh số",
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
  {
    field: "total_orders",
    headerName: "Số lượng đơn hàng",
    minWidth: 300,
    valueGetter: ({ value }) => (value ? fNumber(value) : "-"),
  },
];
