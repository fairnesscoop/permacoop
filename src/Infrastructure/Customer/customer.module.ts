import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusModule } from '../bus.module';
import { CustomerRepository } from './Repository/CustomerRepository';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { IsCustomerAlreadyExist } from 'src/Domain/Customer/Specification/IsCustomerAlreadyExist';
import { CreateCustomerCommandHandler } from 'src/Application/Customer/Command/CreateCustomerCommandHandler';
import { GetCustomerByIdQueryHandler } from 'src/Application/Customer/Query/GetCustomerByIdQueryHandler';
import { GetCustomersQueryHandler } from 'src/Application/Customer/Query/GetCustomersQueryHandler';
import { UpdateCustomerCommandHandler } from 'src/Application/Customer/Command/UpdateCustomerCommandHandler';
import { ListCustomersController } from './Controller/ListCustomersController';
import { AddCustomerController } from './Controller/AddCustomerController';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';
import { EditCustomerController } from './Controller/EditCustomerController';
import { CustomerTableFactory } from './Table/CustomerTableFactory';
import { TablesModule } from '../Tables/tables.module';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([Customer]),
    ExtendedRoutingModule,
    TablesModule
  ],
  controllers: [
    ListCustomersController,
    AddCustomerController,
    EditCustomerController
  ],
  providers: [
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
    IsCustomerAlreadyExist,
    UpdateCustomerCommandHandler,
    CreateCustomerCommandHandler,
    GetCustomerByIdQueryHandler,
    GetCustomersQueryHandler,
    CustomerTableFactory
  ]
})
export class CustomerModule {}
