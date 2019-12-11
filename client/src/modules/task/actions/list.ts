import {
  TASK_LIST_SUCCESS,
  TASK_LIST_LOADING,
  TASK_LIST_ERROR,
  TASK_LIST_RESET
} from '../constants/list';
import {Error} from '../../core/models/Error';
import {
  ITaskListSuccessAction,
  ITaskListLoadingAction,
  ITaskListErrorAction,
  ITaskListResetAction
} from '../types/list';
import {Task} from '../models/Task';

export const success = (payload: Task[]): ITaskListSuccessAction => ({
  type: TASK_LIST_SUCCESS,
  payload
});

export const loading = (loading: boolean): ITaskListLoadingAction => ({
  type: TASK_LIST_LOADING,
  loading
});

export const errors = (errors: Error[]): ITaskListErrorAction => ({
  type: TASK_LIST_ERROR,
  errors
});

export const reset = (): ITaskListResetAction => ({
  type: TASK_LIST_RESET
});
