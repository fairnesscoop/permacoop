import {CoreUpsertState, CoreUpsertActionTypes} from '../types/upsert';
import {
  CORE_UPSERT_SUCCESS,
  CORE_UPSERT_LOADING,
  CORE_UPSERT_ERROR,
  CORE_UPSERT_RESET
} from '../constants/upsert';

const initialState: CoreUpsertState = {
  loading: false,
  errors: [],
  payload: null
};

export const upsertReducers = (
  state = initialState,
  action: CoreUpsertActionTypes
): CoreUpsertState => {
  switch (action.type) {
    case CORE_UPSERT_SUCCESS:
      return {
        ...state,
        payload: action.payload
      };

    case CORE_UPSERT_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case CORE_UPSERT_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case CORE_UPSERT_RESET:
      return initialState;

    default:
      return state;
  }
};
