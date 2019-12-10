import {
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_LOADING,
  CUSTOMER_LIST_ERROR,
  CUSTOMER_LIST_RESET
} from '../constants/list';
import {Error} from '../../common/models/Error';
import {
  ICustomerListSuccessAction,
  ICustomerListLoadingAction,
  ICustomerListErrorAction,
  ICustomerListResetAction
} from '../types/list';
import {Customer} from '../models/Customer';

export const success = (payload: Customer[]): ICustomerListSuccessAction => ({
  type: CUSTOMER_LIST_SUCCESS,
  payload
});

export const loading = (loading: boolean): ICustomerListLoadingAction => ({
  type: CUSTOMER_LIST_LOADING,
  loading
});

export const errors = (errors: Error[]): ICustomerListErrorAction => ({
  type: CUSTOMER_LIST_ERROR,
  errors
});

export const reset = (): ICustomerListResetAction => ({
  type: CUSTOMER_LIST_RESET
});
