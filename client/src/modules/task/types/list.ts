import {Error} from '../../core/models/Error';
import {Task} from '../models/Task';
import {ILoadingAction, IErrorAction} from '../../core/types/actions';
import {
  TASK_LIST_LOADING,
  TASK_LIST_SUCCESS,
  TASK_LIST_ERROR,
  TASK_LIST_RESET
} from '../constants/list';

export type TaskListState = Readonly<{
  loading: boolean;
  errors: Error[];
  payload: Task[];
}>;

export interface ITaskListLoadingAction extends ILoadingAction {
  type: typeof TASK_LIST_LOADING;
}

export interface ITaskListSuccessAction {
  type: typeof TASK_LIST_SUCCESS;
  payload: Task[];
}

export interface ITaskListErrorAction extends IErrorAction {
  type: typeof TASK_LIST_ERROR;
}

export interface ITaskListResetAction {
  type: typeof TASK_LIST_RESET;
}

export type TaskListActionTypes =
  | ITaskListLoadingAction
  | ITaskListSuccessAction
  | ITaskListErrorAction
  | ITaskListResetAction;
