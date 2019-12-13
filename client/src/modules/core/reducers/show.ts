import {CoreShowState, CoreShowActionTypes} from '../types/show';
import {
  CORE_SHOW_SUCCESS,
  CORE_SHOW_LOADING,
  CORE_SHOW_ERROR,
  CORE_SHOW_RESET
} from '../constants/show';

const initialState: CoreShowState<any> = {
  loading: false,
  errors: [],
  payload: null
};

export const showReducers = (
  state = initialState,
  action: CoreShowActionTypes
): CoreShowState<any> => {
  switch (action.type) {
    case CORE_SHOW_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };

    case CORE_SHOW_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case CORE_SHOW_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case CORE_SHOW_RESET:
      return initialState;

    default:
      return state;
  }
};
