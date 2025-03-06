// DUCKS pattern
import { createAction, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@App/ducks/store";

interface LoginParams {
    username: string;
    password: string;
}

export interface AuthState {
  loading: boolean;
  token: string;
  error: Error
}

export const initialState: AuthState = {
  loading: false,
  token: "",
  error: {} as Error,
};

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginParams>) => {
        state.loading = true;
        state.error = {} as Error;
    },
    loginSuccess: (state, action) => {
      console.log("action---",action);
      state.token = "asdfasdf";
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetLoading: (state) => {
      state.loading = false;
    },

    logout: (state) => {
      
    },
  },
});

// Actions
export const authActions = {
  loginRequest: createAction(
    `${authSlice.name}/loginRequest`,
    (params: any) => ({
      payload: params,
    })
  ),
  loginSuccess: authSlice.actions.loginSuccess,
  loginFailure: authSlice.actions.loginFailure,
};

// Selectors
export const selectAuthToken = (state: RootState) => state.auth.token;


// Reducer
export default authSlice.reducer;
