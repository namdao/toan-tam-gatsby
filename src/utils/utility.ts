import { IOrder } from "scenes/orders/redux/types";

export const isBrowser = typeof window !== `undefined`;

export const getTotalAmount = (order: IOrder) => {
  const {
    template_number,
    unit_price,
    quantity,
    shipping_fee,
    design_fee,
    deposite,
  } = order || {};
  return (
    template_number * unit_price * quantity +
    shipping_fee +
    design_fee -
    deposite
  );
};
