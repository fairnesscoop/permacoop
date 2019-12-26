import {Error} from '../models/Error';
import {ILoadingAction, IErrorAction} from './actions';
import {
  CORE_SHOW_LOADING,
  CORE_SHOW_SUCCESS,
  CORE_SHOW_ERROR,
  CORE_SHOW_RESET
} from '../constants/show';

export type CoreShowState = Readonly<{
  loading: boolean;
  errors: Error[];
  payload: any | null;
}>;

export interface ICoreShowLoadingAction extends ILoadingAction {
  type: typeof CORE_SHOW_LOADING;
}

export interface ICoreShowSuccessAction {
  type: typeof CORE_SHOW_SUCCESS;
  payload: any;
}

export interface ICoreShowErrorAction extends IErrorAction {
  type: typeof CORE_SHOW_ERROR;
}

export interface ICoreShowResetAction {
  type: typeof CORE_SHOW_RESET;
}

export type CoreShowActionTypes =
  | ICoreShowLoadingAction
  | ICoreShowSuccessAction
  | ICoreShowErrorAction
  | ICoreShowResetAction;
