import { mock, instance, when, verify, anything } from 'ts-mockito';
import { CustomerRepository } from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import { DailyRateRepository } from 'src/Infrastructure/Accounting/Repository/DailyRateRepository';
import { UpdateDailyRateCommandHandler } from './UpdateDailyRateCommandHandler';
import { UpdateDailyRateCommand } from './UpdateDailyRateCommand';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { TaskRepository } from 'src/Infrastructure/Task/Repository/TaskRepository';
import { UserRepository } from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import { IsDailyRateAlreadyExist } from 'src/Domain/Accounting/Specification/IsDailyRateAlreadyExist';
import { UserNotFoundException } from 'src/Domain/HumanResource/User/Exception/UserNotFoundException';
import { CustomerNotFoundException } from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import { TaskNotFoundException } from 'src/Domain/Task/Exception/TaskNotFoundException';
import { Task } from 'src/Domain/Task/Task.entity';
import { DailyRateAlreadyExistException } from 'src/Domain/Accounting/Exception/DailyRateAlreadyExistException';
import { DailyRate } from 'src/Domain/Accounting/DailyRate.entity';
import { DailyRateNotFoundException } from 'src/Domain/Accounting/Exception/DailyRateNotFoundException';

describe('UpdateDailyRateCommandHandler', () => {
  let dailyRateRepository: DailyRateRepository;
  let customerRepository: CustomerRepository;
  let taskRepository: TaskRepository;
  let userRepository: UserRepository;
  let isDailyRateAlreadyExist: IsDailyRateAlreadyExist;

  let handler: UpdateDailyRateCommandHandler;

  const user = mock(User);
  const task = mock(Task);
  const customer = mock(Customer);
  const dailyRate = mock(DailyRate);

  const command = new UpdateDailyRateCommand(
    '8a9df044-94a7-4e6c-abd1-ecdd69d788d5',
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

    handler = new UpdateDailyRateCommandHandler(
      instance(taskRepository),
      instance(userRepository),
      instance(customerRepository),
      instance(dailyRateRepository),
      instance(isDailyRateAlreadyExist)
    );
  });

  it('testDailyRateNotFound', async () => {
    when(
      dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(null);

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(DailyRateNotFoundException);
      expect(e.message).toBe('accounting.daily_rates.errors.not_found');
      verify(
        dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
      verify(userRepository.findOneById(anything())).never();
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
      verify(
        dailyRate.update(anything(), anything(), anything(), anything())
      ).never();
    }
  });

  it('testUserNotFound', async () => {
    when(
      dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(dailyRate));
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(null);
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(customer));
    when(
      taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(task));
    when(dailyRate.getUser()).thenReturn(instance(user));
    when(dailyRate.getTask()).thenReturn(instance(task));
    when(dailyRate.getCustomer()).thenReturn(instance(customer));

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(UserNotFoundException);
      expect(e.message).toBe('human_resources.users.errors.not_found');
      verify(
        dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
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
      verify(
        dailyRate.update(anything(), anything(), anything(), anything())
      ).never();
      verify(dailyRateRepository.save(anything())).never();
    }
  });

  it('testCustomerNotFound', async () => {
    when(
      dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(dailyRate));
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(instance(user));
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(null);
    when(
      taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(task));
    when(dailyRate.getUser()).thenReturn(instance(user));
    when(dailyRate.getTask()).thenReturn(instance(task));
    when(dailyRate.getCustomer()).thenReturn(instance(customer));

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(CustomerNotFoundException);
      expect(e.message).toBe('crm.customers.errors.not_found');
      verify(
        dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
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
      verify(
        dailyRate.update(anything(), anything(), anything(), anything())
      ).never();
      verify(dailyRateRepository.save(anything())).never();
    }
  });

  it('testTaskNotFound', async () => {
    when(
      dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(dailyRate));
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(instance(user));
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(customer));
    when(
      taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(null);
    when(dailyRate.getUser()).thenReturn(instance(user));
    when(dailyRate.getTask()).thenReturn(instance(task));
    when(dailyRate.getCustomer()).thenReturn(instance(customer));

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(TaskNotFoundException);
      expect(e.message).toBe('accounting.tasks.errors.not_found');
      verify(
        dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
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
      verify(
        dailyRate.update(anything(), anything(), anything(), anything())
      ).never();
      verify(dailyRateRepository.save(anything())).never();
    }
  });

  it('testDailyRateAlreadyExist', async () => {
    when(
      dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(dailyRate));
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(instance(user));
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(customer));
    when(
      taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(task));
    when(dailyRate.getUser()).thenReturn(instance(user));
    when(dailyRate.getTask()).thenReturn(instance(task));
    when(dailyRate.getCustomer()).thenReturn(instance(customer));
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
        dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
      ).once();
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
        dailyRate.update(anything(), anything(), anything(), anything())
      ).never();
      verify(dailyRateRepository.save(anything())).never();
    }
  });

  it('testSuccessfullyUpdatedWithSameCustomerTaskAndUser', async () => {
    when(
      dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(dailyRate));
    when(dailyRate.getId()).thenReturn('8a9df044-94a7-4e6c-abd1-ecdd69d788d5');
    when(user.getId()).thenReturn('d36bbd74-f753-4d8f-940c-d4a6b4fd0957');
    when(dailyRate.getUser()).thenReturn(instance(user));

    when(task.getId()).thenReturn('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c');
    when(dailyRate.getTask()).thenReturn(instance(task));

    when(customer.getId()).thenReturn('a491ccc9-df7c-4fc6-8e90-db816208f689');
    when(dailyRate.getCustomer()).thenReturn(instance(customer));

    expect(await handler.execute(command)).toBe(
      '8a9df044-94a7-4e6c-abd1-ecdd69d788d5'
    );

    verify(userRepository.findOneById(anything())).never();
    verify(customerRepository.findOneById(anything())).never();
    verify(taskRepository.findOneById(anything())).never();
    verify(
      isDailyRateAlreadyExist.isSatisfiedBy(anything(), anything(), anything())
    ).never();
    verify(
      dailyRate.update(
        10000,
        instance(user),
        instance(customer),
        instance(task)
      )
    ).calledBefore(dailyRateRepository.save(instance(dailyRate)));
    verify(dailyRateRepository.save(instance(dailyRate))).once();
  });

  it('testSuccessfullyUpdatedWithDifferentCustomerUserAndTask', async () => {
    const user2 = mock(User);
    when(user2.getId()).thenReturn('86aab6c8-26c6-42f5-a6dc-5f6873169fd7');

    const task2 = mock(Task);
    when(task2.getId()).thenReturn('8d5e6b97-a906-4ee7-9765-7fdf5c628bfc');

    const customer2 = mock(Customer);
    when(customer2.getId()).thenReturn('1149590f-e76c-4548-9113-6e84aee5dddc');

    when(
      dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).thenResolve(instance(dailyRate));
    when(dailyRate.getId()).thenReturn('8a9df044-94a7-4e6c-abd1-ecdd69d788d5');
    when(
      userRepository.findOneById('d36bbd74-f753-4d8f-940c-d4a6b4fd0957')
    ).thenResolve(instance(user));
    when(
      customerRepository.findOneById('a491ccc9-df7c-4fc6-8e90-db816208f689')
    ).thenResolve(instance(customer));
    when(
      taskRepository.findOneById('3d0a282f-3b3e-4ef3-948f-5ab3cb77a04c')
    ).thenResolve(instance(task));
    when(dailyRate.getUser()).thenReturn(instance(user2));
    when(dailyRate.getTask()).thenReturn(instance(task2));
    when(dailyRate.getCustomer()).thenReturn(instance(customer2));
    when(
      isDailyRateAlreadyExist.isSatisfiedBy(
        instance(user),
        instance(task),
        instance(customer)
      )
    ).thenResolve(false);

    expect(await handler.execute(command)).toBe(
      '8a9df044-94a7-4e6c-abd1-ecdd69d788d5'
    );

    verify(
      dailyRateRepository.findOneById('8a9df044-94a7-4e6c-abd1-ecdd69d788d5')
    ).once();
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
      dailyRate.update(
        10000,
        instance(user),
        instance(customer),
        instance(task)
      )
    ).calledBefore(dailyRateRepository.save(instance(dailyRate)));
    verify(dailyRateRepository.save(instance(dailyRate))).once();
  });
});
