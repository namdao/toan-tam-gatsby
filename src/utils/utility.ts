import { IOrder, IOrderDetail } from "scenes/orders/redux/types";
import navConfig from "constant/navConstant";
import appConstant from "constant/appConstant";
import { navigate } from "gatsby";
import { PATH_APP } from "constant/routeConstant";
import { useEffect, useRef } from "react";
import { IOutSource } from "scenes/outsources/redux/types";
import groupBy from "lodash/groupBy";

const { ROLES } = appConstant;
export const isBrowser = typeof window !== `undefined`;

export const getTotalAmount = (order: IOrder | IOrderDetail) => {
  const { deposite = 0 } = order || {};
  return getTotalBasicFee(order) - deposite;
};

export const getTotalBasicFee = (order: IOrder | IOrderDetail) => {
  const {
    template_number = 0,
    unit_price = 0,
    quantity = 0,
    shipping_fee = 0,
    design_fee = 0,
  } = order || {};
  return template_number * unit_price * quantity + shipping_fee + design_fee;
};

export const getTotalVatFee = (order: IOrder | IOrderDetail) => {
  const { other_fee = 0, vat_fee = 0, discount = 0 } = order || {};
  const totalAmountOrder = getTotalBasicFee(order);
  if (vat_fee > 0) {
    return (totalAmountOrder + other_fee - discount) * vat_fee;
  }
  return 0;
};

export const getTotalDebit = (order: IOrder | IOrderDetail) => {
  const { other_fee = 0, discount = 0 } = order || {};
  const totalAmountWithoutFee = getTotalAmount(order);
  return (
    totalAmountWithoutFee +
    other_fee -
    discount +
    getTotalVatFee(order)
  );
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

export const getDataOutsource = (outsources: IOutSource[]) => {
  const dataGroupOutsources = groupBy(outsources, "group");

  const keyOutSource = Object.keys(dataGroupOutsources);
  return { keyOutSource, dataGroupOutsources };
};
export function convertNumberToVietnameseText(number: number) {
  if (isNaN(number)) return "Không phải số hợp lệ";

  const chuSo = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const hangDonVi = [
    "",
    "nghìn",
    "triệu",
    "tỷ",
    "nghìn tỷ",
    "triệu tỷ",
    "tỷ tỷ",
  ];

  function docBaSo(num: number) {
    let tram = Math.floor(num / 100);
    let chuc = Math.floor((num % 100) / 10);
    let donVi = num % 10;
    let result = "";

    if (tram > 0 || chuc > 0 || donVi > 0) {
      if (tram > 0) {
        result += chuSo[tram] + " trăm";
        if (chuc === 0 && donVi > 0) result += " lẻ";
      }

      if (chuc > 0) {
        if (chuc === 1) result += " mười";
        else result += " " + chuSo[chuc] + " mươi";
      }

      if (donVi > 0) {
        if (chuc > 0) {
          if (donVi === 1) result += " mốt";
          else if (donVi === 5) result += " lăm";
          else result += " " + chuSo[donVi];
        } else {
          result += " " + chuSo[donVi];
        }
      }
    }

    return result.trim();
  }

  let parts = [];
  let i = 0;

  while (number > 0) {
    const threeDigits = number % 1000;
    if (threeDigits !== 0) {
      const text = docBaSo(threeDigits);
      const suffix = hangDonVi[i];
      parts.unshift(text + (suffix ? " " + suffix : ""));
    }
    number = Math.floor(number / 1000);
    i++;
  }

  const finalText = parts.join(" ").replace(/\s+/g, " ").trim();
  return finalText.charAt(0).toUpperCase() + finalText.slice(1) + " đồng chẵn";
}
