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
  orderUpdate: {
    error: {
      notes: "Vui lòng nhập ghi chú",
      paymentMethod: "Vui lòng chọn phương thức thanh toán",
      whoCollectionMoney: "Vui lòng nhập tên người thu tiền",
      number: "Chỉ được nhập số",
      orderProcessing: "Cập nhật đơn hàng thất bại",
      paymentType: "Vui lòng chọn phương thức thu tiền",
      dateCollectMoney: "Vui lòng chọn ngày thu tiền",
      companyDebit: "Vui lòng nhập số tiền công ty bù",
    },
    success: {
      orderProcessing: "Cập nhật đơn hàng thành công",
    },
    form: {
      paymentMethod: "Phương thức thanh toán",
      amount: "Tổng tiền",
      deposite: "Tạm ứng",
      note: "Ghi chú",
      cod: "Còn lại phải thu",
      cash: "Đã thu tiền",
      dayCollectMoney: "Ngày thu",
      moneySource: "Nguồn thu",
      whoCollectionMoney: "Người thu tiền",
      companyDebit: "Công ty bù số tiền thiếu",
      otherFee: "Chi phí khác",
      vatFee: "% VAT",
      vatFeeNumber: "Phí VAT",
      discount: "Giảm giá",
    },
    save: "Cập nhật",
  },
  orderNeedCollect: {
    title: "Đơn hàng cần thanh toán",
    totalMoneyReceive: "Tổng tiền phải thu: {{money}}",
    filterCustomer: "Lọc khách hàng",
    debit: "Công nợ",
    emailDebit: "Gửi email công nợ",
    error: {
      notSupportMultiCustomer: "Chưa hổ trợ nhiều khách hàng",
      printFail: "In thất bại",
      sendEmailFail: "Gửi email thất bại",
    },
    success: {
      sendEmail: "Gửi email thành công",
    },
  },
  orderNeedCheck: {
    title: "Đơn hàng cần kiểm tra",
  },
  orderNeedConfirm: {
    title: "Đơn hàng cần xác nhận",
  },
  orderStore: {
    title: "Đơn hàng lưu kho",
    tabStored: "Lưu kho",
    tabDelivery: "Đang giao hàng",
    btnBillDelivery: "Biên bản GH",
    btnBillDelivery2: "Biên bản GH V2",
    btnRetailBill: "Hoá đơn bán hàng"
  },
  orderSearch: {
    title: "Tìm kiếm đơn hàng",
    method: "Kích thước",
    file: "Tên file",
    paper: "Loại giấy",
  },
};
export default OrderLangs;
