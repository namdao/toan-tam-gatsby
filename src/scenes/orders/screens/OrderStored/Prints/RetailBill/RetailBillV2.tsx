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
  fontFamily: "UTM Avo !important",
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
                <TypoPrint sx={{ fontWeight: "bold" }}>
                  {customer.name}
                </TypoPrint>
              </TableCell>
              <TableCell className="custom-table-cell left" sx={{ padding: 1 }}>
                Điện thoại:
              </TableCell>
              <TableCell
                className="custom-table-cell left"
                sx={{ padding: 1 }}
              >
                <TypoPrint sx={{ fontWeight: "bold" }}>
                  {customer.phone}
                </TypoPrint>
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
                <TypoPrint sx={{ fontWeight: "bold" }}>
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
                <TypoPrint sx={{ fontWeight: "bold" }}>
                  {customer.company?.company_name}
                </TypoPrint>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    );
  };

  const sectionChildOutsource = () => {
    const { dataGroupOutsources } = getDataOutsource(newOrder.outsources);
    const findValueTrangPhu = dataGroupOutsources["Tráng phủ"];
    const findValueAfterOutsource = dataGroupOutsources["Gia Công Sau In"];
    const imgUrl = getImageToAws(newOrder?.images?.[0]);
    return (
      <Table sx={{ backgroundColor: "#f3f3f3", width: "100%" }}>
        <TableBody>
          <TableRow sx={{ backgroundColor: "#d9d9d9" }}>
            <TableCell colSpan={2} className="custom-table-cell" width={"50%"} sx={{ fontWeight: "bold" }}>
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
            <TableCell sx={{ padding: 0, fontWeight: "bold"  }} className="custom-table-cell left">
              Kích thước TP
            </TableCell>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              {newOrder.method}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0, fontWeight: "bold"  }} className="custom-table-cell left">
              Loại hàng
            </TableCell>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              {newOrder?.category?.category_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0,fontWeight: "bold"  }} className="custom-table-cell left">
              Loại giấy
            </TableCell>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              {newOrder?.paper?.paper_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0,fontWeight: "bold"  }} className="custom-table-cell left">
              Kiểu in
            </TableCell>
            <TableCell sx={{ padding: 0 }} className="custom-table-cell left">
              {newOrder?.print_types.map((e) => e.print_type_name)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ padding: 0, fontWeight: "bold"  }} className="custom-table-cell left">
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
              <b>Gia công sau in:{" "}</b>
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
                sx={{ width: "260px", fontWeight: "bold" }}
              >
                Tên sản phẩm
              </TableCell>
              <TableCell
                className="custom-table-cell header"
                sx={{ width: "88px", fontWeight: "bold" }}
              >
                SL mẫu
              </TableCell>
              <TableCell
                className="custom-table-cell header"
                sx={{ width: "115px", p: "5px !important", fontWeight: "bold" }}
              >
                SL in
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell header"
                sx={{ width: "100px", fontWeight: "bold" }}
              >
                Đơn giá
              </TableCell>
              <TableCell
                className="custom-table-cell header"
                sx={{ width: "130px", fontWeight: "bold" }}
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
              <TableCell className="custom-table-cell body" sx={{ fontWeight: "bold" }}>
                {fNumber(getTotalBasicFee(newOrder))}
              </TableCell>
            </TableRow>
            <TableRow sx={{ backgroundColor: "#f3f3f3" }}>
              <TableCell className="custom-table-cell background-cell right" sx={{ fontWeight: "bold" }}>
                Chi phí khác
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                {fNumber(newOrder.other_fee || 0)}
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell right"
                sx={{ fontWeight: "bold" }}
              >
                Giảm giá
              </TableCell>
              <TableCell className="custom-table-cell background-cell">
                {fNumber(newOrder.discount || 0)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className="custom-table-cell background-cell right"
                sx={{ fontWeight: "bold" }}
              >
                VAT: {newOrder.vat_fee} %
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell"
              >
                {fNumber(getTotalVatFee(newOrder))}
              </TableCell>
              <TableCell
                colSpan={2}
                className="custom-table-cell background-cell right"
                sx={{ fontWeight: "bold" }}
              >
                Tạm ứng
              </TableCell>
              <TableCell className="custom-table-cell background-cell">
                {fNumber(newOrder.deposite)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="custom-table-cell background-cell right" sx={{ fontWeight: "bold" }}>
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
                className="custom-table-cell background-cell right"
                sx={{ fontWeight: "bold" }}
              >
                Còn lại phải thu
              </TableCell>
              <TableCell className="custom-table-cell background-cell" sx={{ fontWeight: "bold" }}>
                {fNumber(getTotalDebit(newOrder))}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                colSpan={6}
                className="custom-table-cell background-cell"
              >
                <Typography sx={{ fontFamily: "UTM Avo !important" }}>
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
      {/* <link href="https://fonts.cdnfonts.com/css/utm-avo" rel="stylesheet" /> */}
      <style type="text/css" media="print">
        {` 
          @page { size: portrait; margin: 5mm; } 
          body {zoom: 70%;}
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
              font-family: "UTM Avo", sans-serif !important;
            }
            .background-cell {
              background-color: #f3f3f3;
            }
            .custom-table-cell {
              text-align: center;
              padding-left: 10px;
              color: #000;
              font-family: "UTM Avo", sans-serif !important;
            }
            p {
              font-family: "UTM Avo", sans-serif !important;
            }
            .left {
              text-align: left;
            }
            .right {
              text-align: right;
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
