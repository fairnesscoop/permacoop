import {Dispatch} from 'redux';
import {loading, errors, success} from '../../core/actions/upsert';
import {saveProject} from '../repositories/project';
import {ProjectFormData} from '../components/form/ProjectForm';

export const upsertProject = (payload: ProjectFormData) => async (
  dispatch: Dispatch
): Promise<void> => {
  dispatch(loading(true));

  try {
    dispatch(success(await saveProject(payload)));
  } catch (e) {
    dispatch(errors(e));
  } finally {
    dispatch(loading(false));
  }
};
