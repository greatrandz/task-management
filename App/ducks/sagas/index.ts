import { all, put, takeLatest, fork } from 'redux-saga/effects'

/* ------------- API SERVICES ------------- */

// import { networkSaga } from 'react-native-offline';
import authWatcherSaga from './auth.saga'
import taskWatcherSaga from './task.saga'

import AuthAPI from '@App/api/auth.api'
import TaskAPI from "@App/api/task.api";

export default function* root() {
  yield all([
    
      // NETWORK SAGA
    // fork(networkSaga as any, { pingInterval: 20000 }),

    // USER SAGA
    //takeLatest(UserTypes.REQUEST_FETCH_USERS,  fetchUsers, firestoreModule),

    // AUTH SAGA
    // ...require(`./auth-saga`).default(),
    fork(authWatcherSaga, AuthAPI),
    fork(taskWatcherSaga, TaskAPI)
  ])
}