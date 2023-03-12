import React from "react";
// routes
import { PATH_APP } from "constant/routeConstant";
// components
import Label from "components/label";
import Iconify from "components/iconify";
import SvgColor from "components/svg-color";
import Svg from "utils/svg";
import UserList from "scenes/users/screens/UserList";

const icon = (name: string) => {
  // @ts-ignore
  const iconSvg = Svg.navbar[name];
  return <SvgColor src={iconSvg} sx={{ width: 1, height: 1 }} />;
};

const ICONS = {
  blog: icon("icBlog"),
  cart: icon("icCart"),
  chat: icon("icChat"),
  mail: icon("icMail"),
  user: icon("icUser"),
  file: icon("icFile"),
  lock: icon("icLock"),
  label: icon("icLabel"),
  blank: icon("icBlank"),
  kanban: icon("icKanban"),
  folder: icon("icFolder"),
  banking: icon("icBanking"),
  booking: icon("icBooking"),
  invoice: icon("icInvoice"),
  calendar: icon("icCalendar"),
  disabled: icon("icDisabled"),
  external: icon("icExternal"),
  menuItem: icon("icMenuItem"),
  ecommerce: icon("icEcommerce"),
  analytics: icon("icAnalytics"),
  dashboard: icon("icDashboard"),
};

const navConfig = [
  {
    subheader: "statistic.title",
    items: [
      {
        title: "statistic.customer",
        path: PATH_APP.statistic.customer,
        icon: ICONS.invoice,
      },
      {
        title: "statistic.sumary",
        path: PATH_APP.statistic.summary,
        icon: ICONS.analytics,
      },
      {
        title: "statistic.sale",
        path: PATH_APP.statistic.sale,
        icon: ICONS.ecommerce,
      },
      {
        title: "statistic.debit",
        path: PATH_APP.statistic.debit,
        icon: ICONS.banking,
      },
    ],
  },

  // Basic info
  // ----------------------------------------------------------------------
  {
    subheader: "basicInfo.title",
    items: [
      // USER
      {
        title: "basicInfo.user.title",
        path: PATH_APP.user.root,
        icon: ICONS.user,
        children: [
          {
            title: "basicInfo.user.list",
            path: PATH_APP.user.list,
            component: UserList,
          },
          {
            title: "basicInfo.user.add",
            path: PATH_APP.user.add,
          },
          {
            title: "basicInfo.user.update",
            path: PATH_APP.user.update,
            hideMenu: true,
          },
          {
            title: "basicInfo.user.view",
            path: PATH_APP.user.view,
            hideMenu: true,
          },
          {
            title: "basicInfo.user.profile",
            path: PATH_APP.user.profile,
            hideMenu: true,
          },
        ],
      },

      // Customer
      {
        title: "basicInfo.customer.title",
        path: PATH_APP.customer.root,
        icon: ICONS.cart,
        children: [
          {
            title: "basicInfo.customer.list",
            path: PATH_APP.customer.list,
          },
          {
            title: "basicInfo.customer.add",
            path: PATH_APP.customer.add,
          },
          {
            title: "basicInfo.customer.update",
            path: PATH_APP.customer.update,
            hideMenu: true,
          },
          {
            title: "basicInfo.customer.view",
            path: PATH_APP.customer.view,
            hideMenu: true,
          },
        ],
      },

      // Company
      {
        title: "basicInfo.company.title",
        path: PATH_APP.company.root,
        icon: ICONS.cart,
        children: [
          {
            title: "basicInfo.company.list",
            path: PATH_APP.company.list,
          },
          {
            title: "basicInfo.company.add",
            path: PATH_APP.company.add,
          },
          {
            title: "basicInfo.company.update",
            path: PATH_APP.company.update,
            hideMenu: true,
          },
          {
            title: "basicInfo.company.view",
            path: PATH_APP.company.view,
            hideMenu: true,
          },
        ],
      },
      // Print type
      {
        title: "basicInfo.printType.title",
        path: PATH_APP.printType.root,
        icon: ICONS.cart,
        children: [
          {
            title: "basicInfo.printType.list",
            path: PATH_APP.printType.list,
          },
          {
            title: "basicInfo.printType.add",
            path: PATH_APP.printType.add,
          },
          {
            title: "basicInfo.printType.update",
            path: PATH_APP.printType.update,
            hideMenu: true,
          },
          {
            title: "basicInfo.printType.view",
            path: PATH_APP.printType.view,
            hideMenu: true,
          },
        ],
      },
      // Categories
      {
        title: "basicInfo.categories.title",
        path: PATH_APP.categories.root,
        icon: ICONS.cart,
        children: [
          {
            title: "basicInfo.categories.list",
            path: PATH_APP.categories.list,
          },
          {
            title: "basicInfo.categories.add",
            path: PATH_APP.categories.add,
          },
          {
            title: "basicInfo.categories.update",
            path: PATH_APP.categories.update,
            hideMenu: true,
          },
          {
            title: "basicInfo.categories.view",
            path: PATH_APP.categories.view,
            hideMenu: true,
          },
        ],
      },
      // paperType
      {
        title: "basicInfo.paperType.title",
        path: PATH_APP.paperType.root,
        icon: ICONS.cart,
        children: [
          {
            title: "basicInfo.paperType.list",
            path: PATH_APP.paperType.list,
          },
          {
            title: "basicInfo.paperType.add",
            path: PATH_APP.paperType.add,
          },
          {
            title: "basicInfo.paperType.update",
            path: PATH_APP.paperType.update,
            hideMenu: true,
          },
          {
            title: "basicInfo.paperType.view",
            path: PATH_APP.paperType.view,
            hideMenu: true,
          },
        ],
      },
      // outsource
      {
        title: "basicInfo.outsource.title",
        path: PATH_APP.outsource.root,
        icon: ICONS.cart,
        children: [
          {
            title: "basicInfo.outsource.list",
            path: PATH_APP.outsource.list,
          },
          {
            title: "basicInfo.outsource.add",
            path: PATH_APP.outsource.add,
          },
          {
            title: "basicInfo.outsource.update",
            path: PATH_APP.outsource.update,
            hideMenu: true,
          },
          {
            title: "basicInfo.outsource.view",
            path: PATH_APP.outsource.view,
            hideMenu: true,
          },
        ],
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
        icon: ICONS.mail,
        // info: <Label color="error">+32</Label>,
      },
      {
        title: "order.processing",
        path: PATH_APP.order.processing,
        icon: ICONS.chat,
      },
      {
        title: "order.needPaid",
        path: PATH_APP.order.needPaid,
        icon: ICONS.calendar,
      },
      {
        title: "order.needCheck",
        path: PATH_APP.order.needCheck,
        icon: ICONS.calendar,
      },
      {
        title: "order.needConfirm",
        path: PATH_APP.order.needConfirm,
        icon: ICONS.calendar,
      },
      {
        title: "order.stored",
        path: PATH_APP.order.stored,
        icon: ICONS.calendar,
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
