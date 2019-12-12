import {Dispatch} from 'redux';
import {loading, errors, success} from '../actions/authentication';
import {errorNormalizer} from '../../../normalizer/errors';
import {IAuthenticationForm} from '../types/authentication';
import {login} from '../repositories/login';

export const authenticate = (payload: IAuthenticationForm) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await login(payload)));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
