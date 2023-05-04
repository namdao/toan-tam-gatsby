import { IOrder, IOrderDetail } from "scenes/orders/redux/types";
import navConfig from "constant/navConstant";

export const isBrowser = typeof window !== `undefined`;

export const getTotalAmount = (order: IOrder | IOrderDetail) => {
  const { deposite } = order || {};
  return getTotalFee(order) - deposite;
};

export const getTotalFee = (order: IOrder | IOrderDetail) => {
  const { template_number, unit_price, quantity, shipping_fee, design_fee } =
    order || {};
  return template_number * unit_price * quantity + shipping_fee + design_fee;
};

export const compareIdDesc = (
  a: {
    id: number;
  },
  b: { id: number }
) => {
  if (a.id < b.id) {
    return 1;
  }
  if (a.id > b.id) {
    return -1;
  }
  return 0;
};

export const listPermissionRoutingByRole = (role: string) => {
  const listNav = navConfig.map((e) => e.items).flat(1);
  const listByRole = listNav.filter((e) => {
    if (e.roles.includes(role)) {
      return e;
    }
  });
  return listByRole;
};

export const listMenuByRole = (role: string): typeof navConfig => {
  const listMenu: typeof navConfig = [];
  navConfig.forEach((e) => {
    const subheader = e.subheader;
    const listItem: any = [];
    e.items.forEach((i) => {
      if (i.roles.includes(role)) {
        listItem.push(i);
      }
    });
    listMenu.push({
      subheader,
      items: listItem,
    });
  });
  return listMenu;
};
