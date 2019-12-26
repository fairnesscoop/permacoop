import {ActivityListState, ActivityListActionTypes} from '../types/list';
import {
  ACTIVITY_LIST_SUCCESS,
  ACTIVITY_LIST_LOADING,
  ACTIVITY_LIST_ERROR,
  ACTIVITY_LIST_RESET
} from '../constants/list';

const initialState: ActivityListState = {
  loading: false,
  errors: [],
  payload: null
};

export const listReducers = (
  state = initialState,
  action: ActivityListActionTypes
): ActivityListState => {
  switch (action.type) {
    case ACTIVITY_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };

    case ACTIVITY_LIST_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case ACTIVITY_LIST_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case ACTIVITY_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
