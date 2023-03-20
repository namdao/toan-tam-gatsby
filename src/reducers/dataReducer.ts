import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "scenes/auth/redux/slice";
import accountReducer from "scenes/account/redux/slice";
import ordersReducer from "scenes/orders/redux/slice";

export default combineReducers({
  auth: authReducer,
  account: accountReducer,
  order: ordersReducer,
});
