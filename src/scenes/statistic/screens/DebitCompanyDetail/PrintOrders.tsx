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
import { compareAsc, format, parseISO } from "date-fns";
import { cloneDeep } from "lodash";
import { fNumber } from "utils/formatNumber";
import "./PrintOrders.css";

type IProps = {
  data: IResOrderListDetail[];
};
const StyledCell = styled(TableCell)(() => ({
  border: "1px solid rgba(224, 224, 224, 1)",
  padding: "8px 6px",
  fontSize: "0.78rem",
  color: "#000",
}));
const TypoPrint = styled(Typography)(() => ({
  color: "#000",
}));
const PrintOrders = forwardRef(({ data }: IProps, ref) => {
  const sectionHeader = () => (
    <Stack flexDirection="row" justifyContent="space-between">
      <img src={Images.logoPrint} width="30%" height="50%" />
      <Box>
        <TypoPrint variant="body1" gutterBottom textAlign="right" sx={{ m: 0 }}>
          <b>CÔNG TY TNHH TM - DV - IN ẤN TOÀN TÂM</b>
        </TypoPrint>
        <Stack flexDirection="row">
          <Iconify icon="material-symbols:home-outline" width={22} />
          <TypoPrint
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            265B Trịnh Đình Trọng, P.Hòa Thạnh, Q. Tân Phú, TP. HCM
          </TypoPrint>
        </Stack>

        <Stack flexDirection="row" justifyContent="flex-end">
          <Iconify icon="ic:outline-email" width={22} />
          <TypoPrint
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, px: 1 }}
          >
            toantam.ketoan@gmail.com
          </TypoPrint>
          <Iconify icon="mdi:web" width={22} />
          <TypoPrint
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            intoantam.com
          </TypoPrint>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end">
          <Iconify icon="material-symbols:phone-enabled-outline" width={22} />
          <TypoPrint
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            0931 87 87 18 - <span>MST:</span> 031338242
          </TypoPrint>
        </Stack>
      </Box>
    </Stack>
  );

  const sectionBody = () => {
    if (data.length < 1) return <></>;
    const { customer } = data[0];
    const newOrder = cloneDeep(data);
    newOrder.sort((a, b) => {
      return compareAsc(
        parseISO(a.real_delivery_date),
        parseISO(b.real_delivery_date)
      );
    });
    let total = 0;
    let totalDebit = 0;
    let totalCash = 0;

    return (
      <Stack>
        <Box sx={{ flex: 1 }}>
          <TypoPrint variant="h3" textAlign="center">
            <Box component="span" fontWeight="500">
              CÔNG NỢ PHẢI THU
            </Box>
          </TypoPrint>
          <TypoPrint variant="body1">
            <Box component="span" sx={{ fontWeight: "bold" }}>
              {customer.company.company_name}
            </Box>
          </TypoPrint>
          <TypoPrint variant="body1">
            <Box component="span">
              {`Tên KH/ Cty: `}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {customer.name}
              </Box>
            </Box>
          </TypoPrint>
          <TypoPrint variant="body1">
            <Box component="span">
              {`Email: `}
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {customer.email}
              </Box>
            </Box>
          </TypoPrint>
          <Stack alignItems="flex-end" justifyContent="flex-end">
            <TypoPrint variant="body1">
              <Box component="span" sx={{ fontWeight: "bold" }}>
                Từ{" "}
                {format(parseISO(newOrder[0].real_delivery_date), "dd/MM/yyyy")}{" "}
                đến{" "}
                {format(
                  parseISO(newOrder[newOrder.length - 1].real_delivery_date),
                  "dd/MM/yyyy"
                )}
              </Box>
            </TypoPrint>
          </Stack>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <StyledCell>STT</StyledCell>
              <StyledCell>PO ID</StyledCell>
              <StyledCell>
                <Box component="span">
                  Loại hàng <br />
                  Loại giấy
                </Box>
              </StyledCell>
              <StyledCell style={{ maxWidth: 300 }}>Tên hàng</StyledCell>
              <StyledCell>
                Quy cách
                <br />
                (mm)
              </StyledCell>
              <StyledCell>SL Mẫu</StyledCell>
              <StyledCell>SL in/mẫu</StyledCell>
              <StyledCell>Đơn giá</StyledCell>
              <StyledCell>Thành tiền</StyledCell>
              <StyledCell>Tạm ứng</StyledCell>
              <StyledCell>Ngày giao</StyledCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            {newOrder &&
              newOrder.map((order, index) => {
                total +=
                  order.template_number * order.unit_price * order.quantity +
                  order.shipping_fee +
                  order.design_fee;
                if (order.deposite) {
                  totalDebit += order.deposite;
                }
                if (order.cash) {
                  totalCash += order.cash;
                }
                return (
                  <TableRow key={order.id}>
                    <StyledCell size="small">{index + 1}</StyledCell>
                    <StyledCell size="small">{order.order_no}</StyledCell>
                    <StyledCell size="small">
                      {order.category.category_name} -{" "}
                      {order?.paper?.paper_code}
                    </StyledCell>
                    <StyledCell size="small" style={{ maxWidth: 300 }}>
                      {order.name}
                    </StyledCell>
                    <StyledCell size="small">{order.method}</StyledCell>
                    <StyledCell size="small">
                      {fNumber(order.template_number)}
                    </StyledCell>
                    <StyledCell size="small">
                      {fNumber(order.quantity)}
                    </StyledCell>
                    <StyledCell size="small">
                      {fNumber(order.unit_price)}
                    </StyledCell>
                    <StyledCell size="small">
                      {fNumber(
                        order.template_number *
                          order.unit_price *
                          order.quantity +
                          order.shipping_fee +
                          order.design_fee
                      )}
                    </StyledCell>
                    <StyledCell size="small">
                      {order.deposite ? fNumber(order.deposite) : "-"}
                    </StyledCell>
                    <StyledCell size="small">
                      {format(parseISO(order.real_delivery_date), "dd/MM/yyyy")}
                    </StyledCell>
                  </TableRow>
                );
              })}
            <TableRow>
              <StyledCell colSpan={8} sx={{ textAlign: "right" }}>
                <b>TỔNG ĐƠN HÀNG</b>
              </StyledCell>
              <StyledCell>{total ? fNumber(total) : "-"}</StyledCell>
              <StyledCell>{totalDebit ? fNumber(totalDebit) : "-"}</StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell colSpan={8} sx={{ textAlign: "right" }}>
                <b>ĐÃ THANH TOÁN</b>
              </StyledCell>
              <StyledCell>{fNumber(totalDebit + totalCash)}</StyledCell>
            </TableRow>
            <TableRow>
              <StyledCell colSpan={8} sx={{ textAlign: "right" }}>
                <b>CÒN LẠI PHẢI THANH TOÁN</b>
              </StyledCell>
              <StyledCell>
                {fNumber(total - (totalDebit + totalCash))}
              </StyledCell>
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
          <TypoPrint variant="caption" textAlign="center">
            Xác nhận của KH
          </TypoPrint>
          <TypoPrint variant="caption" textAlign="center">
            Người lập phiếu
          </TypoPrint>
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
