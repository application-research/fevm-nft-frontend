import { combineReducers, configureStore } from "@reduxjs/toolkit";
import global from "./global";
import notification from "./notification";

const reducer = combineReducers({
  notification,
  global,
});

export default configureStore({
  reducer,
});
