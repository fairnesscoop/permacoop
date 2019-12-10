import {ProjectListState, ProjectListActionTypes} from '../types/list';
import {
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_LOADING,
  PROJECT_LIST_ERROR,
  PROJECT_LIST_RESET
} from '../constants/list';

const initialState: ProjectListState = {
  loading: false,
  errors: [],
  payload: []
};

export const listReducers = (
  state = initialState,
  action: ProjectListActionTypes
): ProjectListState => {
  switch (action.type) {
    case PROJECT_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };

    case PROJECT_LIST_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case PROJECT_LIST_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case PROJECT_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
