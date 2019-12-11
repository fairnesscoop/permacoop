import {Error} from '../models/Error';

export interface IErrorAction {
  errors: Error[];
}

export interface ILoadingAction {
  loading: boolean;
}
