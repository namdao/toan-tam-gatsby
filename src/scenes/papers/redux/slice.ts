import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/lib/types";
import { persistReducer } from "redux-persist";
import { RootState } from "store";
import storage from "redux-persist/lib/storage";
import { IPaperType } from "./types";
import { PAPER_OTHERS } from "../helper/PaperConstant";

export type PaperState = {
  list: IPaperType[];
};
const initialState: PaperState = {
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
const getListIdPaperLikeName = (state: RootState, groupPaperName: string) => {
  const listPaper = getListPaper(state);
  const listIds: number[] = [];
  const itemPaper = groupPaperName.split("-");
  listPaper.forEach((e) => {
    if (
      e.paper_name.includes(itemPaper?.[0]) ||
      e.paper_name.includes(itemPaper?.[1])
    ) {
      listIds.push(e.id);
    }
  });

  return listIds;
};
const getListIdPaperOther = (state: RootState) => {
  const listPaper = getListPaper(state);
  const listIds: number[] = [];
  listPaper.forEach((item) => {
    switch (true) {
      case item.paper_name.includes(PAPER_OTHERS.CanDiamond):
      case item.paper_name.includes(PAPER_OTHERS.Carton):
      case item.paper_name.includes(PAPER_OTHERS.GiayAnh):
      case item.paper_name.includes(PAPER_OTHERS.GiayDau):
      case item.paper_name.includes(PAPER_OTHERS.KhongThamDau):
      case item.paper_name.includes(PAPER_OTHERS.Nhua):
      case item.paper_name.includes(PAPER_OTHERS.Null):
      case item.paper_name.includes(PAPER_OTHERS.Giay):
      case item.paper_name.includes(PAPER_OTHERS.GiayNen):
      case item.paper_name.includes(PAPER_OTHERS.GiayAnh):
      case item.paper_name.includes(PAPER_OTHERS.MyThuat):
        listIds.push(item.id);
    }
  });
  return listIds;
};
export const PaperTypeSelector = {
  getListPaper,
  getListIdPaperLikeName,
  getListIdPaperOther,
};

// Actions
export const paperTypeActions = paperSlice.actions;

// Reducers
const persistConfig: PersistConfig<typeof initialState> = {
  key: "paper:slice",
  storage: storage,
};
export default persistReducer(persistConfig, paperSlice.reducer);
