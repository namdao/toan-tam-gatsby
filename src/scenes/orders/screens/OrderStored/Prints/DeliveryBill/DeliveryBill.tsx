import {
  Stack,
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  styled,
} from "@mui/material";
import React, { forwardRef } from "react";
import Images from "utils/images";
import Iconify from "components/iconify";
import { IResOrderListDetail } from "scenes/orders/redux/types";
import { compareAsc, parseISO } from "date-fns";
import { cloneDeep } from "lodash";
import { fNumber } from "utils/formatNumber";
import "./DeliveryBill.css";

type IProps = {
  data: IResOrderListDetail[];
};
const StyledCell = styled(TableCell)(() => ({
  border: "1px solid rgba(224, 224, 224, 1)",
}));
const DeliveryBill = forwardRef(({ data }: IProps, ref) => {
  const sectionHeader = () => (
    <Stack flexDirection="row" justifyContent="space-between">
      <img src={Images.logoPrint} width="30%" height="50%" />
      <Box>
        <Typography
          variant="body1"
          gutterBottom
          textAlign="right"
          sx={{ m: 0 }}
        >
          <b>CÔNG TY TNHH TM - DV - IN ẤN TOÀN TÂM</b>
        </Typography>
        <Stack flexDirection="row">
          <Iconify icon="material-symbols:home-outline" width={22} />
          <Typography
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            265B Trịnh Đình Trọng, P.Hòa Thạnh, Q. Tân Phú, TP. HCM
          </Typography>
        </Stack>

        <Stack flexDirection="row" justifyContent="flex-end">
          <Iconify icon="ic:outline-email" width={22} />
          <Typography
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, px: 1 }}
          >
            toantam.ketoan@gmail.com
          </Typography>
          <Iconify icon="mdi:web" width={22} />
          <Typography
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            intoantam.com
          </Typography>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end">
          <Iconify icon="material-symbols:phone-enabled-outline" width={22} />
          <Typography
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            0931 87 87 18 - <span>MST:</span> 031338242
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );

  const sectionBody = () => {
    const today = new Date();
    if (data.length < 1) return <></>;
    const { customer, receiver_info } = data[0];
    const newOrder = cloneDeep(data);
    newOrder.sort((a, b) => {
      return compareAsc(
        parseISO(a.real_delivery_date),
        parseISO(b.real_delivery_date)
      );
    });

    return (
      <Stack>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" textAlign="center">
            <Box component="span" fontWeight="500">
              BIÊN BẢN GIAO HÀNG
            </Box>
          </Typography>
          <Typography variant="body1">
            Tp HCM, ngày {today.getDate()} tháng {today.getMonth() + 1}{" "}
            &nbsp;năm {today.getFullYear()}
          </Typography>
          <Typography variant="body1" sx={{ pt: 2 }}>
            <Box sx={{ fontWeight: "bold" }}>
              <b>
                Bên giao: Công ty TNHH Sản xuất Thương mại Dịch vụ In Ấn Toàn
                Tâm
              </b>
              <br />
            </Box>
          </Typography>
          <Typography variant="body1">
            Địa chỉ: 265B Trịnh Đình Trọng P.Hòa Thạnh, Q.Tân Phú
            <br />
            Người
            giao:&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Điện
            Thoại:
          </Typography>
          <Typography variant="body1" sx={{ pt: 2 }}>
            <Box sx={{ fontWeight: "bold" }}>
              {`Bên nhận: `}
              {customer.name}
            </Box>
          </Typography>
          <Typography variant="body1">
            <Box>
              {`Địa chỉ: `}
              {customer.address}
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ pb: 2 }}>
            <Box>
              {`Người nhận: `}
              {receiver_info || customer.name}
              {` Điện thoại: `}
              {customer.phone}
            </Box>
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <StyledCell>STT</StyledCell>
              <StyledCell>Hạng mục</StyledCell>
              <StyledCell>Tên SP - Quy cách</StyledCell>
              <StyledCell>Số lượng mẫu</StyledCell>
              <StyledCell>Số lượng in</StyledCell>
              <StyledCell>Ghi chú</StyledCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            {newOrder &&
              newOrder.map((order, index) => {
                return (
                  <TableRow key={order.id}>
                    <StyledCell>{index + 1}</StyledCell>
                    <StyledCell>{order.category.category_name}</StyledCell>
                    <StyledCell style={{ maxWidth: 300 }}>
                      {order.name} - {order.method}
                    </StyledCell>
                    <StyledCell>{fNumber(order.template_number)}</StyledCell>
                    <StyledCell>{fNumber(order.quantity)}</StyledCell>
                    <StyledCell />
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Stack>
    );
  };

  const sectionFooter = () => {
    return (
      <Stack justifyContent="flex-end">
        <Stack
          flexDirection="row"
          justifyContent="space-around"
          sx={{ flex: 1, pt: 2 }}
        >
          <Typography textAlign="center">Người nhận hàng</Typography>
          <Typography textAlign="center">Người lập phiếu</Typography>
        </Stack>
      </Stack>
    );
  };
  return (
    // @ts-ignore
    <Stack ref={ref}>
      {sectionHeader()}
      {sectionBody()}
      {sectionFooter()}
    </Stack>
  );
});
export default DeliveryBill;
