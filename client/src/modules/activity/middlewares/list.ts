import {Dispatch} from 'redux';
import {loading, errors, success} from '../actions/list';
import {findActivities} from '../repositories/activity';

export const listActivities = (userId: string, date: Date) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await findActivities(userId, date)));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(false));
  }
};
