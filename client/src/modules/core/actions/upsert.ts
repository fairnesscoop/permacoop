import {
  CORE_UPSERT_SUCCESS,
  CORE_UPSERT_LOADING,
  CORE_UPSERT_ERROR,
  CORE_UPSERT_RESET
} from '../constants/upsert';
import {
  ICoreUpsertSuccessAction,
  ICoreUpsertLoadingAction,
  ICoreUpsertErrorAction,
  ICoreUpsertResetAction
} from '../types/upsert';
import {errorNormalizer} from '../../../normalizer/errors';

export const success = (payload: any): ICoreUpsertSuccessAction => ({
  type: CORE_UPSERT_SUCCESS,
  payload
});

export const loading = (loading: boolean): ICoreUpsertLoadingAction => ({
  type: CORE_UPSERT_LOADING,
  loading
});

export const errors = (e: any): ICoreUpsertErrorAction => ({
  type: CORE_UPSERT_ERROR,
  errors: errorNormalizer(e)
});

export const reset = (): ICoreUpsertResetAction => ({
  type: CORE_UPSERT_RESET
});
