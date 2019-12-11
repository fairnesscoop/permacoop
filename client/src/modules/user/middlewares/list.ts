import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/list';
import {errorNormalizer} from '../../../normalizer/errors';
import {UserRepository} from '../repositories/UserRepository';

export const listUsers = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await UserRepository.findUsers()));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
