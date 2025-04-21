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
import { format } from "date-fns";
import { cloneDeep } from "lodash";
import { fNumber } from "utils/formatNumber";
import {
  getTotalDebit,
  getTotalBasicFee,
  convertNumberToVietnameseText,
  getDataOutsource,
  getTotalVatFee,
  getTotalDebitWithNoDeposite,
} from "utils/utility";
import { getImageToAws } from "utils/imageHandler";
type IProps = {
  data: IResOrderListDetail[];
};

const TypoPrint = styled(Typography)(() => ({
  color: "#000",
  // fontSize: "12px",
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
const RetailBillV2 = forwardRef(({ data = [] }: IProps, ref) => {
  if (data.length < 1) return <></>;
  const { customer } = data[0];

  const newOrder = cloneDeep(data[0]);
  const sectionHeader = () => (
    <Stack flexDirection="row" justifyContent="space-between" sx={{ mt: 1 }}>
      <img src={Images.logoPrint} width="30%" height="50%" />
      <Box>
        <TypoPrint variant="body2" gutterBottom textAlign="right" sx={{ m: 0 }}>
          <b>CÔNG TY TNHH SẢN XUẤT THƯƠNG MẠI DỊCH VỤ IN ẤN TOÀN TÂM</b>
        </TypoPrint>
        <Stack flexDirection="row" justifyContent="flex-end">
          <TypoPrint
            variant="body2"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            VP: 265B Trịnh Đình Trọng, phường Hòa Thạnh, quận Tân Phú, TPHCM
          </TypoPrint>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end">
          <TypoPrint
            variant="body2"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            Xưởng: 97/3 Đường số 3, P.Bình Hưng Hòa, Q.Bình Tân, TPHCM
          </TypoPrint>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end">
          <TypoPrint
            variant="body2"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            MST: 0313387242 - ĐT: 0903 399 760 - Email: inantoantam@gmaiil.com
          </TypoPrint>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end">
          <TypoPrint
            variant="body2"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            Web: inantoantam.com
          </TypoPrint>
        </Stack>
      </Box>
    </Stack>
  );

  const sectionChildTitle = () => {
    return (
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 1 }}
      >
        <Box>
          <TypoPrint variant="h2">HOÁ ĐƠN BÁN HÀNG</TypoPrint>
          <TypoPrint variant="h6">
            Ngày: {format(new Date(), "dd/MM/yyyy")}
          </TypoPrint>
        </Box>
        <TypoPrint
          variant="h3"
          textAlign="center"
          sx={{
            border: "2px solid rgba(0,0,0, 1)",
            px: 2,
            py: 1,
            fontWeight: "bold",
          }}
        >
          {newOrder.order_no}
        </TypoPrint>
      </Stack>
    );
  };

  const sectionChildCustomer = () => {
    // return (
    //   <Table>
    //     <TableBody></TableBody>
    //     <TableRow>
    //       <StyledCell sx={{ fontWeight: "bold" }}>Tên sản phẩm</StyledCell>
    //       <StyledCell sx={{ fontWeight: "bold" }}>Tên KH:</StyledCell>
    //       <StyledCell>{customer.name}</StyledCell>
    //       <StyledCell sx={{ fontWeight: "bold" }}>Điện thoại:</StyledCell>
    //       <StyledCell>{customer.phone}</StyledCell>
    //     </TableRow>
    //     <TableRow>
    //       <StyledCell rowSpan={2}>{newOrder.name}</StyledCell>
    //       <StyledCell sx={{ fontWeight: "bold" }}>Địa chỉ:</StyledCell>
    //       <StyledCell colSpan={3}>
    //         {customer.address}, {customer.ward}, {customer.district},{" "}
    //         {customer.city}
    //       </StyledCell>
    //     </TableRow>
    //     <TableRow>
    //       <StyledCell sx={{ fontWeight: "bold" }}>Tên Cty:</StyledCell>
    //       <StyledCell colSpan={3}>{customer.company?.company_name}</StyledCell>
    //     </TableRow>
    //   </Table>
    // );
    return (
      <Box sx={{ m: 0.5, width: "calc(100% - 5px)" }}>
        <Table sx={{ tableLayout: "fixed", border: "0px" }}>
          <TableBody>
            <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
              <TableCell
                sx={{ width: "100px", padding: 1 }}
                className="custom-table-cell left"
              >
                Tên KH:
              </TableCell>
              <TableCell className="custom-table-cell left" sx={{ padding: 1 }}>
                <TypoPrint>{customer.name}</TypoPrint>
              </TableCell>
              <TableCell className="custom-table-cell left" sx={{ padding: 1 }}>
                Điện thoại:
              </TableCell>
              <TableCell
                className="custom-table-cell left"
                sx={{ fontWeight: "normal", padding: 1 }}
              >
                <TypoPrint>{customer.phone}</TypoPrint>
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
              <TableCell
                sx={{ width: "100px", padding: 1 }}
                className="custom-table-cell left"
              >
                Địa chỉ:
              </TableCell>
              <TableCell
                className="custom-table-cell left"
                colSpan={3}
                sx={{ padding: 1 }}
              >
                <TypoPrint>
                  {customer.address}, {customer.ward}, {customer.district},{" "}
                  {customer.city}
                </TypoPrint>
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
              <TableCell
                sx={{ width: "100px", padding: 1 }}
                className="custom-table-cell left"
              >
                Tên Cty:
              </TableCell>
              <TableCell
                className="custom-table-cell left"
                colSpan={3}
                sx={{ padding: 1 }}
              >
                <TypoPrint>{customer.company?.company_name}</TypoPrint>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    );
  };

  // const sectionChildProduct = () => {
  //   const imgUrl = getImageToAws(newOrder.images[0]);
  //   return (
  //     <Table sx={{ mt: 2 }}>
  //       <TableBody>
  //         <TableRow>
  //           <StyledCell width={150} rowSpan={10} sx={{ verticalAlign: "top" }}>
  //             <img
  //               alt="imageOrder"
  //               src={imgUrl}
  //               width={"100%"}
  //               height={"100%"}
  //             />
  //             <StyledCell colSpan={2}>
  //               Ghi chú: {newOrder.order_detail_notes}
  //             </StyledCell>
  //           </StyledCell>
  //           <StyledCell>SL Mẫu</StyledCell>
  //           <StyledCell>Số lượng</StyledCell>
  //           <StyledCell>Đơn giá</StyledCell>
  //           <StyledCell>Thành tiền</StyledCell>
  //           <StyledCell>Chi phí khác</StyledCell>
  //           <StyledCell>Chiết khấu</StyledCell>
  //           <StyledCell>Tạm ứng</StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell>{fNumber(newOrder.template_number)}</StyledCell>
  //           <StyledCell>{fNumber(newOrder.quantity)}</StyledCell>
  //           <StyledCell>{fNumber(newOrder.unit_price)}</StyledCell>
  //           <StyledCell>{fNumber(getTotalDebit(newOrder))}</StyledCell>
  //           <StyledCell>{fNumber(newOrder.other_fee || 0)}</StyledCell>
  //           <StyledCell>{fNumber(newOrder.discount || 0)}</StyledCell>
  //           <StyledCell>{fNumber(newOrder.deposite || 0)}</StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell rowSpan={4} colSpan={4}>
  //             {sectionProductionInfo()}
  //           </StyledCell>
  //           <StyledCell>VAT:</StyledCell>
  //           <StyledCell>8%</StyledCell>
  //           <StyledCell>56000</StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={2}>TỔNG</StyledCell>
  //           <StyledCell sx={{ fontWeight: "bold" }}>
  //             {fNumber(getTotalFee(newOrder))}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={2}>CÒN LẠI PHẢI THU</StyledCell>
  //           <StyledCell sx={{ fontWeight: "bold" }}>
  //             {fNumber(getTotalDebit(newOrder))}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={3} sx={{ fontWeight: "bold" }}>
  //             {convertNumberToVietnameseText(getTotalDebit(newOrder))}
  //           </StyledCell>
  //         </TableRow>
  //         {/* <TableRow>
  //           <StyledCell colSpan={2}>Kích thước TP:</StyledCell>
  //           <StyledCell colSpan={2} sx={{ fontWeight: "bold" }}>
  //             {newOrder.method}
  //           </StyledCell>
  //           <StyledCell colSpan={2}>TỔNG</StyledCell>
  //           <StyledCell>{fNumber(getTotalFee(newOrder))}</StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={2}>Loại hàng:</StyledCell>
  //           <StyledCell colSpan={2} sx={{ fontWeight: "bold" }}>
  //             {newOrder?.category?.category_name}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={2}>Loại giấy:</StyledCell>
  //           <StyledCell colSpan={2} sx={{ fontWeight: "bold" }}>
  //             {newOrder?.paper?.paper_name}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={2}>Kiểu in:</StyledCell>
  //           <StyledCell colSpan={2} sx={{ fontWeight: "bold" }}>
  //             {newOrder?.print_types.map((e) => e.print_type_name)}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={2}>Tráng phủ:</StyledCell>
  //           <StyledCell colSpan={2}>
  //             {findValueTrangPhu?.map((e) => e.name).join(", ") || "Không"}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={2}>Gia công sau in: </StyledCell>
  //           <StyledCell colSpan={2}>
  //             {findValueAfterOutsource?.map((e) => e.name).join(", ") ||
  //               "Không"}
  //           </StyledCell>
  //         </TableRow> */}
  //         {/* <TableRow>
  //           <StyledCell>Chi phí khác</StyledCell>
  //           <StyledCell sx={{ fontWeight: "bold" }}>
  //             {fNumber(newOrder.other_fee || 0)}
  //           </StyledCell>
  //           <StyledCell>TỔNG:</StyledCell>
  //           <StyledCell colSpan={2} sx={{ fontWeight: "bold" }}>
  //             {fNumber(getTotalFee(newOrder)) +
  //               fNumber(newOrder.other_fee || 0)}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell>TẠM ỨNG</StyledCell>
  //           <StyledCell sx={{ fontWeight: "bold" }}>
  //             {fNumber(newOrder.deposite || 0)}
  //           </StyledCell>
  //           <StyledCell>VAT:</StyledCell>
  //           <StyledCell colSpan={2} sx={{ fontWeight: "bold" }}>
  //             {fNumber(newOrder.vat_fee || 0)}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell>CÒN LẠI PHẢI THU</StyledCell>
  //           <StyledCell sx={{ fontWeight: "bold" }}>
  //             {fNumber(getTotalDebit(newOrder))}
  //           </StyledCell>
  //           <StyledCell colSpan={3} sx={{ fontWeight: "bold" }}>
  //             {convertNumberToVietnameseText(getTotalDebit(newOrder))}
  //           </StyledCell>
  //         </TableRow> */}
  //       </TableBody>
  //     </Table>
  //   );
  // };

  // // Thông tin sản xuất
  // const sectionProductionInfo = () => {
  //   // const imgUrl = getImageToAws(newOrder.images[0]);
  //   const { dataGroupOutsources } = getDataOutsource(newOrder.outsources);
  //   const findValueTrangPhu = dataGroupOutsources["Tráng phủ"];
  //   const findValueAfterOutsource = dataGroupOutsources["Gia Công Sau In"];

  //   return (
  //     <Table sx={{ mt: 0 }}>
  //       <TableBody>
  //         <TableRow>
  //           <StyledCell colSpan={2} sx={{ fontWeight: "bold" }}>
  //             Thông tin sản xuất
  //           </StyledCell>
  //           {/* <StyledCell sx={{ textAlign: "center", width: "40%" }} rowSpan={8}>
  //             <img alt="imageOrder" src={imgUrl} width={400} height={200} />
  //           </StyledCell> */}
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell>Kích thước TP:</StyledCell>
  //           <StyledCell sx={{ fontWeight: "bold" }}>
  //             {newOrder.method}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell>Loại hàng:</StyledCell>
  //           <StyledCell sx={{ fontWeight: "bold" }}>
  //             {newOrder?.category?.category_name}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell>Loại giấy:</StyledCell>
  //           <StyledCell sx={{ fontWeight: "bold" }}>
  //             {newOrder?.paper?.paper_name}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell>Kiểu in:</StyledCell>
  //           <StyledCell sx={{ fontWeight: "bold" }}>
  //             {newOrder?.print_types.map((e) => e.print_type_name)}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={2}>
  //             Tráng phủ: {findValueTrangPhu?.map((e) => e.name).join(", ")}
  //           </StyledCell>
  //         </TableRow>
  //         <TableRow>
  //           <StyledCell colSpan={2}>
  //             Gia công sau in:{" "}
  //             {findValueAfterOutsource?.map((e) => e.name).join(", ")}
  //           </StyledCell>
  //         </TableRow>
  //         {/* <TableRow>
  //           <StyledCell colSpan={2}>
  //             Ghi chú: {newOrder.order_detail_notes}
  //           </StyledCell>
  //         </TableRow> */}
  //       </TableBody>
  //     </Table>
  //   );
  // };

  // const sectionBody = () => {
  //   return (
  //     <Stack>
  //       {sectionChildTitle()}
  //       {sectionChildCustomer()}
  //       {sectionChildProduct()}
  //       {/* {sectionProductionInfo()} */}
  //     </Stack>
  //   );
  // };

  // return (
  //   // @ts-ignore
  //   <Stack ref={ref}>
  //      <style type="text/css" media="print">
  //        {" @page { size: portrait; } "}
  //      </style>
  //     {sectionHeader()}
  //     {sectionBody()}
  //   </Stack>
  // );

  const sectionChildOutsource = () => {
    const { dataGroupOutsources } = getDataOutsource(newOrder.outsources);
    const findValueTrangPhu = dataGroupOutsources["Tráng phủ"];
    const findValueAfterOutsource = dataGroupOutsources["Gia Công Sau In"];
    const imgUrl = getImageToAws(newOrder?.images?.[0]);
    return (
      <Table sx={{ backgroundColor: "#f3f3f3", width: "100%" }}>
        <TableBody>
          <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
            <TableCell colSpan={2} className="custom-table-cell" width={"50%"}>
              Thông tin sản xuất
            </TableCell>
            <TableCell
              rowSpan={7}
              className="custom-table-cell"
              sx={{ backgroundColor: "#f3f3f3" }}
            >
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
                <img alt="imageOrder" src={imgUrl} width={400} height={200} />
              </Box>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              Kích thước TP
            </TableCell>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              {newOrder.method}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              Loại hàng
            </TableCell>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              {newOrder?.category?.category_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              Loại giấy
            </TableCell>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              {newOrder?.paper?.paper_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              Kiểu in
            </TableCell>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              {newOrder?.print_types.map((e) => e.print_type_name)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              Tráng phủ
            </TableCell>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              {findValueTrangPhu?.map((e) => e.name).join(", ")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell
              colSpan={2}
              sx={{ padding: 0 }}
              className="custom-table-cell left"
            >
              Gia công sau in:{" "}
              {findValueAfterOutsource?.map((e) => e.name).join(", ")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} className="custom-table-cell left">
              {newOrder.order_detail_notes}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  const BillTable = () => {
    return (
      <Box sx={{ m: 0.5, width: "calc(100% - 5px)" }}>
        <Table sx={{ tableLayout: "fixed", border: "0px" }}>
          <TableHead>
            <TableRow>
              <TableCell
                className="custom-table-cell header"
                sx={{ width: "260px" }}
              >
                Tên sản phẩm
              </TableCell>
              <TableCell
                className="custom-table-cell header"
                sx={{ width: "88px" }}
              >
                SL mẫu
              </TableCell>
              <TableCell
                className="custom-table-cell header"
                sx={{ width: "115px", p: "5px !important" }}
              >
                SL in
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell header"
                sx={{ width: "170px" }}
              >
                Đơn giá
              </TableCell>
              <TableCell
                className="custom-table-cell header"
                sx={{ width: "115px" }}
              >
                Thành tiền
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ borderBottom: "2px solid #fff" }}>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell className="custom-table-cell body">
                {newOrder.name}
              </TableCell>
              <TableCell className="custom-table-cell body">
                {fNumber(newOrder.template_number)}
              </TableCell>
              <TableCell className="custom-table-cell body">
                {fNumber(newOrder.quantity)}
              </TableCell>
              <TableCell colSpan={2} className="custom-table-cell body">
                {fNumber(newOrder.unit_price)}
              </TableCell>
              <TableCell className="custom-table-cell body">
                {fNumber(getTotalBasicFee(newOrder))}
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell className="custom-table-cell background-cell">
                Chi phí khác
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                {newOrder.other_fee || 0}
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                Giảm giá
              </TableCell>
              <TableCell className="custom-table-cell background-cell">
                {newOrder.discount || 0}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className="custom-table-cell background-cell"
                sx={{ fontWeight: "bold" }}
              >
                VAT: {newOrder.vat_fee}
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                {getTotalVatFee(newOrder)}
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                Tạm ứng
              </TableCell>
              <TableCell className="custom-table-cell background-cell">
                {fNumber(newOrder.deposite)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="custom-table-cell background-cell">
                TỔNG:
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                {fNumber(getTotalDebitWithNoDeposite(newOrder))}
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                Còn lại phải thu
              </TableCell>
              <TableCell className="custom-table-cell background-cell">
                {fNumber(getTotalDebit(newOrder))}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={6}
                className="custom-table-cell background-cell"
              >
                <Typography>
                  {convertNumberToVietnameseText(getTotalDebit(newOrder))}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    );
  };

  const BillApp = () => {
    return (
      <Box>
        {sectionHeader()}
        {sectionChildTitle()}
        {sectionChildCustomer()}
        <BillTable />
        {/* {sectionNoteAndImg()} */}
        {sectionChildOutsource()}
      </Box>
    );
  };

  return (
    <Box ref={ref}>
      <link href="https://fonts.cdnfonts.com/css/utm-avo" rel="stylesheet"/>
      <style type="text/css" media="print">
        {` 
          @page { size: portrait; margin: 5mm; } 
          body {zoom: 70%;}
          // table, th, td {
          //     border: 1px solid white !important;
          //     border-collapse: collapse !important;
          //     font-family: "UTM Avo", sans-serif !important;
          //   }
          //   tr:last-child td {
          //     border-bottom: 1px solid white !important;
          //   }
          //   td {
          //     font-weight: bold;
          //     font-family: "UTM Avo", sans-serif !important;
          //   }
          //   .background-cell {
          //     background-color: #f3f3f3;
          //   }
          //   .custom-table-cell {
          //     text-align: center;
          //     padding-left: 10px;
          //     font-weight: bold;
          //     color: #000;
          //     font-family: "UTM Avo", sans-serif !important;
          //   }
          //   .left {
          //     text-align: left;
          //   }
          //   .custom-table-cell.header {
          //     background-color: #d9d9d9;
          //   }
          //   .custom-table-cell.body {
          //     border-top: none;
          //     border-bottom: none;
          //   }
          @media print {
            table, th, td {
              border: 1px solid white !important;
              border-collapse: collapse !important;
              font-family: "UTM Avo", sans-serif !important;
            }
            tr:last-child td {
              border-bottom: 1px solid white !important;
            }
            td {
              font-weight: bold;
              font-family: "UTM Avo", sans-serif !important;
            }
            .background-cell {
              background-color: #f3f3f3;
            }
            .custom-table-cell {
              text-align: center;
              padding-left: 10px;
              font-weight: bold;
              color: #000;
              font-family: "UTM Avo", sans-serif !important;
            }
            .left {
              text-align: left;
            }
            .custom-table-cell.header {
              background-color: #d9d9d9;
            }
            .custom-table-cell.body {
              border-top: none;
              border-bottom: none;
            }
          }
      `}
      </style>
      <BillApp />
    </Box>
  );
});

export default RetailBillV2;
