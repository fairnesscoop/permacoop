import {CommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {CreateDailyRateCommand} from '../DailyRate/CreateDailyRateCommand';
import {IDailyRateRepository} from 'src/Domain/Billing/Repository/IDailyRateRepository';
import {DailyRate} from 'src/Domain/Billing/DailyRate.entity';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {UserNotFoundException} from 'src/Domain/User/Exception/UserNotFoundException';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';
import {IsDailyRateAlreadyExist} from 'src/Domain/Billing/Specification/IsDailyRateAlreadyExist';
import {DailyRateAlreadyExistException} from 'src/Domain/Billing/Exception/DailyRateAlreadyExistException';

@CommandHandler(CreateDailyRateCommand)
export class CreateDailyRateCommandHandler {
  constructor(
    @Inject('IDailyRateRepository')
    private readonly dailyRateRepository: IDailyRateRepository,
    @Inject('ICustomerRepository')
    private readonly customerRepository: ICustomerRepository,
    @Inject('ITaskRepository')
    private readonly taskRepository: ITaskRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly isDailyRateAlreadyExist: IsDailyRateAlreadyExist
  ) {}

  public async execute(command: CreateDailyRateCommand): Promise<string> {
    const {customerId, userId, taskId, amount} = command;

    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const customer = await this.customerRepository.findOneById(customerId);
    if (!customer) {
      throw new CustomerNotFoundException();
    }

    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }

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
