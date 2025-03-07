import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../ducksHook";
import {
  taskActions,
  selectedError,
  selectedLoading,
} from "../slices/task.slice";
import { APIError, Task } from "@App/models";
import { selectedTasks } from "../slices/task.slice";

export type TaskServiceOperators = {
    error: APIError | null;
    loading: boolean;
    tasks: Task[];
    onLoadTasks: () => void;
    onCreateNewTask: (params: Task) => void;
    onCreateNewTaskSuccess: (params: Task[]) => void;
    onUpdateTask: (params: Task) => void;
    onUpdateTaskSuccess: (params: Task[]) => void;
    onDeleteTask: (params: Task) => void;
    onDeleteTaskSuccess: (params: Task[]) => void;
};

export const useTaskService = (): Readonly<TaskServiceOperators> => {
  const dispatch = useAppDispatch();

  return {
    error: useAppSelector(selectedError),
    loading: useAppSelector(selectedLoading),
    tasks: useAppSelector(selectedTasks),
    onLoadTasks: useCallback(
      () => {
        dispatch(taskActions.loadTasks());
      },
      [dispatch]
    ),
    onCreateNewTask: useCallback(
      (params: Task) => {
        dispatch(taskActions.createNewTask(params));
      },
      [dispatch]
    ),
    onCreateNewTaskSuccess: useCallback(
      (params: Task[]) => {
        dispatch(taskActions.createNewTaskSuccess(params));
      },
      [dispatch]
    ),
    onUpdateTask: useCallback(
      (params: Task) => {
        dispatch(taskActions.updateTask(params));
      },
      [dispatch]
    ),
    onUpdateTaskSuccess: useCallback(
      (params: Task[]) => {
        dispatch(taskActions.updateTaskSuccess(params));
      },
      [dispatch]
    ),
    onDeleteTask: useCallback(
      (params: Task) => {
        dispatch(taskActions.deleteTask(params));
      },
      [dispatch]
    ),
    onDeleteTaskSuccess: useCallback(
      (params: Task[]) => {
        dispatch(taskActions.deleteTaskSuccess(params));
      },
      [dispatch]
    ),
  };
};

export default useTaskService;