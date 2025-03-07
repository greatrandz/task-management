import { SagaIterator } from "@redux-saga/core";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import  { AuthContextValue } from "@App/api/provider/AuthProvider";
import { authActions, selectedAccessToken } from "../slices/auth.slice";
import { AuthLogin } from '@App/models'
import { AuthAPI } from "@App/api";
import { Platform } from "react-native";
const isWeb = Platform.OS === 'web'

function* handleSignIn(api: AuthAPI, action: {
    type: typeof authActions.signInRequest.type;
    payload: AuthLogin;
  }): SagaIterator {
    try {
        const { email, password } = action.payload
        const result = yield call(api.signInWithEmail, email, password);
    
        console.log(`handleSignin: `, result.data)
        yield put(authActions.signInSuccess({...result.data, loginType: "Sign In via Email"}));
    
    } catch (error: any) {    
        const message = typeof error.error === "object" ? error.error[0] : error.message || error.error || "Somthing went wrong";
        const failedMessage = message?.replace(/^(HttpException:|NotFoundException:)\s*/, "");
    
        yield put(authActions.signInFailure({ message: failedMessage, status: error?.status ?? 500}));
        yield delay(1000);
        yield put(authActions.signInFailure(null));
    }
}

function* handleSignUp(api: AuthAPI, action: {
  type: typeof authActions.signUpRequest.type;
  payload: AuthLogin;
}): SagaIterator {
  try {
      const { email, password } = action.payload
      yield put(authActions.setLoadingMessage(`We've sent a verification email to ${email}. Please check your inbox.`))
      yield call(api.signUpWithEmail, email, password);
      if (!isWeb) {
        yield delay(15000)
        yield put(authActions.resetLoading())
      }
   } catch (error: any) {    
      const message = typeof error.error === "object" ? error.error[0] : error.message || error.error || "Somthing went wrong";
      const failedMessage = message?.replace(/^(HttpException:|NotFoundException:)\s*/, "");
  
      yield put(authActions.signUpFailure({ message: failedMessage, status: error?.status ?? 500}));
      yield delay(1000);
      yield put(authActions.signUpFailure(null));
  }
}

function* handleSignOut(api: AuthAPI, action: {
  type: typeof authActions.signOut.type;
  payload: AuthLogin;
}): SagaIterator {
  try {
      yield call(api.signOut);
  
  } catch (error: any) {    
  }
}

// Watcher Saga
function* authWatcherSaga(api: AuthAPI): SagaIterator {
  yield takeLatest(authActions.signInRequest.type, handleSignIn, api);
  yield takeLatest(authActions.signUpRequest.type, handleSignUp, api);
  yield takeLatest(authActions.signOut.type, handleSignOut, api);
}

export default authWatcherSaga;
