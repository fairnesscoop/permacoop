import {Task} from 'src/Domain/Task/Task.entity';
import {User} from 'src/Domain/User/User.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {CustomerNotFoundException} from 'src/Domain/Customer/Exception/CustomerNotFoundException';
import {UserNotFoundException} from 'src/Domain/User/Exception/UserNotFoundException';
import {ITaskRepository} from 'src/Domain/Task/Repository/ITaskRepository';
import {IUserRepository} from 'src/Domain/User/Repository/IUserRepository';
import {ICustomerRepository} from 'src/Domain/Customer/Repository/ICustomerRepository';
import {TaskNotFoundException} from 'src/Domain/Task/Exception/TaskNotFoundException';

export abstract class AbstractUserCustomerAndTaskGetter {
  constructor(
    private readonly taskRepository: ITaskRepository,
    private readonly userRepository: IUserRepository,
    private readonly customerRepository: ICustomerRepository
  ) {}

  protected async getTask(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOneById(taskId);
    if (!task) {
      throw new TaskNotFoundException();
    }

    return task;
  }

  protected async getCustomer(customerId: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneById(customerId);
    if (!customer) {
      throw new CustomerNotFoundException();
    }

    return customer;
  }

  protected async getUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOneById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }
}
