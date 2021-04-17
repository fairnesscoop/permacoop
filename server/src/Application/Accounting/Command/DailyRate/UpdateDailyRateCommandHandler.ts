import { CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateDailyRateCommand } from './UpdateDailyRateCommand';
import { ITaskRepository } from 'src/Domain/Task/Repository/ITaskRepository';
import { IDailyRateRepository } from 'src/Domain/Accounting/Repository/IDailyRateRepository';
import { IUserRepository } from 'src/Domain/HumanResource/User/Repository/IUserRepository';
import { ICustomerRepository } from 'src/Domain/Customer/Repository/ICustomerRepository';
import { AbstractUserCustomerAndTaskGetter } from './AbstractUserCustomerAndTaskGetter';
import { DailyRateNotFoundException } from 'src/Domain/Accounting/Exception/DailyRateNotFoundException';
import { IsDailyRateAlreadyExist } from 'src/Domain/Accounting/Specification/IsDailyRateAlreadyExist';
import { DailyRateAlreadyExistException } from 'src/Domain/Accounting/Exception/DailyRateAlreadyExistException';

@CommandHandler(UpdateDailyRateCommand)
export class UpdateDailyRateCommandHandler extends AbstractUserCustomerAndTaskGetter {
  constructor(
    @Inject('ITaskRepository') taskRepository: ITaskRepository,
    @Inject('IUserRepository') userRepository: IUserRepository,
    @Inject('ICustomerRepository') customerRepository: ICustomerRepository,
    @Inject('IDailyRateRepository')
    private readonly dailyRateRepository: IDailyRateRepository,
    private readonly isDailyRateAlreadyExist: IsDailyRateAlreadyExist
  ) {
    super(taskRepository, userRepository, customerRepository);
  }

  public async execute(command: UpdateDailyRateCommand): Promise<string> {
    const { id, customerId, userId, taskId, amount } = command;

    const dailyRate = await this.dailyRateRepository.findOneById(id);
    if (!dailyRate) {
      throw new DailyRateNotFoundException();
    }

    let user = dailyRate.getUser();
    let customer = dailyRate.getCustomer();
    let task = dailyRate.getTask();

    if (
      userId !== user.getId() ||
      taskId !== task.getId() ||
      customerId !== customer.getId()
    ) {
      [user, customer, task] = await Promise.all([
        this.getUser(userId),
        this.getCustomer(customerId),
        this.getTask(taskId)
      ]);

      if (
        true ===
        (await this.isDailyRateAlreadyExist.isSatisfiedBy(user, task, customer))
      ) {
        throw new DailyRateAlreadyExistException();
      }
    }

    dailyRate.update(Math.round(amount * 100), user, customer, task);

    await this.dailyRateRepository.save(dailyRate);

    return dailyRate.getId();
  }
}
