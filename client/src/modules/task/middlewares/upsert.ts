import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/upsert';
import {saveTask} from '../repositories/task';
import {TaskFormData} from '../components/form/TaskForm';

export const upsertTask = (payload: TaskFormData) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await saveTask(payload)));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(false));
  }
};
