import {Error} from '../../core/models/Error';
import {Project} from '../models/Project';
import {ILoadingAction, IErrorAction} from '../../core/types/actions';
import {
  PROJECT_LIST_LOADING,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_ERROR,
  PROJECT_LIST_RESET
} from '../constants/list';

export type ProjectListState = Readonly<{
  loading: boolean;
  errors: Error[];
  payload: Project[];
}>;

export interface IProjectListLoadingAction extends ILoadingAction {
  type: typeof PROJECT_LIST_LOADING;
}

export interface IProjectListSuccessAction {
  type: typeof PROJECT_LIST_SUCCESS;
  payload: Project[];
}

export interface IProjectListErrorAction extends IErrorAction {
  type: typeof PROJECT_LIST_ERROR;
}

export interface IProjectListResetAction {
  type: typeof PROJECT_LIST_RESET;
}

export type ProjectListActionTypes =
  | IProjectListLoadingAction
  | IProjectListSuccessAction
  | IProjectListErrorAction
  | IProjectListResetAction;
