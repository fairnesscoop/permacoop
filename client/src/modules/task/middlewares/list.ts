import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/list';
import {findTasks} from '../repositories/task';

export const listTasks = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await findTasks()));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(false));
  }
};
