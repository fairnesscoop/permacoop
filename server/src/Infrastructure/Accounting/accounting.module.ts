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
import { Invoice } from 'src/Domain/Accounting/Invoice.entity';
import { InvoiceItem } from 'src/Domain/Accounting/InvoiceItem.entity';
import { GenerateInvoiceCommandHandler } from 'src/Application/Accounting/Command/Invoice/GenerateInvoiceCommandHandler';
import { EventRepository } from '../FairCalendar/Repository/EventRepository';
import { Event } from 'src/Domain/FairCalendar/Event.entity';
import { InvoiceRepository } from './Repository/InvoiceRepository';
import { InvoiceItemRepository } from './Repository/InvoiceItemRepository';
import { InvoiceIdGenerator } from 'src/Domain/Accounting/Generators/InvoiceIdGenerator';
import { GenerateInvoiceAction } from './Action/Invoice/GenerateInvoiceAction';
import { GetInvoicesAction } from './Action/Invoice/GetInvoicesAction';
import { GetInvoicesQueryHandler } from 'src/Application/Accounting/Query/Invoice/GetInvoicesQueryHandler';

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
      Invoice,
      InvoiceItem,
      Event
    ])
  ],
  controllers: [
    CreateQuoteAction,
    CreateDailyRateAction,
    GetDailyRatesAction,
    GetDailyRateAction,
    UpdateDailyRateAction,
    GetQuotesAction,
    GetInvoicesAction,
    GenerateInvoiceAction
  ],
  providers: [
    { provide: 'IQuoteRepository', useClass: QuoteRepository },
    { provide: 'IDateUtils', useClass: DateUtilsAdapter },
    { provide: 'IQuoteItemRepository', useClass: QuoteItemRepository },
    { provide: 'IDailyRateRepository', useClass: DailyRateRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IProjectRepository', useClass: ProjectRepository },
    { provide: 'ITaskRepository', useClass: TaskRepository },
    { provide: 'ICustomerRepository', useClass: CustomerRepository },
    { provide: 'IEventRepository', useClass: EventRepository },
    { provide: 'IInvoiceRepository', useClass: InvoiceRepository },
    { provide: 'IInvoiceItemRepository', useClass: InvoiceItemRepository },
    Date,
    CreateQuoteCommandHandler,
    CreateQuoteItemsCommandHandler,
    CreateDailyRateCommandHandler,
    IsDailyRateAlreadyExist,
    QuoteIdGenerator,
    GetDailyRatesQueryHandler,
    UpdateDailyRateCommandHandler,
    GetQuotesQueryHandler,
    GetDailyRateByIdQueryHandler,
    GenerateInvoiceCommandHandler,
    InvoiceIdGenerator,
    GetInvoicesQueryHandler
  ]
})
export class AccountingModule {}
