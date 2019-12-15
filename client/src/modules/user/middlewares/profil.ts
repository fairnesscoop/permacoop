import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/show';
import {errorNormalizer} from '../../../normalizer/errors';
import {findCurrentUser} from '../repositories/user';

export const getCurrentUser = () => async (dispatch: Dispatch) => {
  dispatch(loading(true));

  try {
    dispatch(success(await findCurrentUser()));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(true));
  }
};
