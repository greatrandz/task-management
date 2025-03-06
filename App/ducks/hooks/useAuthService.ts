import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../ducksHook";
import {
  authActions,
  selectAuthToken
} from "../slices/auth.slice";

export type AuthServiceOperators = {
    accessToken: string;
    onSignin: (params: any) => void;
};

export const useAuthService = (): Readonly<AuthServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    accessToken: useAppSelector(selectAuthToken),
    onSignin: useCallback(
      (params: any) => {
        dispatch(authActions.loginRequest(params));
      },
      [dispatch]
    ),
  };
};

export default useAuthService;
