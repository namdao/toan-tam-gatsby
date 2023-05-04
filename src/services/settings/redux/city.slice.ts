import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/lib/types";
import { persistReducer } from "redux-persist";
import { RootState } from "store";
import storage from "redux-persist/lib/storage";
import { IResCityDistrictWard } from "./types";

export type IWard = {
  id: number;
  wards: IResCityDistrictWard[];
};
export type IDistrict = {
  id: number;
  label: string;
};
export type CityState = {
  listDistricts: IDistrict[];
  listWards: IWard[];
  listCity: IResCityDistrictWard[];
};
const initialState: CityState = {
  listDistricts: [],
  listWards: [],
  listCity: [],
};
// Slice
const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setListDistrictSuccess: (state, action: PayloadAction<IDistrict[]>) => {
      state.listDistricts = action.payload;
    },
    setListWardSuccess: (state, action: PayloadAction<IWard[]>) => {
      state.listWards = action.payload;
    },
    setListCitySuccess: (
      state,
      action: PayloadAction<IResCityDistrictWard[]>
    ) => {
      state.listCity = action.payload;
    },
  },
});

// Selectors
const getListDistrict = (state: RootState) => state.services.city.listDistricts;
const getListWards = (state: RootState) => state.services.city.listWards;
const getListCity = (state: RootState) => state.services.city.listCity;
export const CitySelector = { getListDistrict, getListWards, getListCity };

// Actions
export const cityActions = citySlice.actions;

// Reducers
const persistConfig: PersistConfig<typeof initialState> = {
  key: "city:slice",
  storage: storage,
};
export default persistReducer(persistConfig, citySlice.reducer);
