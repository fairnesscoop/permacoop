import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {BusModule} from '../bus.module';
import {Quote} from 'src/Domain/Billing/Quote.entity';
import {QuoteItem} from 'src/Domain/Billing/QuoteItem.entity';
import {QuoteRepository} from './Repository/QuoteRepository';
import {QuoteItemRepository} from './Repository/QuoteItemRepository';
import {CreateQuoteCommandHandler} from 'src/Application/Billing/Command/CreateQuoteCommandHandler';
import {ProjectRepository} from '../Project/Repository/ProjectRepository';
import {CustomerRepository} from '../Customer/Repository/CustomerRepository';
import {Project} from 'src/Domain/Project/Project.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {QuoteIdGenerator} from 'src/Domain/Billing/QuoteIdGenerator';
import {CreateQuoteAction} from './Action/CreateQuoteAction';
import {DateUtilsAdapter} from '../Adapter/DateUtilsAdapter';
import {CreateQuoteItemsCommandHandler} from 'src/Application/Billing/Command/CreateQuoteItemsCommandHandler';

@Module({
  imports: [
    BusModule,
    ConfigModule,
    TypeOrmModule.forFeature([Quote, QuoteItem, Project, Customer])
  ],
  controllers: [CreateQuoteAction],
  providers: [
    {provide: 'IQuoteRepository', useClass: QuoteRepository},
    {provide: 'IDateUtils', useClass: DateUtilsAdapter},
    {provide: 'IQuoteItemRepository', useClass: QuoteItemRepository},
    {provide: 'IProjectRepository', useClass: ProjectRepository},
    {provide: 'ICustomerRepository', useClass: CustomerRepository},
    CreateQuoteCommandHandler,
    CreateQuoteItemsCommandHandler,
    QuoteIdGenerator
  ]
})
export class BillingModule {}
