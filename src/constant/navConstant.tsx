import React from "react";
import appConstant from "./appConstant";
import { PATH_APP } from "constant/routeConstant";
import Iconify from "components/iconify";
import UserList from "scenes/users/screens/UserList";
import { ICON } from "./layoutConstant";
// Screens
import StatisticsCustomer from "scenes/statistic/screens/StatiscticsCustomer";
import StatisticsSummary from "scenes/statistic/screens/StatisticsSummary";
import StatisticsSale from "scenes/statistic/screens/StatisticsSale";
import UserAdd from "scenes/users/screens/UserAdd";
import CustomerList from "scenes/customer/screens/CustomerList";
import CustomerAdd from "scenes/customer/screens/CustomerAdd";
import CompanyList from "scenes/company/screens/CompanyList";
import CompanyAdd from "scenes/company/screens/CompanyAdd";
import PrintTypeList from "scenes/printtype/screens/PrintTypeList";
import CategoryList from "scenes/categories/screens/CategoryList";
import PaperList from "scenes/papers/screens/PaperList";
import OutsourceList from "scenes/outsources/screens/OutSourcesList";
import OrderSearch from "scenes/orders/screens/OrderSearch";
import OrderProcessing from "scenes/orders/screens/OrderProcessing";
import OrderNeedCollect from "scenes/orders/screens/OrderNeedCollect";
import OrderNeedCheck from "scenes/orders/screens/OrderNeedCheck";
import OrderNeedConfirm from "scenes/orders/screens/OrderNeedConfirm";
import OrderListStored from "scenes/orders/screens/OrderStored";
import OrderDetail from "scenes/orders/screens/OrderDetail";
import OrderUpdate from "scenes/orders/screens/OrderUpdate";
import OrderPrinting from "scenes/orders/screens/OrderPrinting";
import OrderWaitingPrint from "scenes/orders/screens/OrderWaitingPrint";
import DebitCompany from "scenes/statistic/screens/DebitCompany";
import DebitCompanyDetail from "scenes/statistic/screens/DebitCompanyDetail";
import StatiscticsCustomerDetail from "scenes/statistic/screens/StatiscticsCustomerDetail";
import OrderCreate from "scenes/orders/screens/OrderCreate";
import OrderPrinted from "scenes/orders/screens/OrderPrinted";

const { ROLES } = appConstant;
const iconify = (name: string) => <Iconify width={ICON.NAV_ITEM} icon={name} />;

const navConfig = [
  {
    subheader: "statistic.title",
    items: [
      {
        title: "statistic.customer",
        path: PATH_APP.statistic.customer,
        icon: iconify("akar-icons:statistic-up"),
        component: StatisticsCustomer,
        children: [],
        roles: [ROLES.ADMIN],
      },
      {
        title: "statistic.sumary",
        path: PATH_APP.statistic.summary,
        hideMenu: true,
        icon: iconify("tabler:device-desktop-analytics"),
        component: StatisticsSummary,
        children: [],
        roles: [ROLES.ADMIN],
      },
      {
        title: "statistic.invidual",
        path: PATH_APP.statistic.invidual,
        icon: iconify("carbon:analytics-reference"),
        component: StatisticsSale,
        children: [],
        roles: [],
      },
      {
        title: "statistic.debitCompany.title",
        path: PATH_APP.statistic.debit,
        icon: iconify("tabler:pig-money"),
        component: DebitCompany,
        children: [],
        roles: [ROLES.ACCOUNTANT, ROLES.ADMIN],
      },
      {
        title: "statistic.debitCompanyDetail.title",
        path: PATH_APP.statistic.debitDetail,
        hideMenu: true,
        component: DebitCompanyDetail,
        children: [],
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
      },
      {
        title: "statistic.debitCompanyDetail.title",
        path: PATH_APP.statistic.customerRevenueDetail,
        hideMenu: true,
        component: StatiscticsCustomerDetail,
        children: [],
        roles: [ROLES.ADMIN],
      },
    ],
  },

  // Order
  // ----------------------------------------------------------------------
  {
    subheader: "order.title",
    items: [
      {
        title: "order.search",
        path: PATH_APP.order.search,
        icon: iconify("material-symbols:screen-search-desktop-rounded"),
        component: OrderSearch,
        children: [],
        roles: [
          ROLES.ADMIN,
          ROLES.MANAGER,
          ROLES.ACCOUNTANT,
          ROLES.SALER,
          ROLES.PRINTER,
          ROLES.STORE,
        ],
      },
      {
        title: "order.detail",
        path: PATH_APP.order.detail.route,
        component: OrderDetail,
        hideMenu: true,
        children: [],
        roles: [
          ROLES.ADMIN,
          ROLES.MANAGER,
          ROLES.ACCOUNTANT,
          ROLES.SALER,
          ROLES.STORE,
        ],
      },
      {
        title: "order.create",
        path: PATH_APP.order.create,
        component: OrderCreate,
        hideMenu: true,
        children: [],
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.SALER, ROLES.MANAGER],
      },
      {
        title: "order.update",
        path: PATH_APP.order.update.route,
        component: OrderUpdate,
        hideMenu: true,
        children: [],
        roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.ACCOUNTANT],
      },
      {
        title: "order.processing",
        path: PATH_APP.order.processing,
        icon: iconify("vaadin:file-process"),
        component: OrderProcessing,
        children: [],
        roles: [
          ROLES.ADMIN,
          ROLES.MANAGER,
          ROLES.ACCOUNTANT,
          ROLES.SALER,
          ROLES.STORE,
          ROLES.DESIGNER,
          ROLES.PRINTER,
        ],
      },
      {
        title: "order.needPaid",
        path: PATH_APP.order.needPaid,
        icon: iconify("mdi:payment-clock"),
        component: OrderNeedCollect,
        children: [],
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.SALER, ROLES.STORE],
      },
      {
        title: "order.needCheck",
        path: PATH_APP.order.needCheck,
        icon: iconify("mdi:recurring-payment"),
        component: OrderNeedCheck,
        children: [],
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.MANAGER],
      },
      {
        title: "order.needConfirm",
        path: PATH_APP.order.needConfirm,
        icon: iconify("mdi:store-check-outline"),
        component: OrderNeedConfirm,
        children: [],
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
      },
      {
        title: "order.stored",
        path: PATH_APP.order.stored,
        icon: iconify("material-symbols:warehouse-outline"),
        component: OrderListStored,
        children: [],
        roles: [
          ROLES.ADMIN,
          ROLES.MANAGER,
          ROLES.ACCOUNTANT,
          ROLES.SALER,
          ROLES.STORE,
        ],
      },
      {
        title: "order.waitingPrint",
        path: PATH_APP.order.waitingPrint,
        icon: iconify("mdi:archive-clock-outline"),
        component: OrderWaitingPrint,
        children: [],
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.PRINTER, ROLES.MANAGER],
      },
      {
        title: "order.printing",
        path: PATH_APP.order.printing,
        icon: iconify("mi:print"),
        component: OrderPrinting,
        children: [],
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.PRINTER, ROLES.MANAGER],
      },
      {
        title: "order.printed",
        path: PATH_APP.order.printed,
        icon: iconify("mi:print"),
        component: OrderPrinted,
        children: [],
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.STORE, ROLES.MANAGER],
      },
    ],
  },

  // Basic info
  {
    subheader: "basicInfo.title",
    items: [
      // USER
      {
        title: "basicInfo.user.title",
        path: PATH_APP.user.root,
        icon: iconify("mdi:user-group"),
        component: () => <></>,
        roles: [ROLES.ADMIN],
        children: [
          {
            title: "basicInfo.user.list",
            path: PATH_APP.user.list,
            component: UserList,
            roles: [ROLES.ADMIN],
          },
          {
            title: "basicInfo.user.add",
            path: PATH_APP.user.add,
            component: UserAdd,
            roles: [ROLES.ADMIN],
          },
          {
            title: "basicInfo.user.view",
            path: PATH_APP.user.view,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN],
          },
          {
            title: "basicInfo.user.profile",
            path: PATH_APP.user.profile,
            hideMenu: true,
            component: () => <></>,
            roles: [],
          },
        ],
      },

      // Customer
      {
        title: "basicInfo.customer.title",
        path: PATH_APP.customer.root,
        icon: iconify("mdi:user"),
        component: () => <></>,
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.SALER],
        children: [
          {
            title: "basicInfo.customer.list",
            path: PATH_APP.customer.list,
            component: CustomerList,
            roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
          },
          {
            title: "basicInfo.customer.add",
            path: PATH_APP.customer.add,
            component: CustomerAdd,
            roles: [ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.SALER],
          },
          {
            title: "basicInfo.customer.update",
            path: PATH_APP.customer.update,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
          },
          {
            title: "basicInfo.customer.view",
            path: PATH_APP.customer.view,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
          },
        ],
      },

      // Company
      {
        title: "basicInfo.company.title",
        path: PATH_APP.company.root,
        icon: iconify("mdi:company"),
        component: () => <></>,
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
        children: [
          {
            title: "basicInfo.company.list",
            path: PATH_APP.company.list,
            component: CompanyList,
            roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
          },
          {
            title: "basicInfo.company.add",
            path: PATH_APP.company.add,
            component: CompanyAdd,
            roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
          },
          {
            title: "basicInfo.company.update",
            path: PATH_APP.company.update,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
          },
          {
            title: "basicInfo.company.view",
            path: PATH_APP.company.view,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
          },
        ],
      },
      // outsource
      {
        title: "basicInfo.outsource.title",
        path: PATH_APP.outsource.root,
        icon: iconify("mdi:paper-text-outline"),
        component: OutsourceList,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        children: [],
      },
      // Print type
      {
        title: "basicInfo.printType.title",
        path: PATH_APP.printType.root,
        icon: iconify("material-symbols:print"),
        component: PrintTypeList,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        children: [],
      },
      // paperType
      {
        title: "basicInfo.paperType.title",
        path: PATH_APP.paperType.root,
        icon: iconify("mdi:paper-check"),
        component: PaperList,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        children: [],
      },
      // Categories
      {
        title: "basicInfo.categories.title",
        path: PATH_APP.categories.root,
        icon: iconify("carbon:categories"),
        component: CategoryList,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        children: [],
      },
    ],
  },

  // DEMO MENU STATES
  // {
  //   subheader: "Other cases",
  //   items: [
  //     {
  //       // default roles : All roles can see this entry.
  //       // roles: ['user'] Only users can see this item.
  //       // roles: ['admin'] Only admin can see this item.
  //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
  //       // Reference from 'src/guards/RoleBasedGuard'.
  //       title: "item_by_roles",
  //       path: PATH_APP.orther.permissionDenied,
  //       icon: ICONS.lock,
  //       roles: ["admin"],
  //       caption: "only_admin_can_see_this_item",
  //     },
  //     {
  //       title: "menu_level",
  //       path: "#/dashboard/menu_level",
  //       icon: ICONS.menuItem,
  //       children: [
  //         {
  //           title: "menu_level_2a",
  //           path: "#/dashboard/menu_level/menu_level_2a",
  //         },
  //         {
  //           title: "menu_level_2b",
  //           path: "#/dashboard/menu_level/menu_level_2b",
  //           children: [
  //             {
  //               title: "menu_level_3a",
  //               path: "#/dashboard/menu_level/menu_level_2b/menu_level_3a",
  //             },
  //             {
  //               title: "menu_level_3b",
  //               path: "#/dashboard/menu_level/menu_level_2b/menu_level_3b",
  //               children: [
  //                 {
  //                   title: "menu_level_4a",
  //                   path: "#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4a",
  //                 },
  //                 {
  //                   title: "menu_level_4b",
  //                   path: "#/dashboard/menu_level/menu_level_2b/menu_level_3b/menu_level_4b",
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       title: "item_disabled",
  //       path: "#disabled",
  //       icon: ICONS.disabled,
  //       disabled: true,
  //     },

  //     {
  //       title: "item_label",
  //       path: "#label",
  //       icon: ICONS.label,
  //       info: (
  //         <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
  //           NEW
  //         </Label>
  //       ),
  //     },
  //     {
  //       title: "item_caption",
  //       path: "#caption",
  //       icon: ICONS.menuItem,
  //       caption:
  //         "Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.",
  //     },
  //     {
  //       title: "item_external_link",
  //       path: "https://www.google.com/",
  //       icon: ICONS.external,
  //     },
  //     {
  //       title: "blank",
  //       path: PATH_APP.orther.blank,
  //       icon: ICONS.blank,
  //     },
  //   ],
  // },
];

export default navConfig;
