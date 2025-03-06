import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/auth.slice";

const reducer = combineReducers({
  auth,
}); // ADD SLICES HERE

export default reducer;
