import {
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_LOADING,
  PROJECT_LIST_ERROR,
  PROJECT_LIST_RESET
} from '../constants/list';
import {Error} from '../../common/models/Error';
import {
  IProjectListSuccessAction,
  IProjectListLoadingAction,
  IProjectListErrorAction,
  IProjectListResetAction
} from '../types/list';
import {Project} from '../models/Project';

export const success = (payload: Project[]): IProjectListSuccessAction => ({
  type: PROJECT_LIST_SUCCESS,
  payload
});

export const loading = (loading: boolean): IProjectListLoadingAction => ({
  type: PROJECT_LIST_LOADING,
  loading
});

export const errors = (errors: Error[]): IProjectListErrorAction => ({
  type: PROJECT_LIST_ERROR,
  errors
});

export const reset = (): IProjectListResetAction => ({
  type: PROJECT_LIST_RESET
});
