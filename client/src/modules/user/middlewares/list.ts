import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/list';
import {findUsers} from '../repositories/user';

export const listUsers = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await findUsers()));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(false));
  }
};
