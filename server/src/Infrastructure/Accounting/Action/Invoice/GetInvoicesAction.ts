import {Controller, Inject, UseGuards, Get, Query} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetInvoicesQuery } from 'src/Application/Accounting/Query/Invoice/GetInvoicesQuery';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';
import { PaginationDTO } from 'src/Infrastructure/Common/DTO/PaginationDTO';
import { Pagination } from 'src/Application/Common/Pagination';
import { InvoiceView } from 'src/Application/Accounting/View/DailyRate/InvoiceView';

@Controller('invoices')
@ApiTags('Accounting')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class GetInvoicesAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({summary: 'Get all invoices'})
  public async index(
    @Query() pagination: PaginationDTO
  ): Promise<Pagination<InvoiceView>> {
    return await this.queryBus.execute(
      new GetInvoicesQuery(Number(pagination.page))
    );
  }
}
