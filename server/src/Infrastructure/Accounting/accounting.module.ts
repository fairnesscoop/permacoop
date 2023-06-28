import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BusModule } from '../bus.module';
import { Quote } from 'src/Domain/Accounting/Quote.entity';
import { QuoteItem } from 'src/Domain/Accounting/QuoteItem.entity';
import { QuoteRepository } from './Repository/QuoteRepository';
import { QuoteItemRepository } from './Repository/QuoteItemRepository';
import { CreateQuoteCommandHandler } from 'src/Application/Accounting/Command/Quote/CreateQuoteCommandHandler';
import { ProjectRepository } from '../Project/Repository/ProjectRepository';
import { CustomerRepository } from '../Customer/Repository/CustomerRepository';
import { Project } from 'src/Domain/Project/Project.entity';
import { Customer } from 'src/Domain/Customer/Customer.entity';
import { QuoteIdGenerator } from 'src/Domain/Accounting/Generators/QuoteIdGenerator';
import { CreateQuoteAction } from './Action/Quote/CreateQuoteAction';
import { DateUtilsAdapter } from '../Adapter/DateUtilsAdapter';
import { CreateQuoteItemsCommandHandler } from 'src/Application/Accounting/Command/Quote/CreateQuoteItemsCommandHandler';
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
import { GetQuotesAction } from './Action/Quote/GetQuotesAction';
import { GetQuotesQueryHandler } from 'src/Application/Accounting/Query/Quote/GetQuotesQueryHandler';
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
      Quote,
      QuoteItem,
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
    CreateQuoteAction,
    CreateDailyRateAction,
    GetDailyRatesAction,
    GetDailyRateAction,
    UpdateDailyRateAction,
    GetQuotesAction
  ],
  providers: [
    { provide: 'ICooperativeRepository', useClass: CooperativeRepository },
    { provide: 'IQuoteRepository', useClass: QuoteRepository },
    { provide: 'IDateUtils', useClass: DateUtilsAdapter },
    { provide: 'IQuoteItemRepository', useClass: QuoteItemRepository },
    { provide: 'IDailyRateRepository', useClass: DailyRateRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IProjectRepository', useClass: ProjectRepository },
    { provide: 'ITaskRepository', useClass: TaskRepository },
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
    { provide: 'IEventRepository', useClass: EventRepository },
    CreateQuoteCommandHandler,
    CreateQuoteItemsCommandHandler,
    CreateDailyRateCommandHandler,
    IsDailyRateAlreadyExist,
    QuoteIdGenerator,
    GetDailyRatesQueryHandler,
    UpdateDailyRateCommandHandler,
    GetQuotesQueryHandler,
    GetDailyRateByIdQueryHandler
  ]
})
export class AccountingModule {}
