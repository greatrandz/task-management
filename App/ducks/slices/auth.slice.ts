// DUCKS pattern
import { Platform } from "react-native";
import { createAction, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@App/ducks/store.config";
import { AuthLogin, APIError } from "@App/models";
import { Session } from "@supabase/supabase-js";
const isWeb = Platform.OS === 'web'

export interface AuthState {
  loading: boolean;
  loadingMessage: string;
  accessToken: string;
  error: APIError | null
}

export const initialState: AuthState = {
  loading: false,
  loadingMessage: "",
  accessToken: "",
  error: null,
};

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpRequest: (state, action: PayloadAction<AuthLogin>) => {
      state.loadingMessage = "Please wait..."
      state.loading = true;
      state.error = null;
    },
    signInRequest: (state, action: PayloadAction<AuthLogin>) => {
      state.loadingMessage = ""
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      console.log("action---",action.payload);
      state.accessToken = action.payload.session.access_token;
      state.loading = false
    },
    signUpSuccess: (state, action: PayloadAction<Session>) => {
      console.log("action---",action.payload);
      state.loading = false;
      state.accessToken = action.payload.access_token;
    },
    authFailure: (state, action) => {
      state.loadingMessage = ""
      state.error = action.payload;
      state.loading = false;
    },
    setLoadingMessage: (state, action) => {
      state.loading = true
      state.loadingMessage = action.payload
    },
    resetLoading: (state) => {
      state.loading = false;
      state.loadingMessage = ""
    },

    signOut: (state) => {
      return initialState
    },
  },
});

// Actions
export const authActions = {
  signInRequest: createAction(
    `${authSlice.name}/signInRequest`,
    (params: AuthLogin) => ({
      payload: params,
    })
  ),
  signUpRequest: createAction(
    `${authSlice.name}/signUpRequest`,
    (params: AuthLogin) => ({
      payload: params,
    })
  ),
  signInSuccess: authSlice.actions.signInSuccess,
  signInFailure: authSlice.actions.authFailure,
  signUpSuccess: authSlice.actions.signUpSuccess,
  signUpFailure: authSlice.actions.authFailure,
  setLoadingMessage: authSlice.actions.setLoadingMessage,
  signOut: authSlice.actions.signOut,
  resetLoading: authSlice.actions.resetLoading,
};

// Selectors
export const selectedError = (state: RootState) => state.auth.error;
export const selectedLoading = (state: RootState) => state.auth.loading;
export const selectedLoadingMessage = (state: RootState) => state.auth.loadingMessage;
export const selectedAccessToken = (state: RootState) => state.auth.accessToken;


// Reducer
export default authSlice.reducer;
