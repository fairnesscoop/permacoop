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
import {CORE_UPSERT_SUCCESS} from '../../core/constants/upsert';
import {User} from '../../user/models/User';
import {LoggedUser} from '../models/LoggedUser';

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

    case CORE_UPSERT_SUCCESS:
      const user = action.payload;
      if (!(user instanceof User)) {
        return state;
      }

      return {
        ...state,
        user: new LoggedUser(user.firstName, user.lastName, user.email)
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
