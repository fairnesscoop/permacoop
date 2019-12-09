import {Dispatch} from 'redux';
import {AppState} from '../../../store/reducers';
import {loading, errors, success} from '../actions/list';
import errorFormater from '../../../utils/errorFormater';
import {Task} from '../models/Task';

export const listTasks = () => async (
  dispatch: Dispatch,
  state: AppState,
  axios: any
): Promise<void> => {
  dispatch(loading(true));

  try {
    const response = await axios.get('tasks');
    const tasks: Task[] = [];

    for (const {id, name} of response.data) {
      tasks.push(new Task(id, name));
    }

    dispatch(success(tasks));
  } catch (e) {
    dispatch(errors(errorFormater(e)));
  } finally {
    dispatch(loading(false));
  }
};
