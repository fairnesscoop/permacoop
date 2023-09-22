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

@Controller('app/customers')
@UseGuards(IsAuthenticatedGuard)
export class ListCustomersController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @WithName('crm_customers_list')
  @Render('pages/customers_index.njk')
  public async index(@Query() pagination: PaginationDTO) {
    const customers = await this.queryBus.execute(
      new GetCustomersQuery(pagination.page)
    );

    return { customers };
  }
}
