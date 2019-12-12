import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/upsert';
import {errorNormalizer} from '../../../normalizer/errors';
import {saveUser} from '../repositories/user';
import {UserFormData} from '../components/form/UserForm';

export const upsertUser = (payload: UserFormData, id?: string) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await saveUser(payload, id)));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
