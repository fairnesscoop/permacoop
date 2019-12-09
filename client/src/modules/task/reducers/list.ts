import {TaskListState, TaskListActionTypes} from '../types/list';
import {
  TASK_LIST_SUCCESS,
  TASK_LIST_LOADING,
  TASK_LIST_ERROR,
  TASK_LIST_RESET
} from '../constants/list';

const initialState: TaskListState = {
  loading: false,
  errors: [],
  payload: []
};

export const listReducers = (
  state = initialState,
  action: TaskListActionTypes
): TaskListState => {
  switch (action.type) {
    case TASK_LIST_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };

    case TASK_LIST_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case TASK_LIST_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case TASK_LIST_RESET:
      return initialState;

    default:
      return state;
  }
};
