import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { IOrder } from "./types";
import { ORDER_STATUS_NAME, SEARCH_BY } from "../helper/OrderConstant";

type IFilter = {
  search?: string;
  createDate?: Date | null;
  updateDate?: Date | null;
  type?: SEARCH_BY;
  page?: number;
  pageSize?: number;
};
type IDataOrder = {
  list: IOrder[];
  loading: boolean;
  total: number;
};
type IPagination = {
  page: number;
  pageSize: number;
};
export type IOrdersState = Record<ORDER_STATUS_NAME, IDataOrder> & {
  filter: IFilter;
};
const initialState: IOrdersState = {
  filter: {
    page: 1,
    pageSize: 20,
    type: SEARCH_BY.ALL,
    search: "",
    createDate: null,
    updateDate: null,
  },
} as IOrdersState;
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
    setDataFilter: (state, action: PayloadAction<IFilter>) => {
      state.filter = {
        ...state.filter,
        ...action.payload,
      };
    },
    setPagination: (state, action: PayloadAction<{ data: IPagination }>) => {
      state.filter = {
        ...state.filter,
        ...action.payload.data,
      };
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    },
    clearCreateDateFilter: (state) => {
      state.filter = {
        ...state.filter,
        createDate: null,
      };
    },
    clearUpdateDateFilter: (state) => {
      state.filter = {
        ...state.filter,
        updateDate: null,
      };
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
const getFilterOrder = (state: RootState) => state.data.order.filter;
// Selectors
export const OrdersSelector = {
  getTotalByStatus,
  getListByStatus,
  getLoadingByStatus,
  getFilterOrder,
};

// Actions
export const ordersAction = ordersSlice.actions;

export default ordersSlice.reducer;
