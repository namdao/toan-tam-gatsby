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
