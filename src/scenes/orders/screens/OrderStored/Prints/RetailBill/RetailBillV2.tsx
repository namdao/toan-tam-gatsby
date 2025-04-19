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
  getTotalFee,
  convertNumberToVietnameseText,
  getDataOutsource,
  getTotalVatFee,
} from "utils/utility";
import { getImageToAws } from "utils/imageHandler";
type IProps = {
  data: IResOrderListDetail[];
};

const TypoPrint = styled(Typography)(() => ({
  color: "#000",
  fontSize: "12px",
}));

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
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            VP: 265B Trịnh Đình Trọng, phường Hòa Thạnh, quận Tân Phú, TPHCM
          </TypoPrint>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end">
          <TypoPrint
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            Xưởng: 97/3 Đường số 3, P.Bình Hưng Hòa, Q.Bình Tân, TPHCM
          </TypoPrint>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end">
          <TypoPrint
            variant="body1"
            gutterBottom
            textAlign="right"
            sx={{ m: 0, pl: 1 }}
          >
            MST: 0313387242 - ĐT: 0903 399 760 - Email: inantoantam@gmaiil.com
          </TypoPrint>
        </Stack>
        <Stack flexDirection="row" justifyContent="flex-end">
          <TypoPrint
            variant="body1"
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
          <TypoPrint variant="h6">HOÁ ĐƠN BÁN HÀNG</TypoPrint>
          <TypoPrint variant="h6">
            Ngày: {format(new Date(), "dd/MM/yyyy")}
          </TypoPrint>
        </Box>
        <TypoPrint
          variant="h6"
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
              <TableCell className="custom-table-cell left">
                Tên Khách hàng
              </TableCell>
              <TableCell className="custom-table-cell left">
                <TypoPrint>{customer.name}</TypoPrint>
              </TableCell>
              <TableCell className="custom-table-cell">Điện thoại</TableCell>
              <TableCell
                className="custom-table-cell left"
                sx={{ fontWeight: "normal" }}
              >
                <TypoPrint>{customer.phone}</TypoPrint>
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
              <TableCell className="custom-table-cell left">Địa chỉ</TableCell>
              <TableCell className="custom-table-cell left" colSpan={3}>
                <TypoPrint>
                  {customer.address}, {customer.ward}, {customer.district},{" "}
                  {customer.city}
                </TypoPrint>
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
              <TableCell className="custom-table-cell left">Tên công ty</TableCell>
              <TableCell className="custom-table-cell left" colSpan={3}>
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

    return (
      <Table sx={{ backgroundColor: "#f3f3f3", width: "100%" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
            <TableCell colSpan={2} className="custom-table-cell">
              Thông tin sản xuất
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="custom-table-cell">Kích thước TP</TableCell>
            <TableCell className="custom-table-cell">
              {newOrder.method}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="custom-table-cell">Loại hàng</TableCell>
            <TableCell className="custom-table-cell">
              {newOrder?.category?.category_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="custom-table-cell">Loại giấy</TableCell>
            <TableCell className="custom-table-cell">
              {newOrder?.paper?.paper_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="custom-table-cell">Kiểu in</TableCell>
            <TableCell className="custom-table-cell">
              {newOrder?.print_types.map((e) => e.print_type_name)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="custom-table-cell">Tráng phủ</TableCell>
            <TableCell className="custom-table-cell">
              {findValueTrangPhu?.map((e) => e.name).join(", ")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="custom-table-cell">
              Gia công sau in:{" "}
              {findValueAfterOutsource?.map((e) => e.name).join(", ")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  };

  const sectionNoteAndImg = () => {
    const imgUrl = getImageToAws(newOrder.images[0]);
    return (
      <Table sx={{ tableLayout: "fixed", border: "0px" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
            <TableCell className="custom-table-cell body">
              {newOrder.order_detail_notes}
            </TableCell>
            <TableCell className="custom-table-cell body">
              <img alt="imageOrder" src={imgUrl} width={400} height={200} />
            </TableCell>
          </TableRow>
        </TableHead>
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
                sx={{ width: "231px" }}
              >
                Tên sản phẩm
              </TableCell>
              <TableCell
                className="custom-table-cell header"
                sx={{ width: "115px" }}
              >
                SL mẫu
              </TableCell>
              <TableCell
                className="custom-table-cell header"
                sx={{ width: "58px", p: "5px !important" }}
              >
                SL in
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell header"
                sx={{ width: "115px" }}
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
                {fNumber(newOrder.quantity)}
              </TableCell>
              <TableCell className="custom-table-cell body">
                {fNumber(newOrder.template_number)}
              </TableCell>
              <TableCell colSpan={2} className="custom-table-cell body">
                {fNumber(newOrder.unit_price)}
              </TableCell>
              <TableCell className="custom-table-cell body">
                {fNumber(getTotalFee(newOrder))}
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell
                rowSpan={6}
                colSpan={3}
                className="custom-table-cell background-cell"
              >
                {sectionChildOutsource()}
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                Chi phí khác
              </TableCell>
              <TableCell className="custom-table-cell background-cell">
                {newOrder.other_fee || 0}
              </TableCell>
            </TableRow>
            <TableRow>
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
                VAT
              </TableCell>
              <TableCell
                className="custom-table-cell background-cell"
                sx={{ fontWeight: "bold" }}
              >
                {newOrder.vat_fee}
              </TableCell>
              <TableCell className="custom-table-cell background-cell">
                {getTotalVatFee(newOrder)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                Tạm ứng
              </TableCell>
              <TableCell className="custom-table-cell background-cell">
                {newOrder.deposite}
              </TableCell>
            </TableRow>
            <TableRow>
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
                colSpan={3}
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
        {sectionNoteAndImg()}
      </Box>
    );
  };

  return (
    <Box ref={ref}>
      <style type="text/css" media="print">
      {` 
          @page { size: portrait; margin: 5mm; } 
          body {zoom: 65%;}
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
          .background-cell {
            background-color: #f3f3f3;
          }
          .custom-table-cell {
            text-align: center;
            margin: 5px;
            font-weight: bold;
            color: #000;
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
