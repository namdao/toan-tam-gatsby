import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "scenes/auth/redux/slice";
import accountReducer from "scenes/account/redux/slice";

export default combineReducers({
  auth: authReducer,
  account: accountReducer,
});
