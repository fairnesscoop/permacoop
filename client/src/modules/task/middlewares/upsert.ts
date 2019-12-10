import {Dispatch} from 'redux';
import {AppState} from '../../../store/reducers';
import {loading, errors, success} from '../actions/upsert';
import errorFormater from '../../../utils/errorFormater';
import {Task} from '../models/Task';

export const upsertTask = (payload: Task) => async (
  dispatch: Dispatch,
  state: AppState,
  axios: any
): Promise<void> => {
  dispatch(loading(true));

  try {
    let response;

    if (payload.id) {
      response = await axios.put(`tasks/${payload.id}`, payload);
    } else {
      response = await axios.post('tasks', payload);
    }

    const {id, name} = response.data;
    dispatch(success(new Task(id, name)));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
