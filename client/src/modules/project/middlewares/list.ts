import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/list';
import {errorNormalizer} from '../../../normalizer/errors';
import {findProjects} from '../repositories/project';

export const listProjects = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await findProjects()));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
