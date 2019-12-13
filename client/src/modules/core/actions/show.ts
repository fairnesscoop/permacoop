import {
  CORE_SHOW_SUCCESS,
  CORE_SHOW_LOADING,
  CORE_SHOW_ERROR,
  CORE_SHOW_RESET
} from '../constants/show';
import {Error} from '../models/Error';
import {
  ICoreShowSuccessAction,
  ICoreShowLoadingAction,
  ICoreShowErrorAction,
  ICoreShowResetAction
} from '../types/show';

export const success = (payload: any): ICoreShowSuccessAction<any> => ({
  type: CORE_SHOW_SUCCESS,
  payload
});

export const loading = (loading: boolean): ICoreShowLoadingAction => ({
  type: CORE_SHOW_LOADING,
  loading
});

export const errors = (errors: Error[]): ICoreShowErrorAction => ({
  type: CORE_SHOW_ERROR,
  errors
});

export const reset = (): ICoreShowResetAction => ({
  type: CORE_SHOW_RESET
});
