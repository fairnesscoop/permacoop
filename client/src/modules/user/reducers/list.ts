import {UserListState, UserListActionTypes} from '../types/list';
import {
  USER_LIST_SUCCESS,
  USER_LIST_LOADING,
  USER_LIST_ERROR,
  USER_LIST_RESET
} from '../constants/list';

const initialState: UserListState = {
  loading: false,
  errors: [],
  payload: []
};

export const listReducers = (
  state = initialState,
  action: UserListActionTypes
): UserListState => {
  switch (action.type) {
    case USER_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };

    case USER_LIST_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case USER_LIST_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case USER_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
