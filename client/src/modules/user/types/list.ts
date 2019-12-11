import {Error} from '../../core/models/Error';
import {User} from '../models/User';
import {ILoadingAction, IErrorAction} from '../../core/types/actions';
import {
  USER_LIST_LOADING,
  USER_LIST_SUCCESS,
  USER_LIST_ERROR,
  USER_LIST_RESET
} from '../constants/list';

export type UserListState = Readonly<{
  loading: boolean;
  errors: Error[];
  payload: User[];
}>;

export interface IUserListLoadingAction extends ILoadingAction {
  type: typeof USER_LIST_LOADING;
}

export interface IUserListSuccessAction {
  type: typeof USER_LIST_SUCCESS;
  payload: User[];
}

export interface IUserListErrorAction extends IErrorAction {
  type: typeof USER_LIST_ERROR;
}

export interface IUserListResetAction {
  type: typeof USER_LIST_RESET;
}

export type UserListActionTypes =
  | IUserListLoadingAction
  | IUserListSuccessAction
  | IUserListErrorAction
  | IUserListResetAction;
