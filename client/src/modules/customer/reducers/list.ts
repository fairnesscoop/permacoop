import {CustomerListState, CustomerListActionTypes} from '../types/list';
import {
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_LOADING,
  CUSTOMER_LIST_ERROR,
  CUSTOMER_LIST_RESET
} from '../constants/list';

const initialState: CustomerListState = {
  loading: false,
  errors: [],
  payload: []
};

export const listReducers = (
  state = initialState,
  action: CustomerListActionTypes
): CustomerListState => {
  switch (action.type) {
    case CUSTOMER_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };

    case CUSTOMER_LIST_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case CUSTOMER_LIST_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case CUSTOMER_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
