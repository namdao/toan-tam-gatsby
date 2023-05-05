import React, { useState } from "react";
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
import { Box, Popover, Typography } from "@mui/material";

const NamePopOver = ({ value }: { value: string }) => {
  const [hover, setHover] = useState<HTMLElement | null>(null);

  const handleHoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setHover(event.currentTarget);
  };
  const handleHoverClose = () => {
    setHover(null);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Label
        color="primary"
        aria-owns={hover ? "mouse-over-popover" : undefined}
      >
        <TextMaxLine
          line={1}
          style={{ whiteSpace: "normal" }}
          onClick={handleHoverOpen}
          onMouseLeave={handleHoverClose}
        >
          {value}
        </TextMaxLine>
      </Label>
      <Popover
        id="mouse-over-popover"
        open={!!hover}
        anchorEl={hover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        disableRestoreFocus
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          pointerEvents: "none",
        }}
      >
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle1">{value} </Typography>
        </Box>
      </Popover>
    </Box>
  );
};
export const CustomerColumn: GridColDef[] = [
  {
    field: "actions",
    type: "actions",
    headerName: "Hành động",
    getActions: ({ row }: GridRowParams<ICustomer>) => [
      <GridActionsCellItem
        icon={<DialogCustomerDetail customer={row} />}
        label="Chi tiết"
      />,
    ],
  },
  {
    field: "name",
    headerName: "Khách hàng",
    minWidth: 200,
    renderCell: ({ value }: GridRenderCellParams<ICustomer>) => (
      <NamePopOver value={value} />
    ),
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 250,
    headerAlign: "center",
    align: "center",
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
      if (row?.company?.personal) return "";
      return <Label color="primary">{row?.company?.company_name}</Label>;
    },
  },
];
