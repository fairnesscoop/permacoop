import {
  AuthenticationState,
  AuthenticationActionTypes
} from '../types/authentication';
import {
  AUTH_AUTHENTICATION_LOADING,
  AUTH_AUTHENTICATION_SUCCESS,
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_RESET,
  AUTH_AUTHENTICATION_LOGOUT
} from '../constants/authentication';
import {TokenStorage} from '../../../utils/tokenStorage';

const initialState: AuthenticationState = {
  loading: false,
  user: null,
  errors: []
};

export const authenticationReducers = (
  state: AuthenticationState = initialState,
  action: AuthenticationActionTypes
): AuthenticationState => {
  switch (action.type) {
    case AUTH_AUTHENTICATION_LOADING:
      return {
        ...state,
        loading: action.loading
      };

    case AUTH_AUTHENTICATION_SUCCESS:
      return {
        ...state,
        user: action.payload
      };

    case AUTH_AUTHENTICATION_ERROR:
      return {
        ...state,
        errors: action.errors
      };

    case AUTH_AUTHENTICATION_RESET:
      return {
        ...state,
        errors: [],
        loading: false
      };

    case AUTH_AUTHENTICATION_LOGOUT:
      TokenStorage.remove();

      return initialState;

    default:
      return state;
  }
};
