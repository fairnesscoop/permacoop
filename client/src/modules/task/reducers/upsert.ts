import {TaskUpsertState, TaskUpsertActionTypes} from '../types/upsert';
import {
  TASK_UPSERT_SUCCESS,
  TASK_UPSERT_LOADING,
  TASK_UPSERT_ERROR,
  TASK_UPSERT_RESET
} from '../constants/upsert';

const initialState: TaskUpsertState = {
  loading: false,
  errors: [],
  payload: null
};

export const upsertReducers = (
  state = initialState,
  action: TaskUpsertActionTypes
): TaskUpsertState => {
  switch (action.type) {
    case TASK_UPSERT_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };

    case TASK_UPSERT_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case TASK_UPSERT_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case TASK_UPSERT_RESET:
      return initialState;

    default:
      return state;
  }
};
