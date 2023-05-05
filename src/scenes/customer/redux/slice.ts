import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICustomer } from "constant/commonType";
import { RootState } from "reducers/appReducer";
import { IResCustomerList } from "./types";
type IState = {
  list: ICustomer[];
  total: number;
  loading: boolean;
};
const initialState: IState = {
  list: [],
  loading: false,
  total: 0,
};
const customersSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    requestCustomer: (state) => {
      state.loading = true;
    },
    requestCustomerSuccess: (
      state,
      action: PayloadAction<IResCustomerList>
    ) => {
      state.list = action.payload.items;
      state.total = action.payload.total;
      state.loading = false;
    },
    requestCustomerFailed: (state) => {
      state.loading = false;
    },
  },
});

export const customerActions = customersSlice.actions;
const getCustomerList = (state: RootState) => state.data.customer.list;
const getLoading = (state: RootState) => state.data.customer.loading;
const getTotal = (state: RootState) => state.data.customer.total;
export const customerSelector = {
  getCustomerList,
  getLoading,
  getTotal,
};
export default customersSlice.reducer;
