import {Error} from '../../common/models/Error';
import {Task} from '../models/Task';
import {ILoadingAction, IErrorAction} from '../../common/types/actions';
import {
  TASK_UPSERT_LOADING,
  TASK_UPSERT_SUCCESS,
  TASK_UPSERT_ERROR,
  TASK_UPSERT_RESET
} from '../constants/upsert';

export type TaskUpsertState = Readonly<{
  loading: boolean;
  errors: Error[];
  payload: Task | null;
}>;

export interface ITaskUpsertLoadingAction extends ILoadingAction {
  type: typeof TASK_UPSERT_LOADING;
}

export interface ITaskUpsertSuccessAction {
  type: typeof TASK_UPSERT_SUCCESS;
  payload: Task;
}

export interface ITaskUpsertErrorAction extends IErrorAction {
  type: typeof TASK_UPSERT_ERROR;
}

export interface ITaskUpsertResetAction {
  type: typeof TASK_UPSERT_RESET;
}

export interface ITaskUpsertValidation {
  name: string;
}

export type TaskUpsertActionTypes =
  | ITaskUpsertLoadingAction
  | ITaskUpsertSuccessAction
  | ITaskUpsertErrorAction
  | ITaskUpsertResetAction;
