import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {BusModule} from '../bus.module';
import {Quote} from 'src/Domain/Billing/Quote.entity';
import {QuoteItem} from 'src/Domain/Billing/QuoteItem.entity';
import {QuoteRepository} from './Repository/QuoteRepository';
import {QuoteItemRepository} from './Repository/QuoteItemRepository';
import {CreateQuoteCommandHandler} from 'src/Application/Billing/Command/Quote/CreateQuoteCommandHandler';
import {ProjectRepository} from '../Project/Repository/ProjectRepository';
import {CustomerRepository} from '../Customer/Repository/CustomerRepository';
import {Project} from 'src/Domain/Project/Project.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {QuoteIdGenerator} from 'src/Domain/Billing/Quote/QuoteIdGenerator';
import {CreateQuoteAction} from './Action/CreateQuoteAction';
import {DateUtilsAdapter} from '../Adapter/DateUtilsAdapter';
import {CreateQuoteItemsCommandHandler} from 'src/Application/Billing/Command/Quote/CreateQuoteItemsCommandHandler';
import {DailyRate} from 'src/Domain/Billing/DailyRate.entity';
import {User} from 'src/Domain/User/User.entity';
import {DailyRateRepository} from './Repository/DailyRateRepository';
import {UserRepository} from '../User/Repository/UserRepository';
import {CreateDailyRateCommandHandler} from 'src/Application/Billing/Command/DailyRate/CreateDailyRateCommandHandler';
import {TaskRepository} from '../Task/Repository/TaskRepository';
import {Task} from 'src/Domain/Task/Task.entity';
import {IsDailyRateAlreadyExist} from 'src/Domain/Billing/Specification/IsDailyRateAlreadyExist';
import {CreateDailyRateAction} from './Action/CreateDailyRateAction';

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
      User
    ])
  ],
  controllers: [CreateQuoteAction, CreateDailyRateAction],
  providers: [
    {provide: 'IQuoteRepository', useClass: QuoteRepository},
    {provide: 'IDateUtils', useClass: DateUtilsAdapter},
    {provide: 'IQuoteItemRepository', useClass: QuoteItemRepository},
    {provide: 'IDailyRateRepository', useClass: DailyRateRepository},
    {provide: 'IUserRepository', useClass: UserRepository},
    {provide: 'IProjectRepository', useClass: ProjectRepository},
    {provide: 'ITaskRepository', useClass: TaskRepository},
    {provide: 'ICustomerRepository', useClass: CustomerRepository},
    CreateQuoteCommandHandler,
    CreateQuoteItemsCommandHandler,
    CreateDailyRateCommandHandler,
    IsDailyRateAlreadyExist,
    QuoteIdGenerator
  ]
})
export class BillingModule {}
