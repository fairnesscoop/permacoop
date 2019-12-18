import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/show';
import {findCurrentUser} from '../repositories/user';

export const getCurrentUser = () => async (dispatch: Dispatch) => {
  dispatch(loading(true));

  try {
    dispatch(success(await findCurrentUser()));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(true));
  }
};
