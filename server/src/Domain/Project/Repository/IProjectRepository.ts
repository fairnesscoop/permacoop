import {Project} from '../Project.entity';

export interface IProjectRepository {
  save(project: Project): Promise<Project>;
  findOneByName(name: string): Promise<Project | undefined>;
  findOneById(id: string): Promise<Project | undefined>;
  findProjects(): Promise<Project[]>;
}
