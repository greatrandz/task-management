import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth.slice";
import task from "./slices/task.slice";

const reducer = combineReducers({
  auth,
  task,
}); // ADD SLICES HERE

export default reducer;
