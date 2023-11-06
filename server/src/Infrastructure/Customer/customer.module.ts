import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { CustomerRepository } from './Repository/CustomerRepository';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { CreateCustomerAction } from './Action/CreateCustomerAction';
import { IsCustomerAlreadyExist } from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import { CreateCustomerCommandHandler } from 'src/Application/Customer/Command/CreateCustomerCommandHandler';
import { GetCustomerByIdQueryHandler } from 'src/Application/Customer/Query/GetCustomerByIdQueryHandler';
import { GetCustomersQueryHandler } from 'src/Application/Customer/Query/GetCustomersQueryHandler';
import { GetCustomersAction } from './Action/GetCustomersAction';
import { UpdateCustomerCommandHandler } from 'src/Application/Customer/Command/UpdateCustomerCommandHandler';
import { UpdateCustomerAction } from './Action/UpdateCustomerAction';
import { GetCustomerAction } from './Action/GetCustomerAction';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([Customer])],
  controllers: [
    CreateCustomerAction,
    UpdateCustomerAction,
    GetCustomerAction,
    GetCustomersAction
  ],
  providers: [
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
    IsCustomerAlreadyExist,
    UpdateCustomerCommandHandler,
    CreateCustomerCommandHandler,
    GetCustomerByIdQueryHandler,
    GetCustomersQueryHandler
  ]
})
export class CustomerModule {}
