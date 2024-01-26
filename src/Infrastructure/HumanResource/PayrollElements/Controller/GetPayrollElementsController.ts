import {
  Controller,
  Inject,
  Get,
  UseGuards,
  Render,
  Query,
  Res,
  Param
} from '@nestjs/common';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetUsersElementsQuery } from 'src/Application/HumanResource/Payslip/Query/GetUsersElementsQuery';
import { UserElementsView } from 'src/Application/HumanResource/Payslip/View/UserElementsView';
import { IsAuthenticatedGuard } from '../../User/Security/IsAuthenticatedGuard';
import { WithName } from 'src/Infrastructure/Common/ExtendedRouting/WithName';
import { TableCsvFactory } from 'src/Infrastructure/Tables/TableCsvFactory';
import { PayrollElementsTableFactory } from '../Table/PayrollElementsTableFactory';
import { GetPayrollElementsControllerDTO } from '../DTO/GetPayrollElementsControllerDTO';
import { Response } from 'express';
import { ITranslator } from 'src/Infrastructure/Translations/ITranslator';
import { formatHtmlYearMonth } from 'src/Infrastructure/Common/Utils/dateUtils';

@Controller('app/people/payroll_elements')
@UseGuards(IsAuthenticatedGuard)
export class GetPayrollElementsController {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus,
    private readonly tableCsvFactory: TableCsvFactory,
    private readonly tableFactory: PayrollElementsTableFactory,
    @Inject('ITranslator')
    private readonly translator: ITranslator
  ) {}

  @Get()
  @WithName('people_payroll_elements')
  @Render('pages/payroll_elements/index.njk')
  public async get(@Query() dto: GetPayrollElementsControllerDTO) {
    let date = new Date();

    if (dto.year !== undefined && dto.month !== undefined) {
      date = new Date(dto.year, dto.month - 1, 15);
    }

    const elements: UserElementsView[] = await this.queryBus.execute(
      new GetUsersElementsQuery(date)
    );

    const table = this.tableFactory.create(elements);

    return {
      table,
      date,
      year: date.getUTCFullYear(),
      month: date.getUTCMonth() + 1
    };
  }

  @Get('/:year-:month.csv')
  @WithName('people_payroll_elements_download')
  public async download(
    @Param() dto: GetPayrollElementsControllerDTO,
    @Res() res: Response
  ) {
    const { table, date } = await this.get(dto);

    const csv = this.tableCsvFactory.toCsv(table);
    const filename = this.translator.translate('payroll-elements-filename', {
      date: formatHtmlYearMonth(date)
    });

    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/csv');
    res.send(csv);
  }
}
