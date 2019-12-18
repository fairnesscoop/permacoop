import {Dispatch} from 'redux';
import {loading, errors, success} from '../actions/authentication';
import {login} from '../repositories/login';
import {AuthenticationFormData} from '../components/form/AuthenticationForm';

export const authenticate = (payload: AuthenticationFormData) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await login(payload)));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(false));
  }
};
