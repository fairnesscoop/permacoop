import {
  Controller,
  Inject,
  Get,
  UseGuards,
  Render,
  Query
} from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetUsersElementsQuery } from 'src/Application/HumanResource/Payslip/Query/GetUsersElementsQuery';
import { UserElementsView } from 'src/Application/HumanResource/Payslip/View/UserElementsView';
import { IsAuthenticatedGuard } from '../../User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { TableCsvFactory } from 'src/Infrastructure/Tables/TableCsvFactory';
import { PayrollElementsTableFactory } from '../Table/PayrollElementsTableFactory';
import { GetPayrollElementsControllerDTO } from '../DTO/GetPayrollElementsControllerDTO';

@Controller('app/people/payroll_elements')
@UseGuards(IsAuthenticatedGuard)
export class GetPayrollElementsController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableCsvFactory: TableCsvFactory,
    private readonly tableFactory: PayrollElementsTableFactory
  ) {}

  @Get()
  @WithName('people_payroll_elements')
  @Render('pages/payroll_elements/index.njk')
  public async get(@Query() dto: GetPayrollElementsControllerDTO) {
    const date =
      dto.month !== undefined && dto.year !== undefined
        ? new Date(dto.year, dto.month, 15)
        : new Date();

    const elements: UserElementsView[] = await this.queryBus.execute(
      new GetUsersElementsQuery(date)
    );

    const table = this.tableFactory.create(elements);
    const csv = this.tableCsvFactory.toCsv(table);

    return {
      table,
      csv,
      date,
      year: date.getUTCFullYear(),
      month: date.getUTCMonth()
    };
  }
}
