import {mock, instance, when, verify, deepEqual, anything} from 'ts-mockito';
import {PaySlipRepository} from 'src/Infrastructure/HumanResource/PaySlip/Repository/PaySlipRepository';
import {CreatePaySlipCommandHandler} from './CreatePaySlipCommandHandler';
import {CreatePaySlipCommand} from './CreatePaySlipCommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {PaySlip} from 'src/Domain/HumanResource/PaySlip/PaySlip.entity';
import {UserRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import {FileRepository} from 'src/Infrastructure/File/Repository/FileRepository';
import {File} from 'src/Domain/File/File.entity';
import {UserNotFoundException} from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import {IsPaySlipAlreadyExist} from 'src/Domain/HumanResource/PaySlip/Specification/IsPaySlipAlreadyExist';
import {PaySlipAlreadyExistException} from 'src/Domain/HumanResource/PaySlip/Exception/PaySlipAlreadyExistException';

describe('CreatePaySlipCommandHandler', () => {
  let paySlipRepository: PaySlipRepository;
  let userRepository: UserRepository;
  let fileRepository: FileRepository;
  let isPaySlipAlreadyExist: IsPaySlipAlreadyExist;
  let handler: CreatePaySlipCommandHandler;

  const user = mock(User);
  const file = mock(File);
  const paySlip = mock(PaySlip);
  const command = new CreatePaySlipCommand(
    '2020-04-29',
    'a491ccc9-df7c-4fc6-8e90-db816208f689',
    '3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c'
  );

  beforeEach(() => {
    paySlipRepository = mock(PaySlipRepository);
    userRepository = mock(UserRepository);
    fileRepository = mock(FileRepository);
    isPaySlipAlreadyExist = mock(IsPaySlipAlreadyExist);

    handler = new CreatePaySlipCommandHandler(
      instance(paySlipRepository),
      instance(userRepository),
      instance(fileRepository),
      instance(isPaySlipAlreadyExist)
    );
  });

  it('testPaySlipSuccessfullyCreated', async () => {
    when(
      userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(user));
    when(
      fileRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(file));
    when(
      isPaySlipAlreadyExist.isSatisfiedBy(
        instance(user),
        deepEqual(new Date('2020-04-29'))
      )
    ).thenResolve(false);
    when(paySlip.getId()).thenReturn('7c35d37c-b0e3-480d-bf6c-3dc1e094886f');
    when(
      paySlipRepository.save(
        deepEqual(new PaySlip('2020-04-29', instance(file), instance(user)))
      )
    ).thenResolve(instance(paySlip));

    expect(await handler.execute(command)).toBe(
      '7c35d37c-b0e3-480d-bf6c-3dc1e094886f'
    );

    verify(
      userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).once();
    verify(
      fileRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).once();
    verify(fileRepository.remove(anything())).never();
    verify(
      isPaySlipAlreadyExist.isSatisfiedBy(
        instance(user),
        deepEqual(new Date('2020-04-29'))
      )
    ).once();
    verify(
      paySlipRepository.save(
        deepEqual(new PaySlip('2020-04-29', instance(file), instance(user)))
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
      verify(paySlipRepository.save(anything())).never();
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
      verify(paySlipRepository.save(anything())).never();
    }
  });

  it('testPaySlipAlreadyExist', async () => {
    when(
      userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(user));
    when(
      fileRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(file));
    when(
      isPaySlipAlreadyExist.isSatisfiedBy(
        instance(user),
        deepEqual(new Date('2020-04-29'))
      )
    ).thenResolve(true);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(PaySlipAlreadyExistException);
      expect(e.message).toBe('human_resource.errors.pay_slip_already_exist');
      verify(
        userRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(
        fileRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
      ).once();
      verify(fileRepository.remove(instance(file))).once();
      verify(
        isPaySlipAlreadyExist.isSatisfiedBy(
          instance(user),
          deepEqual(new Date('2020-04-29'))
        )
      ).once();
      verify(paySlipRepository.save(anything())).never();
    }
  });
});
