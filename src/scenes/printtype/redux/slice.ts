import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/lib/types";
import { persistReducer } from "redux-persist";
import { RootState } from "store";
import storage from "redux-persist/lib/storage";
import { IColor } from "./types";

export type PrintTypeState = {
  list: IColor[];
};
const initialState: PrintTypeState = {
  list: [],
};
// Slice
const printTypeSlice = createSlice({
  name: "printType",
  initialState,
  reducers: {
    setPrintTypeSuccess: (state, action: PayloadAction<IColor[]>) => {
      state.list = action.payload;
    },
  },
});

// Selectors
const getListPrintType = (state: RootState) => state.data.printType.list;
export const PrintTypeSelector = { getListPrintType };

// Actions
export const printTypeActions = printTypeSlice.actions;

// Reducers
const persistConfig: PersistConfig<typeof initialState> = {
  key: "printType:slice",
  storage: storage,
};
export default persistReducer(persistConfig, printTypeSlice.reducer);
