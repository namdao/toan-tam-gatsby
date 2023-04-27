import { IOrder, IOrderDetail } from "scenes/orders/redux/types";

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
