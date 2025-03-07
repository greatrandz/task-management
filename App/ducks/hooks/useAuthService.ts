import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../ducksHook";
import {
  authActions,
  selectedAccessToken,
  selectedError,
  selectedLoading,
  selectedLoadingMessage
} from "../slices/auth.slice";
import { AuthLogin, APIError } from "@App/models";
import { Session } from "@supabase/supabase-js";

export type AuthServiceOperators = {
    error: APIError | null,
    loading: boolean;
    loadingMessage: string;
    accessToken: string;
    onSignIn: (params: AuthLogin) => void;
    onSignUp: (params: AuthLogin) => void;
    onSignUpSuccess: (params: Session) => void;
    onSignOut: () => void;
    onResetLoading: () => void;
};

export const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    error: useAppSelector(selectedError),
    loading: useAppSelector(selectedLoading),
    loadingMessage: useAppSelector(selectedLoadingMessage),
    accessToken: useAppSelector(selectedAccessToken),
    onSignIn: useCallback(
      (params: any) => {
        dispatch(authActions.signInRequest(params));
      },
      [dispatch]
    ),
    onSignUp: useCallback(
      (params: AuthLogin) => {
        dispatch(authActions.signUpRequest(params));
      },
      [dispatch]
    ),
    onSignUpSuccess: useCallback(
      (params: Session) => {
        dispatch(authActions.signUpSuccess(params));
      },
      [dispatch]
    ),
    onSignOut: useCallback(
      () => {
        dispatch(authActions.signOut());
      },
      [dispatch]
    ),
    onResetLoading: useCallback(
      () => {
        dispatch(authActions.resetLoading());
      },
      [dispatch]
    ),
  };
};

export default useAuthService;
