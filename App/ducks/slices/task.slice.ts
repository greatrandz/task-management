// DUCKS pattern
import { Platform } from "react-native";
import { createAction, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@App/ducks/store.config";
import { APIError, Task } from "@App/models";
import { Session } from "@supabase/supabase-js";
const isWeb = Platform.OS === 'web'

export interface TaskState {
  loading: boolean;
  tasks: Task[]
  error: APIError | null
}

export const initialState: TaskState = {
  loading: false,
  tasks: [],
  error: null,
};

// Slice
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    loadTasks: (state) => {
      state.loading = true;
      state.error = null;
    },
    createNewTask: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTask: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTask: (state) => {
      state.loading = true;
      state.error = null;
    },
    taskSuccess: (state, action: PayloadAction<Task[]>) => {
      console.log("action---",action.payload);
      state.loading = false;
      state.tasks = action.payload.filter(task => !task.deleted_at)
    },
    taskFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    resetLoading: (state) => {
      state.loading = false;
    },
  },
});

// Actions
export const taskActions = {
  loadTasks: createAction(`${taskSlice.name}/loadTasks`),
  createNewTask: createAction(
    `${taskSlice.name}/createNewTask`,
    (params: Task) => ({
      payload: params,
    })
  ),
  updateTask: createAction(
    `${taskSlice.name}/updateTask`,
    (params: Task) => ({
      payload: params,
    })
  ),
  deleteTask: createAction(
    `${taskSlice.name}/deleteTask`,
    (params: Task) => ({
      payload: params,
    })
  ),
  loadTasksSuccess: taskSlice.actions.taskSuccess,
  loadTasksFailure: taskSlice.actions.taskFailure,
  createNewTaskSuccess: taskSlice.actions.taskSuccess,
  createNewTaskFailure: taskSlice.actions.taskFailure,
  updateTaskSuccess: taskSlice.actions.taskSuccess,
  updateTaskFailure: taskSlice.actions.taskFailure,
  deleteTaskSuccess: taskSlice.actions.taskSuccess,
  deleteTaskFailure: taskSlice.actions.taskFailure,
  
  resetLoading: taskSlice.actions.resetLoading,
};

// Selectors
export const selectedError = (state: RootState) => state.task.error;
export const selectedLoading = (state: RootState) => state.task.loading;
export const selectedTasks = (state: RootState) => state.task.tasks;


// Reducer
export default taskSlice.reducer;
