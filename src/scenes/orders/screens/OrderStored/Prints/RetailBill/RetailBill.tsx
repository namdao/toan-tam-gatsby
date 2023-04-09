import {
  Grid,
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
import { format } from "date-fns";
import { cloneDeep } from "lodash";
import { fNumber } from "utils/formatNumber";
import "./RetailBill.css";
import { getTotalAmount, getTotalFee } from "utils/utility";

type IProps = {
  data: IResOrderListDetail[];
};
const StyledCell = styled(TableCell)(() => ({
  border: "1px solid rgba(224, 224, 224, 1)",
  // padding: "8px 6px",
  // fontSize: "0.78rem",
}));
const PrintOrders = forwardRef(({ data }: IProps, ref) => {
  if (data.length < 1) return <></>;
  const { customer } = data[0];
  const newOrder = cloneDeep(data[0]);
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
        <Stack flexDirection="row" justifyContent="flex-end">
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
          <Iconify icon="material-symbols:home-outline" width={22} />
          <Typography
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            280-282 Lê Sao P.Phú Thạnh Q.Tân Phú TPHCM
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
            DĐ: 0903399760 - 0933028787
          </Typography>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end">
          <Typography
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{
              pt: 1.5,
            }}
          >
            Mã số:{" "}
            <Typography
              component="span"
              sx={{ border: "2px solid rgba(0,0,0, 1)", p: 0.5 }}
            >
              {newOrder.order_no}
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );

  const sectionBody = () => {
    return (
      <Stack>
        <Box sx={{ flex: 1, pb: 2 }}>
          <Typography variant="h3" textAlign="center">
            <Box component="span" fontWeight="500">
              HOÁ ĐƠN BÁN LẺ
            </Box>
          </Typography>
          <Typography variant="body1">
            {`Người mua hàng: `}
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {customer.name}
            </Box>
          </Typography>
          <Typography variant="body1">
            <Box component="span">
              {`Địa chỉ: `}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {customer.address}, {customer.ward}, {customer.district},{" "}
                {customer.city}
              </Box>
            </Box>
          </Typography>
          <Typography variant="body1">
            <Box component="span">
              {`Điện thoại: `}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {customer.phone}
              </Box>
            </Box>
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <StyledCell>STT</StyledCell>
              <StyledCell>Tên hàng và Quy cách</StyledCell>
              <StyledCell>SL Mẫu</StyledCell>
              <StyledCell>Số lượng</StyledCell>
              <StyledCell>Đơn giá</StyledCell>
              <StyledCell>Phí thiết kế</StyledCell>
              <StyledCell>Phí vận chuyển</StyledCell>
              <StyledCell>Thành tiền</StyledCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            <TableRow key={newOrder.id}>
              <StyledCell size="small">{1}</StyledCell>
              <StyledCell size="small" style={{ maxWidth: 300 }}>
                {newOrder.name}
              </StyledCell>
              <StyledCell size="small">
                {fNumber(newOrder.template_number)}
              </StyledCell>
              <StyledCell size="small">{fNumber(newOrder.quantity)}</StyledCell>
              <StyledCell size="small">
                {fNumber(newOrder.unit_price)}
              </StyledCell>
              <StyledCell size="small">
                {fNumber(newOrder.design_fee)}
              </StyledCell>
              <StyledCell size="small">
                {fNumber(newOrder.shipping_fee)}
              </StyledCell>
              <StyledCell size="small">
                {fNumber(getTotalFee(newOrder))}
              </StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell size="small" />
              <StyledCell sx={{ textAlign: "right" }}>
                <b>Cọc trước</b>
              </StyledCell>
              <StyledCell colSpan={5} />
              <StyledCell>{fNumber(newOrder.deposite)}</StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell size="small" />
              <StyledCell sx={{ textAlign: "right" }}>
                <b>TỔNG CỘNG</b>
              </StyledCell>
              <StyledCell colSpan={5} />
              <StyledCell>{fNumber(getTotalAmount(newOrder))}</StyledCell>
            </TableRow>
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
          <Typography variant="caption" textAlign="center">
            Người nhận
          </Typography>
          <Typography variant="caption" textAlign="center">
            <Typography>
              Tân Phú {format(new Date(), "dd")} tháng,{" "}
              {format(new Date(), "MM")} năm {format(new Date(), "yyyy")}
              <br />
            </Typography>
            Người lập phiếu
          </Typography>
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
export default PrintOrders;
