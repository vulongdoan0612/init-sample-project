import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import sidebar from "./sidebar";
import sidebarMain from "./sidebarMain";

const rootReducer = combineReducers({
  auth,
  sidebar,

  sidebarMain,

});

export default rootReducer;
