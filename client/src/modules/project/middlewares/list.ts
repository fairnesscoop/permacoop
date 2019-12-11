import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/list';
import {errorNormalizer} from '../../../normalizer/errors';
import {ProjectRepository} from '../repositories/ProjectRepository';

export const listProjects = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await ProjectRepository.findProjects()));
  } catch (e) {
    dispatch(errors(errorNormalizer(e)));
  } finally {
    dispatch(loading(false));
  }
};
