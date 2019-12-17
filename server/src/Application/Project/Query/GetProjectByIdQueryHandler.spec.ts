import {mock, instance, when, verify} from 'ts-mockito';
import {ProjectRepository} from 'src/Infrastructure/Project/Repository/ProjectRepository';
import {Project} from 'src/Domain/Project/Project.entity';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {GetProjectByIdQueryHandler} from './GetProjectByIdQueryHandler';
import {GetProjectByIdQuery} from './GetProjectByIdQuery';
import {ProjectNotFoundException} from 'src/Domain/Project/Exception/ProjectNotFoundException';

describe('GetProjectByIdQueryHandler', () => {
  const query = new GetProjectByIdQuery('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');

  it('testGetProject', async () => {
    const projectRepository = mock(ProjectRepository);
    const queryHandler = new GetProjectByIdQueryHandler(
      instance(projectRepository)
    );

    const project = mock(Project);

    when(project.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(project.getName()).thenReturn('Project');
    when(
      projectRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(project));

    expect(await queryHandler.execute(query)).toMatchObject(
      new ProjectView('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2', 'Project')
    );

    verify(
      projectRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
    verify(project.getId()).once();
    verify(project.getName()).once();
  });

  it('testGetProjectNotFound', async () => {
    const projectRepository = mock(ProjectRepository);
    const queryHandler = new GetProjectByIdQueryHandler(
      instance(projectRepository)
    );
    when(
      projectRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e).toBeInstanceOf(ProjectNotFoundException);
      expect(e.message).toBe('project.errors.not_found');
      verify(
        projectRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
