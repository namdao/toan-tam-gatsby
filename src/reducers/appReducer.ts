import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "./dataReducer";
import servicesReducer from "./servicesReducer";
const appReducer = combineReducers({
  services: servicesReducer,
  data: dataReducer,
});
export type RootState = ReturnType<typeof appReducer>;
export default appReducer;
