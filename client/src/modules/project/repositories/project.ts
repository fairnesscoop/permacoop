import {client as axios} from '../../../utils/axios';
import {Project} from '../models/Project';
import {ProjectFactory} from '../factory/ProjectFactory';
import {ProjectFormData} from '../components/form/ProjectForm';

export const findProjects = async (): Promise<Project[]> => {
  const response = await axios.get('projects');
  const projects: Project[] = [];

  for (const project of response.data) {
    projects.push(ProjectFactory.create(project));
  }

  return projects;
};

export const findOneById = async (id: string): Promise<Project> => {
  const {data} = await axios.get(`projects/${id}`);

  return ProjectFactory.create(data);
};

export const saveProject = async (
  payload: ProjectFormData
): Promise<Project> => {
  let response;

  if (payload.id) {
    response = await axios.put(`projects/${payload.id}`, payload);
  } else {
    response = await axios.post('projects', payload);
  }

  return ProjectFactory.create(response.data);
};
