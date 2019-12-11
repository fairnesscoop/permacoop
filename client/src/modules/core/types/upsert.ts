import {Error} from '../models/Error';
import {ILoadingAction, IErrorAction} from './actions';
import {
  CORE_UPSERT_LOADING,
  CORE_UPSERT_SUCCESS,
  CORE_UPSERT_ERROR,
  CORE_UPSERT_RESET
} from '../constants/upsert';

export type CoreUpsertState<Model> = Readonly<{
  loading: boolean;
  errors: Error[];
  payload: Model | null;
}>;

export interface ICoreUpsertLoadingAction extends ILoadingAction {
  type: typeof CORE_UPSERT_LOADING;
}

export interface ICoreUpsertSuccessAction<Model> {
  type: typeof CORE_UPSERT_SUCCESS;
  payload: Model;
}

export interface ICoreUpsertErrorAction extends IErrorAction {
  type: typeof CORE_UPSERT_ERROR;
}

export interface ICoreUpsertResetAction {
  type: typeof CORE_UPSERT_RESET;
}

export type CoreUpsertActionTypes =
  | ICoreUpsertLoadingAction
  | ICoreUpsertSuccessAction<any>
  | ICoreUpsertErrorAction
  | ICoreUpsertResetAction;
