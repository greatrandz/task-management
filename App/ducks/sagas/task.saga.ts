import { SagaIterator } from "@redux-saga/core";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { taskActions } from "../slices/task.slice";
import { TaskAPI } from "@App/api/task.api";
import { Task } from "@App/models";

function* handleLoadTasks(api: TaskAPI, action: {
  type: typeof taskActions.createNewTask.type;
  payload: Task;
}): SagaIterator {
  try {
      const result = yield call(api.loadTasks);
      if (result && result?.data) {
        console.log(`handleLoadTasks: `, result.data)
        yield put(taskActions.loadTasksSuccess(result.data));
      }
  
  } catch (error: any) {    
      const message = typeof error.error === "object" ? error.error[0] : error.message || error.error || "Somthing went wrong";
      const failedMessage = message?.replace(/^(HttpException:|NotFoundException:)\s*/, "");
  
      yield put(taskActions.loadTasksFailure({ message: failedMessage, status: error?.status ?? 500}));
      yield delay(1000);
      yield put(taskActions.loadTasksFailure({}));
  }
}

function* handleCreateNewTask(api: TaskAPI, action: {
    type: typeof taskActions.createNewTask.type;
    payload: Task;
  }): SagaIterator {
    try {
        const result = yield call(api.createNewTask, action.payload);
    
        console.log(`handleCreateNewTask: `, result.data)
        // yield put(taskActions.createNewTaskSuccess({...result.data }));
    
    } catch (error: any) {    
        const message = typeof error.error === "object" ? error.error[0] : error.message || error.error || "Somthing went wrong";
        const failedMessage = message?.replace(/^(HttpException:|NotFoundException:)\s*/, "");
    
        yield put(taskActions.createNewTaskFailure({ message: failedMessage, status: error?.status ?? 500}));
        yield delay(1000);
        yield put(taskActions.createNewTaskFailure({}));
    }
}

function* handleUpdateTask(api: TaskAPI, action: {
  type: typeof taskActions.updateTask.type;
  payload: Task;
}): SagaIterator {
  try {
      const result = yield call(api.updateTask, action.payload);
  
      console.log(`handleUpdateTask: `, result.data)
      // yield put(taskActions.updateTaskSuccess({...result.data }));
  
  } catch (error: any) {    
      const message = typeof error.error === "object" ? error.error[0] : error.message || error.error || "Somthing went wrong";
      const failedMessage = message?.replace(/^(HttpException:|NotFoundException:)\s*/, "");
  
      yield put(taskActions.updateTaskFailure({ message: failedMessage, status: error?.status ?? 500}));
      yield delay(1000);
      yield put(taskActions.updateTaskFailure({}));
  }
}

function* handleSoftDeleteTask(api: TaskAPI, action: {
  type: typeof taskActions.deleteTask.type;
  payload: Task;
}): SagaIterator {
  try {
      const timestamp = new Date().toISOString();
      const result = yield call(api.updateTask, { ...action.payload, deleted_at: timestamp });
  
      console.log(`handleDeleteTask: `, result.data)
      // yield put(taskActions.updateTaskSuccess({...result.data }));
  
  } catch (error: any) {    
      const message = typeof error.error === "object" ? error.error[0] : error.message || error.error || "Somthing went wrong";
      const failedMessage = message?.replace(/^(HttpException:|NotFoundException:)\s*/, "");
  
      yield put(taskActions.updateTaskFailure({ message: failedMessage, status: error?.status ?? 500}));
      yield delay(1000);
      yield put(taskActions.updateTaskFailure({}));
  }
}

function* handlePermanentDeleteTask(api: TaskAPI, action: {
  type: typeof taskActions.deleteTask.type;
  payload: number;
}): SagaIterator {
  try {
      const result = yield call(api.deleteTask, action.payload);
  
      console.log(`handleDeleteTask: `, result.data)
      // yield put(taskActions.updateTaskSuccess({...result.data }));
  
  } catch (error: any) {    
      const message = typeof error.error === "object" ? error.error[0] : error.message || error.error || "Somthing went wrong";
      const failedMessage = message?.replace(/^(HttpException:|NotFoundException:)\s*/, "");
  
      yield put(taskActions.updateTaskFailure({ message: failedMessage, status: error?.status ?? 500}));
      yield delay(1000);
      yield put(taskActions.updateTaskFailure({}));
  }
}

// Watcher Saga
function* authWatcherSaga(api: TaskAPI): SagaIterator {
  yield takeLatest(taskActions.loadTasks.type, handleLoadTasks, api);
  yield takeLatest(taskActions.createNewTask.type, handleCreateNewTask, api);
  yield takeLatest(taskActions.updateTask.type, handleUpdateTask, api);
  yield takeLatest(taskActions.deleteTask.type, handleSoftDeleteTask, api);
}

export default authWatcherSaga;
