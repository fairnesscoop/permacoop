import {
  CORE_LIST_SUCCESS,
  CORE_LIST_LOADING,
  CORE_LIST_ERROR,
  CORE_LIST_RESET
} from '../constants/list';
import {
  ICoreListSuccessAction,
  ICoreListLoadingAction,
  ICoreListErrorAction,
  ICoreListResetAction
} from '../types/list';
import {errorNormalizer} from '../../../normalizer/errors';

export const success = (payload: any): ICoreListSuccessAction<any> => ({
  type: CORE_LIST_SUCCESS,
  payload
});

export const loading = (loading: boolean): ICoreListLoadingAction => ({
  type: CORE_LIST_LOADING,
  loading
});

export const errors = (e: any): ICoreListErrorAction => ({
  type: CORE_LIST_ERROR,
  errors: errorNormalizer(e)
});

export const reset = (): ICoreListResetAction => ({
  type: CORE_LIST_RESET
});
