import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/lib/types";
import { persistReducer } from "redux-persist";
import { RootState } from "store";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

export type AuthState = {};
const initialState: AuthState = {};

// Slice
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountSuccess: (state, action: PayloadAction<AuthState>) => {
      state = action.payload;
    },
  },
});

// Selectors
const getProfile = (state: RootState) => state.data.account;
export const AccountSelector = { getProfile };

// Actions
export const accountActions = accountSlice.actions;

// Reducers
const persistConfig: PersistConfig<typeof initialState> = {
  key: "accountSlice:slice",
  storage: storage,
  stateReconciler: autoMergeLevel2,
};
export default persistReducer(persistConfig, accountSlice.reducer);
