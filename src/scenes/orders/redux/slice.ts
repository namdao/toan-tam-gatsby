import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { IOrder } from "./types";
import { ORDER_STATUS_NAME } from "../helper/OrderConstant";

type IDataOrder = {
  list: IOrder[];
  loading: boolean;
  total: number;
};
export type IOrdersState = Record<ORDER_STATUS_NAME, IDataOrder>;
const initialState: IOrdersState = {} as IOrdersState;
// Slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    requestOrderByStatus: (state, action: PayloadAction<ORDER_STATUS_NAME>) => {
      if (state[action.payload]) {
        if (state[action.payload].list.length < 1) {
          state[action.payload].loading = true;
        }
      }
    },
    requestOrderByStatusSuccess: (
      state,
      action: PayloadAction<{
        status: ORDER_STATUS_NAME;
        total: number;
        list: IOrder[];
      }>
    ) => {
      const { status, total, list } = action.payload;
      state[status] = {
        loading: false,
        list,
        total,
      };
    },
    requestOrderByStatusFailed: (
      state,
      action: PayloadAction<ORDER_STATUS_NAME>
    ) => {
      if (state[action.payload]) {
        state[action.payload].loading = false;
      }
    },
  },
});

const getTotalByStatus = (
  state: RootState,
  status: ORDER_STATUS_NAME
): number => state.data.order[status]?.total || 0;
const getListByStatus = (
  state: RootState,
  status: ORDER_STATUS_NAME
): IOrder[] => state.data.order[status]?.list || [];
const getLoadingByStatus = (
  state: RootState,
  status: ORDER_STATUS_NAME
): boolean => state.data.order[status]?.loading ?? true;
// Selectors
export const OrdersSelector = {
  getTotalByStatus,
  getListByStatus,
  getLoadingByStatus,
};

// Actions
export const ordersAction = ordersSlice.actions;

export default ordersSlice.reducer;
