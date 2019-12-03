import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BusModule} from '../bus.module';
import {CustomerRepository} from './Repository/CustomerRepository';
import {Task} from 'src/Domain/Project/Task.entity';
import {Project} from 'src/Domain/Project/Project.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {CreateCustomerAction} from './Action/CreateCustomerAction';
import {IsCustomerAlreadyExist} from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import {CreateCustomerCommandHandler} from 'src/Application/Customer/Command/CreateCustomerCommandHandler';
import {GetCustomerByIdQueryHandler} from 'src/Application/Customer/Query/GetCustomerByIdQueryHandler';
import {GetCustomersQueryHandler} from 'src/Application/Customer/Query/GetCustomersQueryHandler';
import {GetCustomersAction} from './Action/GetCustomersAction';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Task, Project, Customer])],
  controllers: [CreateCustomerAction, GetCustomersAction],
  providers: [
    {provide: 'ICustomerRepository', useClass: CustomerRepository},
    IsCustomerAlreadyExist,
    CreateCustomerCommandHandler,
    GetCustomerByIdQueryHandler,
    GetCustomersQueryHandler
  ]
})
export class CustomerModule {}
