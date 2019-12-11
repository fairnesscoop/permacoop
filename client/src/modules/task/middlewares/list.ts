import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/list';
import {errorNormalizer} from '../../../normalizer/errors';
import {TaskRepository} from '../repositories/TaskRepository';

export const listTasks = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await TaskRepository.findTasks()));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
