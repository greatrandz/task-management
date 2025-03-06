import { SagaIterator } from "@redux-saga/core";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";

import { authActions, selectAuthToken } from "../slices/auth.slice";

function* handleSignin(api: any, action: {
    type: typeof authActions.loginRequest.type;
    payload: any;
  }): SagaIterator {
    try {
        const user = yield call(api.login, action.payload);
    
        console.log(`handleSignin: `, user.data)
        yield put(authActions.loginSuccess({...user.data, loginType: "Login via Email"}));
    
    } catch (error: any) {    
        const message = typeof error.error === "object" ? error.error[0] : error.message || error.error || "Somthing went wrong";
        const failedMessage = message?.replace(/^(HttpException:|NotFoundException:)\s*/, "");
    
        yield put(authActions.loginFailure({ message: failedMessage, status: error?.status ?? 500}));
        yield delay(1000);
        yield put(authActions.loginFailure({}));
    }
}

// Watcher Saga
function* authWatcherSaga(api: any): SagaIterator {
  yield takeLatest(authActions.loginRequest.type, handleSignin, api);
}

export default authWatcherSaga;
