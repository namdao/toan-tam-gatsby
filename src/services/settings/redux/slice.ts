import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersistConfig } from "redux-persist/lib/types";
import { persistReducer } from "redux-persist";
import { RootState } from "store";
import storage from "redux-persist/lib/storage";

export type ThemeModeValue = "light" | "dark";
export type ThemeDirectionValue = "rtl" | "ltr";
export type ThemeContrastValue = "default" | "bold";
export type ThemeLayoutValue = "vertical" | "horizontal" | "mini";
export type ThemeColorPresetsValue =
  | "default"
  | "cyan"
  | "purple"
  | "blue"
  | "orange"
  | "red";
export type ThemeStretchValue = boolean;

export type SettingsValueProps = {
  themeMode: ThemeModeValue;
  themeLayout: ThemeLayoutValue;
  themeStretch: ThemeStretchValue;
  themeContrast: ThemeContrastValue;
  themeDirection: ThemeDirectionValue;
  themeColorPresets: ThemeColorPresetsValue;
};
type ISettings = {
  url: string;
  themes: SettingsValueProps;
  langs: "vi" | "en";
};
export const defaultSettings: SettingsValueProps = {
  themeMode: "light",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "vertical",
  themeColorPresets: "default",
  themeStretch: false,
};
const initialState: ISettings = {
  url: "",
  themes: defaultSettings,
  langs: "vi",
};

// Slice
const settingsSlice = createSlice({
  name: "service:settings",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setThemeMode: (state, action: PayloadAction<ThemeModeValue>) => {
      state.themes.themeMode = action.payload;
    },
    setThemeLayout: (state, action: PayloadAction<ThemeLayoutValue>) => {
      state.themes.themeLayout = action.payload;
    },
    setThemeStretch: (state, action: PayloadAction<ThemeStretchValue>) => {
      state.themes.themeStretch = action.payload;
    },
    setThemeContrast: (state, action: PayloadAction<ThemeContrastValue>) => {
      state.themes.themeContrast = action.payload;
    },
    setThemeDirection: (state, action: PayloadAction<ThemeDirectionValue>) => {
      state.themes.themeDirection = action.payload;
    },
    setThemeColorPresets: (
      state,
      action: PayloadAction<ThemeColorPresetsValue>
    ) => {
      state.themes.themeColorPresets = action.payload;
    },
    onResetSettings: (state) => {
      state.themes = defaultSettings;
    },
    onChangeLangs: (state, action: PayloadAction<"en" | "vi">) => {
      state.langs = action.payload;
    },
  },
});

// Selectors
const getUrl = (state: RootState) => state.services.settings.url;
const getThemeMode = (state: RootState) =>
  state.services.settings.themes.themeMode;
const getThemeLayout = (state: RootState) =>
  state.services.settings.themes.themeLayout;
const getThemeStretch = (state: RootState) =>
  state.services.settings.themes.themeStretch;
const getThemeContract = (state: RootState) =>
  state.services.settings.themes.themeContrast;
const getThemeDirection = (state: RootState) =>
  state.services.settings.themes.themeDirection;
const getThemeColorPresets = (state: RootState) =>
  state.services.settings.themes.themeColorPresets;
const getLangsDefault = (state: RootState) => state.services.settings.langs;
export const SettingsSelector = {
  getUrl,
  getThemeMode,
  getThemeColorPresets,
  getThemeContract,
  getThemeDirection,
  getThemeLayout,
  getThemeStretch,
  getLangsDefault,
};

// Actions
export const settingsActions = settingsSlice.actions;

// Reducers
const persistConfig: PersistConfig<typeof initialState> = {
  key: "service:settings",
  storage: storage,
};
export default persistReducer(persistConfig, settingsSlice.reducer);
