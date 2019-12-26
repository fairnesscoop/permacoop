import {Error} from '../../core/models/Error';
import {ILoadingAction, IErrorAction} from '../../core/types/actions';
import {
  CORE_LIST_LOADING,
  CORE_LIST_SUCCESS,
  CORE_LIST_ERROR,
  CORE_LIST_RESET
} from '../constants/list';

export type CoreListState = Readonly<{
  loading: boolean;
  errors: Error[];
  payload: any[];
}>;

export interface ICoreListLoadingAction extends ILoadingAction {
  type: typeof CORE_LIST_LOADING;
}

export interface ICoreListSuccessAction {
  type: typeof CORE_LIST_SUCCESS;
  payload: any[];
}

export interface ICoreListErrorAction extends IErrorAction {
  type: typeof CORE_LIST_ERROR;
}

export interface ICoreListResetAction {
  type: typeof CORE_LIST_RESET;
}

export type CoreListActionTypes =
  | ICoreListLoadingAction
  | ICoreListSuccessAction
  | ICoreListErrorAction
  | ICoreListResetAction;
