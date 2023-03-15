import React from "react";
import appConstant from "./appConstant";
import { PATH_APP } from "constant/routeConstant";
import Iconify from "components/iconify";
import UserList from "scenes/users/screens/UserList";
import { ICON } from "./layoutConstant";
// Screens
import StatisticsCustomer from "scenes/statistic/screens/StatisticsCustomer";
import StatisticsSummary from "scenes/statistic/screens/StatisticsSummary";
import StatisticsSale from "scenes/statistic/screens/StatisticsSale";
import StatisticsDebit from "scenes/statistic/screens/StatisticsDebit";
import UserAdd from "scenes/users/screens/UserAdd";
import CustomerList from "scenes/customer/screens/CustomerList";
import CustomerAdd from "scenes/customer/screens/CustomerAdd";
import CompanyList from "scenes/company/screens/CompanyList";
import CompanyAdd from "scenes/company/screens/CompanyAdd";
import PrintTypeList from "scenes/printtype/screens/PrintTypeList";
import PrintTypeAdd from "scenes/printtype/screens/PrintTypeAdd";
import CategoryList from "scenes/categories/screens/CategoryList";
import CategoryAdd from "scenes/categories/screens/CategoryAdd";
import PaperList from "scenes/papers/screens/PaperList";
import PaperAdd from "scenes/papers/screens/PaperAdd";
import OutsourceList from "scenes/outsources/screens/OutsourcesList";
import OutsourceAdd from "scenes/outsources/screens/OutsourcesAdd";
import OrderSearch from "scenes/orders/screens/OrderSearch";
import OrderProcessing from "scenes/orders/screens/OrderProcessing";
import OrderNeedPaid from "scenes/orders/screens/OrderNeedPaid";
import OrderNeedCheck from "scenes/orders/screens/OrderNeedCheck";
import OrderNeedConfirm from "scenes/orders/screens/OrderNeedConfirm";
import OrderListStored from "scenes/orders/screens/OrderListStored";

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
        title: "statistic.debit",
        path: PATH_APP.statistic.debit,
        icon: iconify("tabler:pig-money"),
        component: StatisticsDebit,
        children: [],
        roles: [ROLES.ACCOUNTANT, ROLES.ADMIN],
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
          ROLES.STORE,
        ],
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
        ],
      },
      {
        title: "order.needPaid",
        path: PATH_APP.order.needPaid,
        icon: iconify("mdi:payment-clock"),
        component: OrderNeedPaid,
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
        icon: iconify("mdi:account-payment-outline"),
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
            title: "basicInfo.user.update",
            path: PATH_APP.user.update,
            hideMenu: true,
            component: () => <></>,
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
        roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
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
            roles: [ROLES.ADMIN, ROLES.ACCOUNTANT],
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
      // Print type
      {
        title: "basicInfo.printType.title",
        path: PATH_APP.printType.root,
        icon: iconify("material-symbols:print"),
        component: () => <></>,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        children: [
          {
            title: "basicInfo.printType.list",
            path: PATH_APP.printType.list,
            component: PrintTypeList,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.printType.add",
            path: PATH_APP.printType.add,
            component: PrintTypeAdd,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.printType.update",
            path: PATH_APP.printType.update,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.printType.view",
            path: PATH_APP.printType.view,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
        ],
      },
      // Categories
      {
        title: "basicInfo.categories.title",
        path: PATH_APP.categories.root,
        icon: iconify("carbon:categories"),
        component: () => <></>,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        children: [
          {
            title: "basicInfo.categories.list",
            path: PATH_APP.categories.list,
            component: CategoryList,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.categories.add",
            path: PATH_APP.categories.add,
            component: CategoryAdd,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.categories.update",
            path: PATH_APP.categories.update,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.categories.view",
            path: PATH_APP.categories.view,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
        ],
      },
      // paperType
      {
        title: "basicInfo.paperType.title",
        path: PATH_APP.paperType.root,
        icon: iconify("mdi:paper-check"),
        component: () => <></>,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        children: [
          {
            title: "basicInfo.paperType.list",
            path: PATH_APP.paperType.list,
            component: PaperList,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.paperType.add",
            path: PATH_APP.paperType.add,
            component: PaperAdd,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.paperType.update",
            path: PATH_APP.paperType.update,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.paperType.view",
            path: PATH_APP.paperType.view,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
        ],
      },
      // outsource
      {
        title: "basicInfo.outsource.title",
        path: PATH_APP.outsource.root,
        icon: iconify("mdi:paper-text-outline"),
        component: () => <></>,
        roles: [ROLES.ADMIN, ROLES.MANAGER],
        children: [
          {
            title: "basicInfo.outsource.list",
            path: PATH_APP.outsource.list,
            component: OutsourceList,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.outsource.add",
            path: PATH_APP.outsource.add,
            component: OutsourceAdd,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.outsource.update",
            path: PATH_APP.outsource.update,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
          {
            title: "basicInfo.outsource.view",
            path: PATH_APP.outsource.view,
            hideMenu: true,
            component: () => <></>,
            roles: [ROLES.ADMIN, ROLES.MANAGER],
          },
        ],
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
