import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BusModule } from '../bus.module';
import { ProjectRepository } from '../Project/Repository/ProjectRepository';
import { CustomerRepository } from '../Customer/Repository/CustomerRepository';
import { Project } from 'src/Domain/Project/Project.entity';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { DateUtilsAdapter } from '../Adapter/DateUtilsAdapter';
import { DailyRate } from 'src/Domain/Accounting/DailyRate.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { DailyRateRepository } from './Repository/DailyRateRepository';
import { CreateDailyRateCommandHandler } from 'src/Application/Accounting/Command/DailyRate/CreateDailyRateCommandHandler';
import { TaskRepository } from '../Task/Repository/TaskRepository';
import { Task } from 'src/Domain/Task/Task.entity';
import { IsDailyRateAlreadyExist } from 'src/Domain/Accounting/Specification/IsDailyRateAlreadyExist';
import { CreateDailyRateAction } from './Action/DailyRate/CreateDailyRateAction';
import { GetDailyRatesQueryHandler } from 'src/Application/Accounting/Query/DailyRate/GetDailyRatesQueryHandler';
import { GetDailyRatesAction } from './Action/DailyRate/GetDailyRatesAction';
import { GetDailyRateAction } from './Action/DailyRate/GetDailyRateAction';
import { GetDailyRateByIdQueryHandler } from 'src/Application/Accounting/Query/DailyRate/GetDailyRateByIdQueryHandler';
import { UpdateDailyRateAction } from './Action/DailyRate/UpdateDailyRateAction';
import { UpdateDailyRateCommandHandler } from 'src/Application/Accounting/Command/DailyRate/UpdateDailyRateCommandHandler';
import { UserRepository } from '../HumanResource/User/Repository/UserRepository';
import { EventRepository } from '../FairCalendar/Repository/EventRepository';
import { Event } from 'src/Domain/FairCalendar/Event.entity';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';
import { CooperativeRepository } from '../Settings/Repository/CooperativeRepository';

@Module({
  imports: [
    BusModule,
    ConfigModule,
    TypeOrmModule.forFeature([
      Project,
      Customer,
      Task,
      DailyRate,
      User,
      Event,
      Cooperative
    ])
  ],
  controllers: [
    CreateDailyRateAction,
    GetDailyRatesAction,
    GetDailyRateAction,
    UpdateDailyRateAction
  ],
  providers: [
    { provide: 'ICooperativeRepository', useClass: CooperativeRepository },
    { provide: 'IDateUtils', useClass: DateUtilsAdapter },
    { provide: 'IDailyRateRepository', useClass: DailyRateRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IProjectRepository', useClass: ProjectRepository },
    { provide: 'ITaskRepository', useClass: TaskRepository },
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
    { provide: 'IEventRepository', useClass: EventRepository },
    CreateDailyRateCommandHandler,
    IsDailyRateAlreadyExist,
    GetDailyRatesQueryHandler,
    UpdateDailyRateCommandHandler,
    GetDailyRateByIdQueryHandler
  ]
})
export class AccountingModule {}
