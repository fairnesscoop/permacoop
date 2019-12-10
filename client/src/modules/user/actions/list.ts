import {
  USER_LIST_SUCCESS,
  USER_LIST_LOADING,
  USER_LIST_ERROR,
  USER_LIST_RESET
} from '../constants/list';
import {Error} from '../../common/models/Error';
import {
  IUserListSuccessAction,
  IUserListLoadingAction,
  IUserListErrorAction,
  IUserListResetAction
} from '../types/list';
import {User} from '../models/User';

export const success = (payload: User[]): IUserListSuccessAction => ({
  type: USER_LIST_SUCCESS,
  payload
});

export const loading = (loading: boolean): IUserListLoadingAction => ({
  type: USER_LIST_LOADING,
  loading
});

export const errors = (errors: Error[]): IUserListErrorAction => ({
  type: USER_LIST_ERROR,
  errors
});

export const reset = (): IUserListResetAction => ({
  type: USER_LIST_RESET
});
