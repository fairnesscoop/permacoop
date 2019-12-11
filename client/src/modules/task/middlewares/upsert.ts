import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/upsert';
import {errorNormalizer} from '../../../normalizer/errors';
import {Task} from '../models/Task';
import {TaskRepository} from '../repositories/TaskRepository';

export const upsertTask = (payload: Task) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await TaskRepository.save(payload)));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
