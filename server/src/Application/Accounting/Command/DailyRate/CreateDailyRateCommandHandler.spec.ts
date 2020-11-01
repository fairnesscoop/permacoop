import {mock, instance, when, verify, anything, deepEqual} from 'ts-mockito';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {DailyRateRepository} from 'src/Infrastructure/Accounting/Repository/DailyRateRepository';
import {CreateDailyRateCommandHandler} from './CreateDailyRateCommandHandler';
import {CreateDailyRateCommand} from './CreateDailyRateCommand';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {TaskRepository} from 'src/Infrastructure/Task/Repository/TaskRepository';
import {UserRepository} from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import {IsDailyRateAlreadyExist} from 'src/Domain/Accounting/Specification/IsDailyRateAlreadyExist';
import {UserNotFoundException} from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';
import {Task} from 'src/Domain/Task/Task.entity';
import {DailyRateAlreadyExistException} from 'src/Domain/Accounting/Exception/DailyRateAlreadyExistException';
import {DailyRate} from 'src/Domain/Accounting/DailyRate.entity';

describe('CreateDailyRateCommandHandler', () => {
  let dailyRateRepository: DailyRateRepository;
  let customerRepository: CustomerRepository;
  let taskRepository: TaskRepository;
  let userRepository: UserRepository;
  let isDailyRateAlreadyExist: IsDailyRateAlreadyExist;

  let handler: CreateDailyRateCommandHandler;

  const user = mock(User);
  const task = mock(Task);
  const customer = mock(Customer);

  const command = new CreateDailyRateCommand(
    100,
    'd36bbd74-f753-4d8f-940c-d4a6b4fd0957',
    'a491ccc9-df7c-4fc6-8e90-db816208f689',
    '3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c'
  );

  beforeEach(() => {
    dailyRateRepository = mock(DailyRateRepository);
    customerRepository = mock(CustomerRepository);
    taskRepository = mock(TaskRepository);
    userRepository = mock(UserRepository);
    isDailyRateAlreadyExist = mock(IsDailyRateAlreadyExist);

    handler = new CreateDailyRateCommandHandler(
      instance(taskRepository),
      instance(userRepository),
      instance(customerRepository),
      instance(dailyRateRepository),
      instance(isDailyRateAlreadyExist)
    );
  });

  it('testUserNotFound', async () => {
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('human_resources.users.errors.not_found');
      verify(
        userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
      ).once();
      verify(customerRepository.findOneById(anything())).never();
      verify(taskRepository.findOneById(anything())).never();
      verify(
        isDailyRateAlreadyExist.isSatisfiedBy(
          anything(),
          anything(),
          anything()
        )
      ).never();
      verify(dailyRateRepository.save(anything())).never();
    }
  });

  it('testCustomerNotFound', async () => {
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(instance(user));
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerNotFoundException);
      expect(e.message).toBe('crm.customers.errors.not_found');
      verify(
        userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
      ).once();
      verify(
        customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(taskRepository.findOneById(anything())).never();
      verify(
        isDailyRateAlreadyExist.isSatisfiedBy(
          anything(),
          anything(),
          anything()
        )
      ).never();
      verify(dailyRateRepository.save(anything())).never();
    }
  });

  it('testTaskNotFound', async () => {
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(instance(user));
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(customer));
    when(
      taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(TaskNotFoundException);
      expect(e.message).toBe('accounting.tasks.errors.not_found');
      verify(
        userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
      ).once();
      verify(
        customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(
        taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
      ).once();
      verify(
        isDailyRateAlreadyExist.isSatisfiedBy(
          anything(),
          anything(),
          anything()
        )
      ).never();
      verify(dailyRateRepository.save(anything())).never();
    }
  });

  it('testDailyRateAlreadyExist', async () => {
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(instance(user));
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(customer));
    when(
      taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(task));
    when(
      isDailyRateAlreadyExist.isSatisfiedBy(
        instance(user),
        instance(task),
        instance(customer)
      )
    ).thenResolve(true);
    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(DailyRateAlreadyExistException);
      expect(e.message).toBe('accounting.daily_rates.errors.already_exist');
      verify(
        userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
      ).once();
      verify(
        customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
      ).once();
      verify(
        taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
      ).once();
      verify(
        isDailyRateAlreadyExist.isSatisfiedBy(
          instance(user),
          instance(task),
          instance(customer)
        )
      ).once();
      verify(dailyRateRepository.save(anything())).never();
    }
  });

  it('testDailyRateSuccessfullyCreated', async () => {
    const savedDailyRate = mock(DailyRate);

    when(savedDailyRate.getId()).thenReturn(
      '62016719-cb62-4805-bfac-9540508ab942'
    );
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(instance(user));
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(customer));
    when(
      taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(task));
    when(
      isDailyRateAlreadyExist.isSatisfiedBy(
        instance(user),
        instance(task),
        instance(customer)
      )
    ).thenResolve(false);
    when(
      dailyRateRepository.save(
        deepEqual(
          new DailyRate(
            10000,
            instance(user),
            instance(customer),
            instance(task)
          )
        )
      )
    ).thenResolve(instance(savedDailyRate));

    expect(await handler.execute(command)).toBe(
      '62016719-cb62-4805-bfac-9540508ab942'
    );

    verify(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).once();
    verify(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).once();
    verify(
      taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).once();
    verify(
      isDailyRateAlreadyExist.isSatisfiedBy(
        instance(user),
        instance(task),
        instance(customer)
      )
    ).once();
    verify(
      dailyRateRepository.save(
        deepEqual(
          new DailyRate(
            10000,
            instance(user),
            instance(customer),
            instance(task)
          )
        )
      )
    ).once();
  });
});
