import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/lib/types";
import { persistReducer } from "redux-persist";
import { RootState } from "store";
import storage from "redux-persist/lib/storage";
import { IOutSource } from "./types";

export type OutsourceState = {
  list: IOutSource[];
};
const initialState: OutsourceState = {
  list: [],
};
// Slice
const outsourceSlice = createSlice({
  name: "outsource",
  initialState,
  reducers: {
    setOutsourceSuccess: (state, action: PayloadAction<IOutSource[]>) => {
      state.list = action.payload;
    },
  },
});

// Selectors
const getListOutsource = (state: RootState) => state.data.outsource.list;
export const OutsourceSelector = { getListOutsource };

// Actions
export const outsourceActions = outsourceSlice.actions;

// Reducers
const persistConfig: PersistConfig<typeof initialState> = {
  key: "outsource:slice",
  storage: storage,
};
export default persistReducer(persistConfig, outsourceSlice.reducer);
