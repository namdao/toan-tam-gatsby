import { combineReducers } from "@reduxjs/toolkit";
import settings from "services/settings/redux/slice";
import city from "services/settings/redux/city.slice";
export default combineReducers({
  settings,
  city,
});
