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

export const saveProject = async (
  payload: ProjectFormData,
  id?: string
): Promise<Project> => {
  let response;

  if (id) {
    response = await axios.put(`projects/${id}`, payload);
  } else {
    response = await axios.post('projects', payload);
  }

  return ProjectFactory.create(response.data);
};
