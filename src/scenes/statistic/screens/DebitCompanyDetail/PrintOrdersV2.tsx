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
  TableFooter,
} from "@mui/material";
import React, { forwardRef } from "react";
import Images from "utils/images";
import { IResOrderListDetail } from "scenes/orders/redux/types";
import { compareAsc, format, parseISO } from "date-fns";
import { cloneDeep } from "lodash";
import { fNumber } from "utils/formatNumber";
import { getImageToAws } from "utils/imageHandler";
import {
  getTotalBasicFee,
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
}));
const TypoPrint = styled(Typography)(() => ({
  color: "#000",
}));

const TypoSxBold = styled("span")(() => ({
  fontWeight: "bold",
  fontSize: "0.78rem",
}));
// const fakeOrder = [
//   {
//     id: 23565,
//     created_time: "2025-04-08T02:50:35.087856+00:00",
//     updated_time: "2025-04-16T08:41:42.023645+00:00",
//     order_no: "PO04250060",
//     name: "The Giay Panama",
//     user_id: null,
//     creator_id: 33,
//     customer_id: 1211,
//     category_id: 10,
//     paper_id: 108,
//     quantity: 40,
//     template_number: 1,
//     reference_order: null,
//     unit_price: 10000.0,
//     deposite: 0,
//     design_fee: 0.0,
//     shipping_fee: 0.0,
//     order_detail_notes:
//       "Tags gi\u1ea5y 114.5x114.5mm (n\u00e0y l\u1ea5y theo khu\u00f4n c\u0169  nh\u00e9)\n- In m\u00e0u 01 m\u1eb7t - Kh\u00f4ng c\u00e1n m\u00e0ng - B\u1ed3i gi\u1ea5y th\u00e0nh WK350gsm - B\u1ebf TP\nFile \u0111ang \u0111\u1ec3 size c\u0169 114,8. C\u00f3 g\u00ec b\u1ea1n scale v\u1ec1 114 gi\u00fap m nha\nNOTE:KHU\u00d4N M\u1edaI",
//     delivery_date: "2025-04-13",
//     payment_method: "Chuy\u1ec3n kho\u1ea3n",
//     vat: false,
//     print_type_ids: [32],
//     outsource_ids: [26, 7],
//     status: 10,
//     number_print_face: 2,
//     method: "114x114",
//     delivery_address:
//       "51a yersin p10 \u0110\u00e0 L\u1ea1t, Nh\u1eadp qu\u1eadn/ huy\u1ec7n, 10, T\u1ec9nh L\u00e2m \u0110\u1ed3ng",
//     receiver_info: "Anh Th\u1ecbnh-\u0110\u00e0 L\u1ea1t",
//     receiver_phone: null,
//     outsource_date: "2025-04-08T00:00:00+00:00",
//     order_type: "CUSTOM",
//     cash: 0.0,
//     cod: 400000.0,
//     company_debit: null,
//     done: false,
//     need_check: false,
//     debt: false,
//     vat_value: 0.0,
//     tracking_id: "",
//     deliver_provider: "Ahamove",
//     money_source: "",
//     who_collect_money: "",
//     date_collect_money: null,
//     confirmed_money: false,
//     images: ["po04250060_1744080635.png"],
//     other_fee: 0,
//     discount: 0,
//     vat_fee: 0,
//     notes: [
//       {
//         id: 167370,
//         note: "Sale t\u1ea1o \u0111\u01a1n",
//         status: 1,
//         user_change:
//           "M\u1ef9 Huy\u1ec1n Tr\u1ea7n Th\u1ecb (inantoantam@gmail.com)",
//         created_time: "2025-04-08T02:50:35.515480+00:00",
//       },
//       {
//         id: 167370,
//         note: "sx",
//         status: 1,
//         new_status: 6,
//         user_change:
//           "M\u1ef9 Huy\u1ec1n Tr\u1ea7n Th\u1ecb (inantoantam@gmail.com)",
//         created_time: "2025-04-08T02:50:35.515480+00:00",
//       },
//       {
//         id: 167370,
//         note: "Hoa \u0111ang in \u0111\u01a1n",
//         new_status: 6,
//         status: 6,
//         user_change: "Hoa Ha (toantam.thietke@gmail.com)",
//         created_time: "2025-04-08T08:37:26.148000+00:00",
//       },
//       {
//         id: 167376,
//         note: "Hoa \u0111\u00e3 in \u0111\u01a1n",
//         new_status: 7,
//         status: 7,
//         user_change: "Hoa Ha (toantam.thietke@gmail.com)",
//         created_time: "2025-04-08T08:38:12.052500+00:00",
//       },
//       {
//         id: 167412,
//         note: "kts",
//         status: 6,
//         new_status: 8,
//         user_change:
//           "M\u1ef9 Huy\u1ec1n Tr\u1ea7n Th\u1ecb (inantoantam@gmail.com)",
//         created_time: "2025-04-08T08:38:12.074045+00:00",
//       },
//       {
//         id: 167412,
//         note: "Store \u0111\u00e3 l\u01b0u kho",
//         new_status: 8,
//         status: 8,
//         user_change: "Toan Tam Kho (toantam.kho01@gmail.com)",
//         created_time: "2025-04-09T07:39:29.045980+00:00",
//       },
//       {
//         id: 167883,
//         note: "AHA",
//         new_status: 9,
//         status: 9,
//         user_change: "Thanh My Lam (toantam.ketoan@gmail.com)",
//         created_time: "2025-04-16T08:37:37.004504+00:00",
//       },
//       {
//         id: 167886,
//         note: "thanhmy \u0111\u00e3 giao h\u00e0ng th\u00e0nh c\u00f4ng",
//         new_status: 10,
//         status: 10,
//         user_change: "Thanh My Lam (toantam.ketoan@gmail.com)",
//         created_time: "2025-04-16T08:41:42.000939+00:00",
//       },
//     ],
//     print_types: [
//       {
//         id: 32,
//         print_type_name: "KTS - 2 M\u1eb7t",
//         group: "color",
//         max_select: null,
//       },
//     ],
//     outsources: [
//       {
//         id: 26,
//         name: "B\u1ed3i gi\u1ea5y",
//         group: "Gia C\u00f4ng Sau In",
//         max_select: null,
//       },
//       {
//         id: 7,
//         name: "B\u1ebf TP",
//         group: "Gia C\u00f4ng Sau In",
//         max_select: 1,
//       },
//     ],
//     category: {
//       id: 10,
//       category_name: "Tags",
//       parent_id: 6,
//       deleted_at: null,
//     },
//     paper: {
//       id: 108,
//       paper_name: "Kraft tr\u1eafng 180gsm",
//       paper_code: "WK180",
//     },
//     customer: {
//       id: 1211,
//       email: "0898547942@gmail.com",
//       name: "Anh Th\u1ecbnh-\u0110\u00e0 L\u1ea1t",
//       address: "51a yersin p10 \u0110\u00e0 L\u1ea1t",
//       city: "T\u1ec9nh L\u00e2m \u0110\u1ed3ng",
//       status: 1,
//       ward: "10",
//       district: "Nh\u1eadp qu\u1eadn/ huy\u1ec7n",
//       customer_type: 0,
//       company_id: 1619,
//       phone: "0898547942",
//       company: {
//         id: 1619,
//         created_time: "2024-09-12T07:36:18.778359+00:00",
//         updated_time: "2024-09-12T07:36:18.778359+00:00",
//         company_name: "Anh Th\u1ecbnh-\u0110\u00e0 L\u1ea1t",
//         company_code: null,
//         phone: null,
//         email: "0898547942@gmail.com",
//         address: null,
//         district: null,
//         ward: null,
//         city: null,
//         accountant_email: null,
//         tax_code: null,
//         personal: true,
//       },
//     },
//     saler: {
//       id: 33,
//       email: "inantoantam@gmail.com",
//       username: "kd1",
//       first_name: "M\u1ef9 Huy\u1ec1n",
//       last_name: "Tr\u1ea7n Th\u1ecb",
//       created_time: "2019-10-19 03:56:53.009664",
//       roles: [
//         {
//           id: 5,
//           name: "Saler",
//           description: null,
//         },
//       ],
//       phone: "",
//       status: 1,
//     },
//     user: null,
//     real_delivery_date: "2025-04-16T08:41:42.023645+00:00",
//   },
//   {
//     id: 23565,
//     created_time: "2025-04-08T02:50:35.087856+00:00",
//     updated_time: "2025-04-16T08:41:42.023645+00:00",
//     order_no: "PO04250060",
//     name: "The Giay Panama",
//     user_id: null,
//     creator_id: 33,
//     customer_id: 1211,
//     category_id: 10,
//     paper_id: 108,
//     quantity: 40,
//     template_number: 1,
//     reference_order: null,
//     unit_price: 10000.0,
//     deposite: 0,
//     design_fee: 0.0,
//     shipping_fee: 0.0,
//     order_detail_notes:
//       "Tags gi\u1ea5y 114.5x114.5mm (n\u00e0y l\u1ea5y theo khu\u00f4n c\u0169  nh\u00e9)\n- In m\u00e0u 01 m\u1eb7t - Kh\u00f4ng c\u00e1n m\u00e0ng - B\u1ed3i gi\u1ea5y th\u00e0nh WK350gsm - B\u1ebf TP\nFile \u0111ang \u0111\u1ec3 size c\u0169 114,8. C\u00f3 g\u00ec b\u1ea1n scale v\u1ec1 114 gi\u00fap m nha\nNOTE:KHU\u00d4N M\u1edaI",
//     delivery_date: "2025-04-13",
//     payment_method: "Chuy\u1ec3n kho\u1ea3n",
//     vat: false,
//     print_type_ids: [32],
//     outsource_ids: [26, 7],
//     status: 10,
//     number_print_face: 2,
//     method: "114x114",
//     delivery_address:
//       "51a yersin p10 \u0110\u00e0 L\u1ea1t, Nh\u1eadp qu\u1eadn/ huy\u1ec7n, 10, T\u1ec9nh L\u00e2m \u0110\u1ed3ng",
//     receiver_info: "Anh Th\u1ecbnh-\u0110\u00e0 L\u1ea1t",
//     receiver_phone: null,
//     outsource_date: "2025-04-08T00:00:00+00:00",
//     order_type: "CUSTOM",
//     cash: 0.0,
//     cod: 400000.0,
//     company_debit: null,
//     done: false,
//     need_check: false,
//     debt: false,
//     vat_value: 0.0,
//     tracking_id: "",
//     deliver_provider: "Ahamove",
//     money_source: "",
//     who_collect_money: "",
//     date_collect_money: null,
//     confirmed_money: false,
//     images: ["po04250060_1744080635.png"],
//     other_fee: 0,
//     discount: 0,
//     vat_fee: 0,
//     notes: [
//       {
//         id: 167370,
//         note: "Sale t\u1ea1o \u0111\u01a1n",
//         status: 1,
//         user_change:
//           "M\u1ef9 Huy\u1ec1n Tr\u1ea7n Th\u1ecb (inantoantam@gmail.com)",
//         created_time: "2025-04-08T02:50:35.515480+00:00",
//       },
//       {
//         id: 167370,
//         note: "sx",
//         status: 1,
//         new_status: 6,
//         user_change:
//           "M\u1ef9 Huy\u1ec1n Tr\u1ea7n Th\u1ecb (inantoantam@gmail.com)",
//         created_time: "2025-04-08T02:50:35.515480+00:00",
//       },
//       {
//         id: 167370,
//         note: "Hoa \u0111ang in \u0111\u01a1n",
//         new_status: 6,
//         status: 6,
//         user_change: "Hoa Ha (toantam.thietke@gmail.com)",
//         created_time: "2025-04-08T08:37:26.148000+00:00",
//       },
//       {
//         id: 167376,
//         note: "Hoa \u0111\u00e3 in \u0111\u01a1n",
//         new_status: 7,
//         status: 7,
//         user_change: "Hoa Ha (toantam.thietke@gmail.com)",
//         created_time: "2025-04-08T08:38:12.052500+00:00",
//       },
//       {
//         id: 167412,
//         note: "kts",
//         status: 6,
//         new_status: 8,
//         user_change:
//           "M\u1ef9 Huy\u1ec1n Tr\u1ea7n Th\u1ecb (inantoantam@gmail.com)",
//         created_time: "2025-04-08T08:38:12.074045+00:00",
//       },
//       {
//         id: 167412,
//         note: "Store \u0111\u00e3 l\u01b0u kho",
//         new_status: 8,
//         status: 8,
//         user_change: "Toan Tam Kho (toantam.kho01@gmail.com)",
//         created_time: "2025-04-09T07:39:29.045980+00:00",
//       },
//       {
//         id: 167883,
//         note: "AHA",
//         new_status: 9,
//         status: 9,
//         user_change: "Thanh My Lam (toantam.ketoan@gmail.com)",
//         created_time: "2025-04-16T08:37:37.004504+00:00",
//       },
//       {
//         id: 167886,
//         note: "thanhmy \u0111\u00e3 giao h\u00e0ng th\u00e0nh c\u00f4ng",
//         new_status: 10,
//         status: 10,
//         user_change: "Thanh My Lam (toantam.ketoan@gmail.com)",
//         created_time: "2025-04-16T08:41:42.000939+00:00",
//       },
//     ],
//     print_types: [
//       {
//         id: 32,
//         print_type_name: "KTS - 2 M\u1eb7t",
//         group: "color",
//         max_select: null,
//       },
//     ],
//     outsources: [
//       {
//         id: 26,
//         name: "B\u1ed3i gi\u1ea5y",
//         group: "Gia C\u00f4ng Sau In",
//         max_select: null,
//       },
//       {
//         id: 7,
//         name: "B\u1ebf TP",
//         group: "Gia C\u00f4ng Sau In",
//         max_select: 1,
//       },
//     ],
//     category: {
//       id: 10,
//       category_name: "Tags",
//       parent_id: 6,
//       deleted_at: null,
//     },
//     paper: {
//       id: 108,
//       paper_name: "Kraft tr\u1eafng 180gsm",
//       paper_code: "WK180",
//     },
//     customer: {
//       id: 1211,
//       email: "0898547942@gmail.com",
//       name: "Anh Th\u1ecbnh-\u0110\u00e0 L\u1ea1t",
//       address: "51a yersin p10 \u0110\u00e0 L\u1ea1t",
//       city: "T\u1ec9nh L\u00e2m \u0110\u1ed3ng",
//       status: 1,
//       ward: "10",
//       district: "Nh\u1eadp qu\u1eadn/ huy\u1ec7n",
//       customer_type: 0,
//       company_id: 1619,
//       phone: "0898547942",
//       company: {
//         id: 1619,
//         created_time: "2024-09-12T07:36:18.778359+00:00",
//         updated_time: "2024-09-12T07:36:18.778359+00:00",
//         company_name: "Anh Th\u1ecbnh-\u0110\u00e0 L\u1ea1t",
//         company_code: null,
//         phone: null,
//         email: "0898547942@gmail.com",
//         address: null,
//         district: null,
//         ward: null,
//         city: null,
//         accountant_email: null,
//         tax_code: null,
//         personal: true,
//       },
//     },
//     saler: {
//       id: 33,
//       email: "inantoantam@gmail.com",
//       username: "kd1",
//       first_name: "M\u1ef9 Huy\u1ec1n",
//       last_name: "Tr\u1ea7n Th\u1ecb",
//       created_time: "2019-10-19 03:56:53.009664",
//       roles: [
//         {
//           id: 5,
//           name: "Saler",
//           description: null,
//         },
//       ],
//       phone: "",
//       status: 1,
//     },
//     user: null,
//     real_delivery_date: "2025-04-16T08:41:42.023645+00:00",
//   },
// ];
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
      <img src={Images.logoPrint} width="30%" height="50%" />
      <Stack alignItems="center" sx={{ flex: 1 }}>
        <TypoPrint variant="h6" gutterBottom>
          <b>CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI DỊCH VỤ IN ẤN TOÀN TÂM</b>
        </TypoPrint>
        <Stack flexDirection="row" justifyContent="flex-end">
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
            Điện thoại: 0931 87 87 18
          </TypoPrint>
        </Stack>
      </Stack>
    </Stack>
  );

  const sectionCustomer = () => {
    return (
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack alignItems="center" sx={{ flex: 1, px: 1, width: "35%" }}>
          <TypoPrint variant="h3" textAlign="center">
            CÔNG NỢ PHẢI THU
          </TypoPrint>
          <TypoPrint variant="h5" textAlign="center">
            Từ {format(parseISO(newOrder[0].real_delivery_date), "dd/MM/yyyy")}{" "}
            đến{" "}
            {format(
              parseISO(newOrder[newOrder.length - 1].real_delivery_date),
              "dd/MM/yyyy"
            )}
          </TypoPrint>
        </Stack>
        <Stack sx={{ width: "65%" }}>
          <Table>
            <TableBody sx={{ backgroundColor: "#d9d9d9" }}>
              <TableRow>
                <TableCell>Tên công ty</TableCell>
                <TableCell colSpan={3}>
                  <Typography variant="subtitle1">
                    {customer.company?.company_name}
                  </Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tên Khách hàng</TableCell>
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
    let total = 0;
    let totalDebit = 0;
    let totalCash = 0;
    return (
      <Table sx={{ mt: 3 }}>
        <TableBody>
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
              GHI CHÚ KHÁCH HÀNG
            </TableCell>
          </TableRow>
          {newOrder.map((order, index) => {
            const imgUrl = order?.images?.[0]
              ? getImageToAws(order.images[0])
              : "";
            const isOdd = index % 2 === 0;
            const backgroundColor = isOdd ? "#e9e9e9" : "#d9d9d9";
            total += getTotalDebitWithNoDeposite(order);
            if (order.deposite) {
              totalDebit += order.deposite;
            }
            if (order.cash) {
              totalCash += order.cash;
            }
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
                <StyledCell sx={{ width: 250 }}>
                  <Typography variant="body2" fontWeight={600}>
                    {order.order_no}
                  </Typography>
                  <Typography variant="body2">
                    Ngày tạo đơn:{" "}
                    <TypoSxBold>
                      {format(parseISO(order.created_time), "dd/MM/yyyy hh:mm")}
                    </TypoSxBold>
                  </Typography>
                  <Typography variant="body2">
                    Ngày giao hàng:{" "}
                    <TypoSxBold>
                      {format(
                        parseISO(order.real_delivery_date),
                        "dd/MM/yyyy hh:mm"
                      )}
                    </TypoSxBold>
                  </Typography>
                  <Typography variant="body2">
                    {order?.category?.category_name} - {order?.name} -{" "}
                    {order?.paper?.paper_name}
                  </Typography>
                </StyledCell>
                <StyledCell>
                  <Typography variant="body2">
                    Kích thước: <TypoSxBold>{order.method}</TypoSxBold>
                  </Typography>
                  <Typography variant="body2">
                    SL Mẫu: <TypoSxBold>{order.template_number}</TypoSxBold>
                  </Typography>
                  <Typography variant="body2">
                    SL In: <TypoSxBold>{order.quantity}</TypoSxBold>
                  </Typography>
                  <Typography variant="body2">
                    Đơn giá:{" "}
                    <TypoSxBold>{fNumber(order.unit_price)}</TypoSxBold>
                  </Typography>
                </StyledCell>
                <StyledCell>
                  <Typography variant="body2">
                    Thành tiền:{" "}
                    <TypoSxBold>
                      {fNumber(getTotalDebitWithNoDeposite(order))}
                    </TypoSxBold>
                  </Typography>
                  {order.other_fee ? (
                    <Typography variant="body2">
                      Chi phí khác:{" "}
                      <TypoSxBold>{fNumber(order?.other_fee || 0)}</TypoSxBold>
                    </Typography>
                  ) : null}
                  {order.vat_fee ? (
                    <Typography variant="body2">
                      Phí VAT:{" "}
                      <TypoSxBold>
                        {fNumber(getTotalVatFee(order || 0))}
                      </TypoSxBold>
                    </Typography>
                  ) : null}
                  {order.discount ? (
                    <Typography variant="body2">
                      Giảm giá:{" "}
                      <TypoSxBold>{fNumber(order?.discount || 0)}</TypoSxBold>
                    </Typography>
                  ) : null}
                  <Typography variant="body2">
                    Tạm ứng:{" "}
                    <TypoSxBold>
                      {fNumber(order?.deposite + order?.cash)}
                    </TypoSxBold>
                  </Typography>
                  <Typography variant="body2">Còn lại:</Typography>
                  <Typography variant="h5" textAlign="center">
                    {fNumber(getTotalDebit(order))}
                  </Typography>
                </StyledCell>
                <StyledCell></StyledCell>
              </TableRow>
            );
          })}
          <TableRow sx={{ backgroundColor: "#c2c2c2" }}>
            <TableCell colSpan={4}>
              <Typography variant="h4" textAlign="right">
                Tổng cộng:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4" textAlign="center">
                {fNumber(total)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: "#c2c2c2" }}>
            <TableCell colSpan={4}>
              <Typography variant="h4" textAlign="right">
                Đã thanh toán:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4" textAlign="center">
                {fNumber(totalDebit + totalCash)}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: "#c2c2c2" }}>
            <TableCell colSpan={4}>
              <Typography variant="h4" textAlign="right">
                Còn lại phải thu:
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h4" textAlign="center">
                {fNumber(total - (totalDebit + totalCash))}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
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
          }
          tr:last-child td {
            border-bottom: 1px solid white !important;
          }
          td {
            font-weight: bold;
          }
        }
      `}
      </style>
      {sectionHeader()}
      {sectionCustomer()}
      {sectionBody()}
    </Stack>
  );
});
export default PrintOrdersV2;
