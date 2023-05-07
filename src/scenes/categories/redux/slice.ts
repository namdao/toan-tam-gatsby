import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/lib/types";
import { persistReducer } from "redux-persist";
import { RootState } from "store";
import storage from "redux-persist/lib/storage";
import { IResCategories, ICategoryDefault } from "./types";

export type CategoriesState = {
  list: IResCategories;
};
const initialState: CategoriesState = {
  list: {} as IResCategories,
};
// Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    seCategoriesSuccess: (state, action: PayloadAction<IResCategories>) => {
      state.list = action.payload;
    },
  },
});

// Selectors
const getListCategories = (state: RootState) => state.data.categories.list;
export const CategoriesSelector = { getListCategories };

// Actions
export const categoriesActions = categoriesSlice.actions;

// Reducers
const persistConfig: PersistConfig<typeof initialState> = {
  key: "categories:slice",
  storage: storage,
};
export default persistReducer(persistConfig, categoriesSlice.reducer);
