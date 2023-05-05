import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompany, ICustomer } from "constant/commonType";
import { RootState } from "reducers/appReducer";
type IState = {
  list: ICompany[];
};
const initialState: IState = {
  list: [],
};
const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    requestCompanySuccess: (state, action: PayloadAction<ICompany[]>) => {
      state.list = action.payload;
    },
  },
});

export const companyActions = companySlice.actions;
const getCompanyList = (state: RootState) => state.data.company.list;
export const companySelector = {
  getCompanyList,
};
export default companySlice.reducer;
