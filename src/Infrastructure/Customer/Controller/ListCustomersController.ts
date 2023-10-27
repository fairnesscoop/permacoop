import {
  Controller,
  Inject,
  UseGuards,
  Get,
  Query,
  Render
} from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetCustomersQuery } from 'src/Application/Customer/Query/GetCustomersQuery';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { IsAuthenticatedGuard } from 'src/Infrastructure/HumanResource/User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { Pagination } from 'src/Application/Common/Pagination';
import { CustomerView } from 'src/Application/Customer/View/CustomerView';
import { CustomerTableFactory } from '../Table/CustomerTableFactory';

@Controller('app/customers')
@UseGuards(IsAuthenticatedGuard)
export class ListCustomersController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableFactory: CustomerTableFactory
  ) {}

  @Get()
  @WithName('crm_customers_list')
  @Render('pages/customers/list.njk')
  public async get(@Query() pagination: PaginationDTO) {
    const customers: Pagination<CustomerView> = await this.queryBus.execute(
      new GetCustomersQuery(pagination.page)
    );

    const table = this.tableFactory.create(customers.items);

    return { table };
  }
}
