/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from "@reduxjs/toolkit";
import { PERSIST, persistStore } from "redux-persist";
import rootReducer from "reducers/rootReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const createStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: false,
        immutableCheck: true,
        serializableCheck: {
          ignoredActions: [PERSIST],
        },
      }),
  });

const persistor = persistStore(createStore());
type ConfiguredStore = ReturnType<typeof createStore>;
type StoreGetState = ConfiguredStore["getState"];
export type RootState = ReturnType<StoreGetState>;
export type AppDispatch = ConfiguredStore["dispatch"];

const useAppDispatch = (): AppDispatch => useDispatch();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { createStore, persistor, useAppDispatch, useAppSelector };
