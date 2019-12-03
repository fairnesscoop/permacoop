import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IProjectRepository} from 'src/Domain/Project/Repository/IProjectRepository';
import {Project} from 'src/Domain/Project/Project.entity';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>
  ) {}

  public save(project: Project): Promise<Project> {
    return this.repository.save(project);
  }

  public findOneByName(name: string): Promise<Project | undefined> {
    return this.repository
      .createQueryBuilder('project')
      .where('LOWER(project.name) = LOWER(:name)', {name})
      .getOne();
  }
}
