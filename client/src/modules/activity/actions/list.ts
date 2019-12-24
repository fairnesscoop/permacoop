import {
  ACTIVITY_LIST_SUCCESS,
  ACTIVITY_LIST_LOADING,
  ACTIVITY_LIST_ERROR,
  ACTIVITY_LIST_RESET
} from '../constants/list';
import {
  IActivityListSuccessAction,
  IActivityListLoadingAction,
  IActivityListErrorAction,
  IActivityListResetAction
} from '../types/list';
import {errorNormalizer} from '../../../normalizer/errors';
import {MonthlyActivities} from '../models/MonthlyActivities';

export const success = (
  payload: MonthlyActivities
): IActivityListSuccessAction => ({
  type: ACTIVITY_LIST_SUCCESS,
  payload
});

export const loading = (loading: boolean): IActivityListLoadingAction => ({
  type: ACTIVITY_LIST_LOADING,
  loading
});

export const errors = (e: any): IActivityListErrorAction => ({
  type: ACTIVITY_LIST_ERROR,
  errors: errorNormalizer(e)
});

export const reset = (): IActivityListResetAction => ({
  type: ACTIVITY_LIST_RESET
});
