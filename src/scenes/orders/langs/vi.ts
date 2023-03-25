const OrderLangs = {
  orderProcessing: {
    title: "Đơn hàng đang thực hiện",
    detail: "Chi tiết đơn hàng {{orderId}}",
    update: "Cập nhật đơn hàng {{orderId}}",
    totalDebit: "{{money}} VNĐ",
    designed: "Đã thiết kế",
    waitingPrint: "Chờ in",
    printed: "Đã in",
    cancel: "Đã hủy",
    draft: "Nháp",
  },
  filterBy: "Tìm theo",
  searchBy: "Tìm kiếm",
  searchByPlaceHolder: "Tìm kiếm đơn hàng",
  createdDate: "Ngày tạo",
  updatedDate: "Ngày cập nhật",
  name: "đơn",
  delete: "Xoá",
  filterGroup: {
    all: "Tất cả",
    customerName: "Tên khách hàng",
    companyName: "Tên công ty",
    orderNo: "Mã đơn hàng",
    orderFile: "Tên file",
  },
  orderDetail: {
    customer: {
      title: "Thông tin khách hàng",
      name: "Tên khách hàng:",
      email: "Email:",
      phone: "Số điện thoại:",
      company: "Tên công ty:",
    },
    delivery: {
      title: "Thông tin giao hàng",
      name: "Tên người nhận:",
      phone: "Số điện thoại:",
      address: "Địa chỉ:",
      receiveDay: "Ngày nhận hàng:",
      deliveryDay: "Ngày giao hàng:",
    },
    info: {
      title: "Thông tin đơn hàng:",
      name: "Tên đơn hàng:",
      category: "Loại hàng:",
      paper: "Loại giấy:",
      printType: "Kiểu in:",
      method: "Kích thước:",
      numPrintFace: "Cán màng:",
      outsource: "Gia công khác:",
    },
    price: {
      title: "Giá trị đơn hàng",
      template: "Số lượng mẫu",
      quantity: "Số lượng in",
      unitPrice: "Đơn giá",
      designFee: "Phí thiết kế",
      shippingFee: "Phí ship",
      deposite: "Tạm ứng",
      amount: "Thành tiền:",
    },
    employee: {
      title: "Thông tin phụ trách đơn hàng",
      creator: "Nhân viên tạo PO:",
      handler: "Nhân viên xử lý:",
      warehouseStaff: "Nhân viên lưu kho:",
      noHandler: "Chưa có nhân viên phụ trách",
      dateCreatePO: "Ngày tạo PO:",
      dateHandlerPO: "Ngày xử lý:",
      dateStorePO: "Ngày lưu kho:",
    },
  },
};
export default OrderLangs;
