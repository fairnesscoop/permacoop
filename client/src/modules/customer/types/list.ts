import {Error} from '../../core/models/Error';
import {Customer} from '../models/Customer';
import {ILoadingAction, IErrorAction} from '../../core/types/actions';
import {
  CUSTOMER_LIST_LOADING,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_ERROR,
  CUSTOMER_LIST_RESET
} from '../constants/list';

export type CustomerListState = Readonly<{
  loading: boolean;
  errors: Error[];
  payload: Customer[];
}>;

export interface ICustomerListLoadingAction extends ILoadingAction {
  type: typeof CUSTOMER_LIST_LOADING;
}

export interface ICustomerListSuccessAction {
  type: typeof CUSTOMER_LIST_SUCCESS;
  payload: Customer[];
}

export interface ICustomerListErrorAction extends IErrorAction {
  type: typeof CUSTOMER_LIST_ERROR;
}

export interface ICustomerListResetAction {
  type: typeof CUSTOMER_LIST_RESET;
}

export type CustomerListActionTypes =
  | ICustomerListLoadingAction
  | ICustomerListSuccessAction
  | ICustomerListErrorAction
  | ICustomerListResetAction;
