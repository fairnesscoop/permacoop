import {Dispatch} from 'redux';
import {ActivityFormData} from '../components/form/ActivityForm';
import {loading, errors, success} from '../../core/actions/upsert';
import {saveActivity} from '../repositories/activity';

export const upsertActivity = (
  date: string,
  payload: ActivityFormData
) => async (dispatch: Dispatch) => {
  dispatch(loading(true));

  const data = {
    ...payload,
    date: new Date(date),
    summary: payload.summary ?? ''
  };

  try {
    dispatch(success(await saveActivity(data)));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(false));
  }
};
