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
import { IResOrderListDetail } from "scenes/orders/redux/types";
import { compareAsc, format, parseISO } from "date-fns";
import { cloneDeep } from "lodash";
import { fNumber } from "utils/formatNumber";
import { getImageToAws } from "utils/imageHandler";
import {
  getTotalDebit,
  getTotalDebitWithNoDeposite,
  getTotalVatFee,
} from "utils/utility";
import "./PrintOrders.css";
type IProps = {
  data: IResOrderListDetail[];
};
const StyledCell = styled(TableCell)(({ theme }) => ({
  // border: "1px solid rgba(224, 224, 224, 1)",
  // padding: "8px 6px",
  fontSize: "0.78rem",
  color: "#000",
  fontFamily: "UTM Avo !important",
}));
const TypoPrint = styled(Typography)(() => ({
  color: "#000",
  fontFamily: "UTM Avo !important",
}));

const TypoSxBold = styled("span")(() => ({
  fontWeight: "bold",
  fontSize: "0.78rem",
  fontFamily: "UTM Avo !important",
}));

const PrintOrdersV2 = forwardRef(({ data: dataOrder }: IProps, ref) => {
  if (dataOrder.length < 1) return <></>;
  const data = dataOrder;
  const { customer } = data[0];
  const newOrder = cloneDeep(data);
  newOrder.sort((a, b) => {
    return compareAsc(
      parseISO(a.real_delivery_date),
      parseISO(b.real_delivery_date)
    );
  });

  const sectionHeader = () => (
    <Stack flexDirection="row" alignItems="center">
      <img src={Images.logoPrintGrey} width="30%" height="100%" />
      <Stack alignItems="flex-end" sx={{ flex: 1 }}>
        <TypoPrint variant="h6" gutterBottom>
          <b>CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI DỊCH VỤ IN ẤN TOÀN TÂM</b>
        </TypoPrint>
        <Stack flexDirection="row">
          <TypoPrint
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, px: 1 }}
          >
            Email: toantam.ketoan@gmail.com
          </TypoPrint>
          <TypoPrint
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            Điện thoại: 0913 87 87 18
          </TypoPrint>
        </Stack>
      </Stack>
    </Stack>
  );

  const sectionCustomer = () => {
    return (
      <Stack
        flexDirection="row"
      >
        <Stack sx={{ width: "45%",pt:1}}>
          <TypoPrint variant="h2">
            CÔNG NỢ PHẢI THU
          </TypoPrint>
          <TypoPrint sx={{fontSize: "1.5rem"}}>
            Từ {format(parseISO(newOrder[0].real_delivery_date), "dd/MM/yyyy")}{" "}
            đến{" "}
            {format(
              parseISO(newOrder[newOrder.length - 1].real_delivery_date),
              "dd/MM/yyyy"
            )}
          </TypoPrint>
        </Stack>
        <Stack sx={{ width: "55%" }}>
          <Table>
            <TableBody sx={{ backgroundColor: "#d9d9d9" }}>
              <TableRow>
                <TableCell>Tên Cty:</TableCell>
                <TableCell colSpan={3}>
                  <Typography variant="subtitle1">
                    {customer.company?.company_name}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ width: 80 }}>Tên KH:</TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{customer.name}</Typography>
                </TableCell>
                <TableCell>Điện thoại</TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{customer.phone}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Địa chỉ</TableCell>
                <TableCell colSpan={3}>
                  <Typography variant="subtitle1">
                    {customer.address}, {customer.ward}, {customer.district},{" "}
                    {customer.city}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Stack>
      </Stack>
    );
  };

  const sectionBody = () => {
    return (
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#4b4b4b" }}>
            <TableCell
              sx={{
                textAlign: "center",
                color: "white",
                fontWeight: 600,
              }}
            >
              STT
            </TableCell>
            <TableCell
              colSpan={3}
              sx={{
                textAlign: "center",
                color: "white",
                fontWeight: 600,
              }}
            >
              THÔNG TIN SẢN PHẨM
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                color: "white",
                fontWeight: 600,
              }}
            >
              THÀNH TIỀN
            </TableCell>
            <TableCell
              sx={{
                textAlign: "center",
                color: "white",
                fontWeight: 600,
              }}
            >
              GHI CHÚ
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newOrder.map((order, index) => {
            const imgUrl = order?.images?.[0]
              ? getImageToAws(order.images[0])
              : "";
            const isOdd = index % 2 === 0;
            const backgroundColor = isOdd ? "#e9e9e9" : "#d9d9d9";
            return (
              <TableRow sx={{ backgroundColor }}>
                <StyledCell>
                  <Typography variant="h3" sx={{ textAlign: "center" }}>
                    {index + 1}
                  </Typography>
                </StyledCell>
                <StyledCell sx={{ width: 200 }}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: "#f3f3f3",
                      overflow: "hidden",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    {imgUrl ? (
                      <img
                        alt="imageOrder"
                        src={imgUrl}
                        width={160}
                        height={120}
                      />
                    ) : (
                      <Box width={160} height={120}></Box>
                    )}
                  </Box>
                </StyledCell>
                <StyledCell sx={{ width: 270 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {order.order_no}
                  </Typography>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 120 }} variant="body2">
                      Ngày tạo đơn:
                    </Typography>
                    <TypoSxBold>
                      {format(parseISO(order.created_time), "dd/MM/yyyy hh:mm")}
                    </TypoSxBold>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 120 }} variant="body2">
                      Ngày giao hàng:
                    </Typography>
                    <TypoSxBold>
                      {format(
                        parseISO(order.real_delivery_date),
                        "dd/MM/yyyy hh:mm"
                      )}
                    </TypoSxBold>
                  </Stack>
                  <Typography variant="body2">
                    {order?.category?.category_name} - {order?.name} -{" "}
                    {order?.paper?.paper_name}
                  </Typography>
                </StyledCell>
                <StyledCell>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 100 }} variant="body2">
                      Kích thước:
                    </Typography>
                    <TypoSxBold>{order.method}</TypoSxBold>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 100 }} variant="body2">
                      SL Mẫu:
                    </Typography>
                    <TypoSxBold>{order.template_number}</TypoSxBold>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 100 }} variant="body2">
                      SL In:
                    </Typography>
                    <TypoSxBold>{fNumber(order.quantity)}</TypoSxBold>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 100 }} variant="body2">
                      Đơn giá:
                    </Typography>
                    <TypoSxBold>{fNumber(order.unit_price)}</TypoSxBold>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 100 }} variant="body2">
                      Chi phí khác:
                    </Typography>
                    <TypoSxBold>{fNumber(order?.other_fee || 0)}</TypoSxBold>
                  </Stack>
                </StyledCell>
                <StyledCell>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 90 }} variant="body2">
                      Thành tiền:
                    </Typography>
                    <TypoSxBold>
                      {fNumber(getTotalDebitWithNoDeposite(order))}
                    </TypoSxBold>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 90 }} variant="body2">
                      Tạm ứng:{" "}
                    </Typography>
                    <TypoSxBold>
                      {fNumber(order?.deposite + order?.cash)}
                    </TypoSxBold>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 90 }} variant="body2">
                      Phí VAT:{" "}
                    </Typography>
                    <TypoSxBold>
                      {fNumber(getTotalVatFee(order || 0))}
                    </TypoSxBold>
                  </Stack>
                  <Stack flexDirection="row" alignItems="center">
                    <Typography sx={{ width: 90 }} variant="body2">
                      Giảm giá:{" "}
                    </Typography>
                    <TypoSxBold>{fNumber(order?.discount || 0)}</TypoSxBold>
                  </Stack>
                  <Typography variant="h3" textAlign="center">
                    {fNumber(getTotalDebit(order))}
                  </Typography>
                </StyledCell>
                <StyledCell></StyledCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  };

  const sectionAmount = () => {
    let total = 0;
    let totalDebit = 0;
    let totalCash = 0;
    newOrder.forEach((order) => {
      total += getTotalDebitWithNoDeposite(order);
      if (order.deposite) {
        totalDebit += order.deposite;
      }
      if (order.cash) {
        totalCash += order.cash;
      }
    });
    return (
      <Table sx={{ mt: 2 }}>
        <TableRow sx={{ backgroundColor: "#4b4b4b" }}>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell sx={{ color: "white", width: 100 }}>
            Tổng cộng:
          </TableCell>
          <TableCell
            className="right"
            sx={{ color: "white", fontWeight: 600, width: 150, fontSize: "1.2rem" }}
          >
            {fNumber(total)}
          </TableCell>
          <TableCell sx={{ color: "white", width: 150 }}>
            Đã thanh toán:
          </TableCell>
          <TableCell
            className="right"
            sx={{ color: "white", fontWeight: 600, width: 150,fontSize: "1.2rem" }}
          >
            {fNumber(totalDebit + totalCash)}
          </TableCell>
          <TableCell sx={{ color: "white",width: 150 }}>
            Còn lại phải thu:
          </TableCell>
          <TableCell
            className="right"
            sx={{ color: "white", fontWeight: 600, width: 150,fontSize: "1.2rem" }}
          >
            {fNumber(total - (totalDebit + totalCash))}
          </TableCell>
        </TableRow>
      </Table>
    );
  };

  return (
    // @ts-ignore
    <Stack ref={ref}>
      <style type="text/css">
        {` 
          table, th, td {
            border: 1px solid white !important;
            border-collapse: collapse !important;
            padding: 8px !important;
            
          }
          tr:last-child td {
            border-bottom: 1px solid white !important;
          }
          td {
            font-weight: bold;
          }
          @media print {
          table, th, td {
            border: 1px solid white !important;
            border-collapse: collapse !important;
            font-family: "UTM Avo", sans-serif !important;
          }
          tr:last-child td {
            border-bottom: 1px solid white !important;
            font-family: "UTM Avo", sans-serif !important;
          }
          td {
            font-family: "UTM Avo", sans-serif !important;
          }
          .right {
            text-align: right;
          }
        }
      `}
      </style>
      {sectionHeader()}
      {sectionCustomer()}
      {sectionAmount()}
      {sectionBody()}
    </Stack>
  );
});
export default PrintOrdersV2;
