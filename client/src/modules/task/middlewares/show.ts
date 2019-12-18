import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/show';
import {findOneById} from '../repositories/task';

export const getTask = (id: string) => async (dispatch: Dispatch) => {
  dispatch(loading(true));

  try {
    dispatch(success(await findOneById(id)));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(true));
  }
};
