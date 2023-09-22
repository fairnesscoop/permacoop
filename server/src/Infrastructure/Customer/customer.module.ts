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
import { AddressRepository } from './Repository/AddressRepository';
import { Address } from 'src/Domain/Customer/Address.entity';
import { ListCustomersController } from './Controller/ListCustomersController';
import { AddCustomerController } from './Controller/AddCustomerController';
import { ExtendedRoutingModule } from '../Common/ExtendedRouting/extendedRouting.module';
import { EditCustomerController } from './Controller/EditCustomerController';

@Module({
  imports: [
    BusModule,
    TypeOrmModule.forFeature([Customer, Address]),
    ExtendedRoutingModule
  ],
  controllers: [
    ListCustomersController,
    AddCustomerController,
    EditCustomerController
  ],
  providers: [
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
    { provide: 'IAddressRepository', useClass: AddressRepository },
    IsCustomerAlreadyExist,
    UpdateCustomerCommandHandler,
    CreateCustomerCommandHandler,
    GetCustomerByIdQueryHandler,
    GetCustomersQueryHandler
  ]
})
export class CustomerModule {}
