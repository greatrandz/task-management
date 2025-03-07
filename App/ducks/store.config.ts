import AsyncStorage from "@react-native-async-storage/async-storage";
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";
import rootReducer from "./rootReducer";
import rootSaga from "./sagas";

const persistConfig = {
  key: "task-management",
  storage: AsyncStorage,
  whitelist: ["auth", "task"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      thunk: false,
      serializableCheck: false
    }).concat(sagaMiddleware);

    // if(NODE_ENV === "development"){
    //   return defaultMiddleware.concat(logger);
    // }

    return defaultMiddleware;
  }
});
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
