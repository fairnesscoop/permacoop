import {
  CORE_UPSERT_SUCCESS,
  CORE_UPSERT_LOADING,
  CORE_UPSERT_ERROR,
  CORE_UPSERT_RESET
} from '../constants/upsert';
import {Error} from '../models/Error';
import {
  ICoreUpsertSuccessAction,
  ICoreUpsertLoadingAction,
  ICoreUpsertErrorAction,
  ICoreUpsertResetAction
} from '../types/upsert';

export const success = (payload: any): ICoreUpsertSuccessAction<any> => ({
  type: CORE_UPSERT_SUCCESS,
  payload
});

export const loading = (loading: boolean): ICoreUpsertLoadingAction => ({
  type: CORE_UPSERT_LOADING,
  loading
});

export const errors = (errors: Error[]): ICoreUpsertErrorAction => ({
  type: CORE_UPSERT_ERROR,
  errors
});

export const reset = (): ICoreUpsertResetAction => ({
  type: CORE_UPSERT_RESET
});
