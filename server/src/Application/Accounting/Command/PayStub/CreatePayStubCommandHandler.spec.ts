import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {PayStubRepository} from 'src/Infrastructure/Accounting/Repository/PayStubRepository';
import {CreatePayStubCommandHandler} from './CreatePayStubCommandHandler';
import {CreatePayStubCommand} from './CreatePayStubCommand';
import {User} from 'src/Domain/User/User.entity';
import {PayStub} from 'src/Domain/Accounting/PayStub.entity';
import {UserRepository} from 'src/Infrastructure/User/Repository/UserRepository';
import {FileRepository} from 'src/Infrastructure/File/Repository/FileRepository';
import {File} from 'src/Domain/File/File.entity';
import {UserNotFoundException} from 'src/Domain/User/Exception/UserNotFoundException';

describe('CreatePayStubCommandHandler', () => {
  let payStubRepository: PayStubRepository;
  let userRepository: UserRepository;
  let fileRepository: FileRepository;
  let handler: CreatePayStubCommandHandler;

  const user = mock(User);
  const file = mock(File);
  const payStub = mock(PayStub);
  const command = new CreatePayStubCommand(
    '2020-04-29',
    'a491ccc9-df7c-4fc6-8e90-db816208f689',
    '3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c'
  );

  beforeEach(() => {
    payStubRepository = mock(PayStubRepository);
    userRepository = mock(UserRepository);
    fileRepository = mock(FileRepository);

    handler = new CreatePayStubCommandHandler(
      instance(payStubRepository),
      instance(userRepository),
      instance(fileRepository)
    );
  });

  it('testPayStubSuccessfullyCreated', async () => {
    when(
      userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(user));
    when(
      fileRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(file));
    when(payStub.getId()).thenReturn('7c35d37c-b0e3-480d-bf6c-3dc1e094886f');
    when(
      payStubRepository.save(
        deepEqual(new PayStub('2020-04-29', instance(file), instance(user)))
      )
    ).thenResolve(instance(payStub));

    expect(await handler.execute(command)).toBe(
      '7c35d37c-b0e3-480d-bf6c-3dc1e094886f'
    );

    verify(
      userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).once();
    verify(
      fileRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).once();
    verify(
      payStubRepository.save(
        deepEqual(new PayStub('2020-04-29', instance(file), instance(user)))
      )
    ).once();
  });

  it('testUserNotFound', async () => {
    when(
      userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('user.errors.not_found');
      verify(
        userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(fileRepository.findOneById(anything())).never();
      verify(payStubRepository.save(anything())).never();
    }
  });

  it('testFileNotFound', async () => {
    when(
      userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(user));
    when(
      fileRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      verify(
        userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(
        fileRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
      ).once();
      verify(payStubRepository.save(anything())).never();
    }
  });
});
