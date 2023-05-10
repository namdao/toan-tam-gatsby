import authLangs from "scenes/auth/langs/vi";
import orderLangs from "scenes/orders/langs/vi";
import userLangs from "scenes/users/langs/vi";
import customerLangs from "scenes/customer/langs/vi";
import companyLangs from "scenes/company/langs/vi";
import printTypeLangs from "scenes/printtype/langs/vi";
import categoryLangs from "scenes/categories/langs/vi";
import paperLangs from "scenes/papers/langs/vi";
import outsourceLangs from "scenes/outsources/langs/vi";
import statisticLangs from "scenes/statistic/langs/vi";
const vi = {
  hi: "Xin chào",
  logout: "Đăng xuất",
  logoutSuccess: "Đăng xuất thành công",
  logoutFail: "Đăng xuất thất bại",
  wellcomeCompany: "Chào mừng đến với Toàn Tâm Print Pro Co.,Ltd",
  permissionDenied: "Bạn không có quyền truy cập!!!",
  notfound: "Không tìm thấy trang bạn truy cập!",
  gotoHome: "Về trang chủ",
  basicInfo: {
    title: "Thông tin chung",
    user: {
      title: "Quản lý user",
      list: "Danh sách user",
      add: "Thêm user",
      update: "Cập nhật user",
      view: "Xem user",
      profile: "Thông tin cá nhân",
    },
    customer: {
      title: "Quản lý khách hàng",
      list: "Danh sách khách hàng",
      add: "Thêm khách hàng",
      update: "Cập nhật khách hàng",
      view: "Xem khách hàng",
    },
    company: {
      title: "Quản lý công ty",
      list: "Danh sách công ty",
      add: "Thêm công ty",
      update: "Cập nhật công ty",
      view: "Xem công ty",
    },
    printType: {
      title: "Quản lý kiểu in",
      list: "Danh sách kiểu in",
      add: "Thêm kiểu in",
      update: "Cập nhật kiểu in",
      view: "Xem kiểu in",
    },
    categories: {
      title: "Danh mục hàng hóa",
      list: "Danh sách danh mục",
      add: "Thêm danh mục",
      update: "Cập nhật danh mục",
      view: "Xem danh mục",
    },
    paperType: {
      title: "Quản lý loại giấy",
      list: "Danh sách loại giấy",
      add: "Thêm loại giấy",
      update: "Cập nhật loại giấy",
      view: "Xem loại giấy",
    },
    outsource: {
      title: "Quản lý gia công",
      list: "Danh sách gia công",
      add: "Thêm gia công",
      update: "Cập nhật gia công",
      view: "Xem gia công",
    },
  },
  order: {
    title: "Đơn hàng",
    detail: "Chi tiết đơn hàng",
    update: "Cập nhật đơn hàng",
    search: "Tìm kiếm đơn hàng",
    processing: "Đơn hàng đang thực hiện",
    needPaid: "Đơn hàng cần thanh toán",
    needCheck: "Đơn hàng cần kiểm tra",
    needConfirm: "Đơn hàng cần xác nhận",
    stored: "Đơn hàng lưu kho",
    waitingPrint: "Đơn hàng chờ in",
    printing: "Đơn hàng đang in",
  },
};

export default {
  ...vi,
  auth: authLangs,
  orders: orderLangs,
  users: userLangs,
  customer: customerLangs,
  company: companyLangs,
  printtype: printTypeLangs,
  category: categoryLangs,
  paper: paperLangs,
  outsource: outsourceLangs,
  statistic: statisticLangs,
};
