import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import sidebar from "./sidebar";
import sidebarMain from "./sidebarMain";
import jobs from "./jobs";
import appliedJob from "./appliedJob";
import listCreateJob from "./listCreateJob";
import userAppliedJob from "./userAppliedJob";

const rootReducer = combineReducers({
  auth,
  sidebar,
  jobs,
  sidebarMain,
  appliedJob,
  listCreateJob,
  userAppliedJob
});

export default rootReducer;
