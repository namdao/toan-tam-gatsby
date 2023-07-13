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
import { getTotalFee } from "utils/utility";

type IProps = {
  data: IResOrderListDetail[];
};
const StyledCell = styled(TableCell)(() => ({
  border: "1px solid rgba(224, 224, 224, 1)",
  color: "#000",
}));
const TypoPrint = styled(Typography)(() => ({
  color: "#000",
}));
const DeliveryBillV2 = forwardRef(({ data }: IProps, ref) => {
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
    let total = 0;
    return (
      <Stack>
        <Box sx={{ flex: 1 }}>
          <TypoPrint variant="h3" textAlign="center">
            <Box component="span" fontWeight="500">
              BIÊN BẢN GIAO HÀNG
            </Box>
          </TypoPrint>
          <TypoPrint variant="body1">
            Tp HCM, ngày {today.getDate()} tháng {today.getMonth() + 1}{" "}
            &nbsp;năm {today.getFullYear()}
          </TypoPrint>
          <TypoPrint variant="body1" sx={{ pt: 2 }}>
            <Box sx={{ fontWeight: "bold" }}>
              <b>
                Bên giao: Công ty TNHH Sản xuất Thương mại Dịch vụ In Ấn Toàn
                Tâm
              </b>
              <br />
            </Box>
          </TypoPrint>
          <TypoPrint variant="body1">
            Địa chỉ: 265B Trịnh Đình Trọng P.Hòa Thạnh, Q.Tân Phú
            <br />
            Người
            giao:&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Điện
            Thoại:
          </TypoPrint>
          <TypoPrint variant="body1" sx={{ pt: 2 }}>
            <Box sx={{ fontWeight: "bold" }}>
              {`Bên nhận: `}
              {customer.name}
            </Box>
          </TypoPrint>
          <TypoPrint variant="body1">
            <Box>
              {`Địa chỉ: `}
              {customer.address}
            </Box>
          </TypoPrint>
          <TypoPrint variant="body1" sx={{ pb: 2 }}>
            <Box>
              {`Người nhận: `}
              {receiver_info || customer.name}
              {` Điện thoại: `}
              {customer.phone}
            </Box>
          </TypoPrint>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <StyledCell>STT</StyledCell>
              <StyledCell>Hạng mục</StyledCell>
              <StyledCell>Tên SP - Quy cách</StyledCell>
              <StyledCell>Số lượng mẫu</StyledCell>
              <StyledCell>Số lượng in</StyledCell>
              <StyledCell>Đơn giá</StyledCell>
              <StyledCell>Thành tiền</StyledCell>
              <StyledCell>Tạm ứng</StyledCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
            {newOrder &&
              newOrder.map((order, index) => {
                total += getTotalFee(order);
                return (
                  <TableRow key={order.id}>
                    <StyledCell>{index + 1}</StyledCell>
                    <StyledCell>{order.category.category_name}</StyledCell>
                    <StyledCell style={{ maxWidth: 300 }}>
                      {order.name} - {order.method}
                    </StyledCell>
                    <StyledCell>{fNumber(order.template_number)}</StyledCell>
                    <StyledCell>{fNumber(order.quantity)}</StyledCell>
                    <StyledCell>{fNumber(order.unit_price)}</StyledCell>
                    <StyledCell>{fNumber(getTotalFee(order))}</StyledCell>
                    <StyledCell>
                      {order.deposite ? fNumber(order.deposite) : "-"}
                    </StyledCell>
                  </TableRow>
                );
              })}
            <TableRow>
              <StyledCell
                colSpan={5}
                sx={{ textAlign: "right", fontWeight: "bold" }}
              >
                Tổng cộng
              </StyledCell>
              <StyledCell>{fNumber(total)}</StyledCell>
            </TableRow>
          </TableBody>
        </Table>
        {sectionFooter()}
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
          <TypoPrint textAlign="center">Người nhận hàng</TypoPrint>
          <TypoPrint textAlign="center">Người lập phiếu</TypoPrint>
        </Stack>
      </Stack>
    );
  };
  return (
    // @ts-ignore
    <Stack ref={ref}>
      {/* <style type="text/css" media="print">
        {`
          @page {
            size: a4 landscape;
          }
        }
        `}
      </style> */}
      {sectionHeader()}
      {sectionBody()}
    </Stack>
  );
});
export default DeliveryBillV2;
