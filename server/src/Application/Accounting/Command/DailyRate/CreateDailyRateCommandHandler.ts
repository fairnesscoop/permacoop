import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {CreateDailyRateCommand} from './CreateDailyRateCommand';
import {IDailyRateRepository} from 'src/Domain/Accounting/Repository/IDailyRateRepository';
import {DailyRate} from 'src/Domain/Accounting/DailyRate.entity';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {IsDailyRateAlreadyExist} from 'src/Domain/Accounting/Specification/IsDailyRateAlreadyExist';
import {DailyRateAlreadyExistException} from 'src/Domain/Accounting/Exception/DailyRateAlreadyExistException';
import {AbstractUserCustomerAndTaskGetter} from './AbstractUserCustomerAndTaskGetter';

@CommandHandler(CreateDailyRateCommand)
export class CreateDailyRateCommandHandler extends AbstractUserCustomerAndTaskGetter {
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

  public async execute(command: CreateDailyRateCommand): Promise<string> {
    const {customerId, userId, taskId, amount} = command;

    const user = await this.getUser(userId);
    const customer = await this.getCustomer(customerId);
    const task = await this.getTask(taskId);

    if (
      true ===
      (await this.isDailyRateAlreadyExist.isSatisfiedBy(user, task, customer))
    ) {
      throw new DailyRateAlreadyExistException();
    }

    const dailyRate = await this.dailyRateRepository.save(
      new DailyRate(Math.round(amount * 100), user, customer, task)
    );

    return dailyRate.getId();
  }
}
