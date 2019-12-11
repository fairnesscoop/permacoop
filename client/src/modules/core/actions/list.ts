import {
  CORE_LIST_SUCCESS,
  CORE_LIST_LOADING,
  CORE_LIST_ERROR,
  CORE_LIST_RESET
} from '../constants/list';
import {Error} from '../../core/models/Error';
import {
  ICoreListSuccessAction,
  ICoreListLoadingAction,
  ICoreListErrorAction,
  ICoreListResetAction
} from '../types/list';

export const success = (payload: any): ICoreListSuccessAction<any> => ({
  type: CORE_LIST_SUCCESS,
  payload
});

export const loading = (loading: boolean): ICoreListLoadingAction => ({
  type: CORE_LIST_LOADING,
  loading
});

export const errors = (errors: Error[]): ICoreListErrorAction => ({
  type: CORE_LIST_ERROR,
  errors
});

export const reset = (): ICoreListResetAction => ({
  type: CORE_LIST_RESET
});
