import { mock, instance, when, verify } from 'ts-mockito';
import { ProjectRepository } from 'src/Infrastructure/Project/Repository/ProjectRepository';
import { InvoiceUnits, Project } from 'src/Domain/Project/Project.entity';
import { IsProjectAlreadyExist } from 'src/Domain/Project/Specification/IsProjectAlreadyExist';
import { Customer } from 'src/Domain/Customer/Customer.entity';

describe('IsProjectAlreadyExist', () => {
  let projectRepository: ProjectRepository;
  let isProjectAlreadyExist: IsProjectAlreadyExist;

  beforeEach(() => {
    projectRepository = mock(ProjectRepository);
    isProjectAlreadyExist = new IsProjectAlreadyExist(
      instance(projectRepository)
    );
  });

  it('testProjectAlreadyExist', async () => {
    when(projectRepository.findOneByName('Encom')).thenResolve(
      new Project('Encom', InvoiceUnits.DAY, true, new Customer('Radio France'))
    );
    expect(await isProjectAlreadyExist.isSatisfiedBy('Encom')).toBe(true);
    verify(projectRepository.findOneByName('Encom')).once();
  });

  it('testProjectDontExist', async () => {
    when(projectRepository.findOneByName('Project')).thenResolve(null);
    expect(await isProjectAlreadyExist.isSatisfiedBy('Project')).toBe(false);
    verify(projectRepository.findOneByName('Project')).once();
  });
});
