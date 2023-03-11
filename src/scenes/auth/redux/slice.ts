import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/lib/types";
import { persistReducer } from "redux-persist";
import { RootState } from "store";
import storage from "redux-persist/lib/storage";
import { IRequestLogin } from "./types";

export type IRoles = {
  id: null | number;
  name: string;
};
export type IProfile = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  createdTime: string;
  roles: Array<IRoles>;
};
export type AuthState = {
  token: string;
  profile: IProfile;
};
const initialState: AuthState = {
  token: "",
  profile: {
    id: 0,
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    createdTime: "",
    roles: [],
  },
};
// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setProfileSuccess: (state, action: PayloadAction<IProfile>) => {
      state.profile = action.payload;
    },
    resetData: (state) => {
      state.token = initialState.token;
      state.profile = initialState.profile;
    },
  },
});

// Selectors
const getToken = (state: RootState) => state.data.auth.token;
const getProfile = (state: RootState) => state.data.auth.profile;
export const AuthSelector = { getToken, getProfile };

// Actions
export const authActions = authSlice.actions;

// Reducers
const persistConfig: PersistConfig<typeof initialState> = {
  key: "auth:slice",
  storage: storage,
};
export default persistReducer(persistConfig, authSlice.reducer);
