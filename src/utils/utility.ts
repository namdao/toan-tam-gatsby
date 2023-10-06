import { IOrder, IOrderDetail } from "scenes/orders/redux/types";
import navConfig from "constant/navConstant";
import appConstant from "constant/appConstant";
import { navigate } from "gatsby";
import { PATH_APP } from "constant/routeConstant";
import { useEffect, useRef } from "react";

const { ROLES } = appConstant;
export const isBrowser = typeof window !== `undefined`;

export const getTotalAmount = (order: IOrder | IOrderDetail) => {
  const { deposite = 0 } = order || {};
  return getTotalFee(order) - deposite;
};

export const getTotalFee = (order: IOrder | IOrderDetail) => {
  const {
    template_number = 0,
    unit_price = 0,
    quantity = 0,
    shipping_fee = 0,
    design_fee = 0,
  } = order || {};
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

export const navigateByRole = (role: string) => {
  switch (role) {
    case ROLES.ADMIN:
    case ROLES.ACCOUNTANT:
    case ROLES.MANAGER:
    case ROLES.SALER: {
      navigate(PATH_APP.order.processing);
      break;
    }
    case ROLES.PRINTER: {
      navigate(PATH_APP.order.waitingPrint);
      break;
    }
    case ROLES.STORE: {
      navigate(PATH_APP.order.stored);
      break;
    }
    default: {
      navigate(PATH_APP.order.root);
    }
  }
};
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useDidUpdate(callback: () => void, deps: unknown[]): void {
  const hasMount = useRef(false);

  useEffect(() => {
    if (hasMount.current) {
      callback();
    } else {
      hasMount.current = true;
    }
  }, deps);
}
