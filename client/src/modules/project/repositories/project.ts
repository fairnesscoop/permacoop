import {client as axios} from '../../../utils/axios';
import {IProject} from '../models/IProject';
import {ProjectFormData} from '../components/form/ProjectForm';

export const findProjects = async (): Promise<IProject[]> => {
  const {data} = await axios.get('projects');

  return data;
};

export const findOneById = async (id: string): Promise<IProject> => {
  const {data} = await axios.get(`projects/${id}`);

  return data;
};

export const saveProject = async (
  payload: ProjectFormData
): Promise<IProject> => {
  let response;

  if (payload.id) {
    response = await axios.put(`projects/${payload.id}`, payload);
  } else {
    response = await axios.post('projects', payload);
  }

  return response.data;
};
