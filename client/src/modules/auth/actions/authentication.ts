import {
  AUTH_AUTHENTICATION_LOADING,
  AUTH_AUTHENTICATION_SUCCESS,
  AUTH_AUTHENTICATION_ERROR,
  AUTH_AUTHENTICATION_RESET,
  AUTH_AUTHENTICATION_LOGOUT
} from '../constants/authentication';
import {
  IAuthenticationLoadingAction,
  IAuthenticationSuccessAction,
  IAuthenticationErrorAction,
  IAuthenticationResetAction,
  IAuthenticationLogoutAction
} from '../types/authentication';
import {LoggedUser} from '../models/LoggedUser';
import {errorNormalizer} from '../../../normalizer/errors';

export const loading = (loading: boolean): IAuthenticationLoadingAction => ({
  type: AUTH_AUTHENTICATION_LOADING,
  loading
});

export const success = (payload: LoggedUser): IAuthenticationSuccessAction => ({
  type: AUTH_AUTHENTICATION_SUCCESS,
  payload
});

export const errors = (e: any): IAuthenticationErrorAction => ({
  type: AUTH_AUTHENTICATION_ERROR,
  errors: errorNormalizer(e)
});

export const reset = (): IAuthenticationResetAction => ({
  type: AUTH_AUTHENTICATION_RESET
});

export const logout = (): IAuthenticationLogoutAction => ({
  type: AUTH_AUTHENTICATION_LOGOUT
});
