import {CoreListState, CoreListActionTypes} from '../types/list';
import {
  CORE_LIST_SUCCESS,
  CORE_LIST_LOADING,
  CORE_LIST_ERROR,
  CORE_LIST_RESET
} from '../constants/list';

const initialState: CoreListState = {
  loading: false,
  errors: [],
  payload: []
};

export const listReducers = (
  state = initialState,
  action: CoreListActionTypes
): CoreListState => {
  switch (action.type) {
    case CORE_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };

    case CORE_LIST_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case CORE_LIST_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case CORE_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
