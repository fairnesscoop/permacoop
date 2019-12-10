import {
  TASK_UPSERT_SUCCESS,
  TASK_UPSERT_LOADING,
  TASK_UPSERT_ERROR,
  TASK_UPSERT_RESET
} from '../constants/upsert';
import {Error} from '../../common/models/Error';
import {
  ITaskUpsertSuccessAction,
  ITaskUpsertLoadingAction,
  ITaskUpsertErrorAction,
  ITaskUpsertResetAction
} from '../types/upsert';
import {Task} from '../models/Task';

export const success = (payload: Task): ITaskUpsertSuccessAction => ({
  type: TASK_UPSERT_SUCCESS,
  payload
});

export const loading = (loading: boolean): ITaskUpsertLoadingAction => ({
  type: TASK_UPSERT_LOADING,
  loading
});

export const errors = (errors: Error[]): ITaskUpsertErrorAction => ({
  type: TASK_UPSERT_ERROR,
  errors
});

export const reset = (): ITaskUpsertResetAction => ({
  type: TASK_UPSERT_RESET
});
