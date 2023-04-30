import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/lib/types";
import { persistReducer } from "redux-persist";
import { RootState } from "store";
import storage from "redux-persist/lib/storage";
import { IPaperType } from "./types";

export type AuthState = {
  list: IPaperType[];
};
const initialState: AuthState = {
  list: [],
};
// Slice
const paperSlice = createSlice({
  name: "paperType",
  initialState,
  reducers: {
    setPaperListSuccess: (state, action: PayloadAction<IPaperType[]>) => {
      state.list = action.payload;
    },
    addNewRow: (state, action: PayloadAction<IPaperType>) => {
      state.list = [action.payload, ...state.list];
    },
    deleteNewRow: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((row) => row.id !== action.payload);
    },
  },
});

// Selectors
const getListPaper = (state: RootState) => state.data.paperType.list;
export const PaperTypeSelector = { getListPaper };

// Actions
export const paperTypeActions = paperSlice.actions;

// Reducers
const persistConfig: PersistConfig<typeof initialState> = {
  key: "paper:slice",
  storage: storage,
};
export default persistReducer(persistConfig, paperSlice.reducer);
