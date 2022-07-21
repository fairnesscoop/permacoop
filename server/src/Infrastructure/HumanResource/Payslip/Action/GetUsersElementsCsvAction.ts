import { Controller, Inject, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCookieAuth } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetUsersElementsQuery } from 'src/Application/HumanResource/Payslip/Query/GetUsersElementsQuery';
import { UserElementsView } from 'src/Application/HumanResource/Payslip/View/UserElementsView';
import { Response } from 'express';
import { UserLeavesView } from 'src/Application/HumanResource/Payslip/View/UserLeavesView';
import { format } from 'date-fns';

@Controller('payslips.csv')
@ApiCookieAuth()
@UseGuards(AuthGuard('bearer'))
export class GetUsersElementsCsvAction {
  constructor(
    @Inject('IQueryBus')
    private readonly queryBus: IQueryBus
  ) {}

  @Get()
  public async index(@Res() res: Response) {
    res.header('Content-Type', 'text/csv');

    const date = new Date();

    const month = date.toISOString().substring(0, 7);

    res.attachment(`playslips-${month}.csv`);

    const payslips = await this.queryBus.execute(
      new GetUsersElementsQuery(date)
    );

    const rows: string[] = payslips.map((payslip: UserElementsView) =>
      [
        payslip.firstName,
        payslip.lastName,
        payslip.contract,
        payslip.joiningDate,
        payslip.annualEarnings,
        payslip.monthlyEarnings.toFixed(2),
        payslip.workingTime,
        payslip.transportFee,
        payslip.mealTickets,
        payslip.healthInsurance,
        this.formatLeaves(payslip.paidLeaves),
        payslip.unpaidLeaves.totalDays,
        payslip.sickLeaves.totalDays,
        payslip.exceptionalLeaves.totalDays
      ].join(',')
    );

    const headers = [
      'firstName',
      'lastName',
      'contract',
      'joiningDate',
      'annualEarnings',
      'monthlyEarnings',
      'workingTime',
      'transportFee',
      'mealTickets',
      'healthInsurance',
      'paidLeaves',
      'unpaidLeaves',
      'sickLeaves',
      'exceptionalLeaves'
    ];

    const csv: string = [headers.join(','), ...rows].join('\n');

    return res.send(csv);
  }

  private formatLeaves(leaves: UserLeavesView): string {
    if (leaves.totalDays === 0) return '';

    const formatDate = (dateString: string): string =>
      format(new Date(dateString), 'dd/MM/yyyy');

    const formattedSlots = leaves.leaves.map(
      leave => formatDate(leave.startDate) + ' - ' + formatDate(leave.endDate)
    );

    const row = leaves.totalDays + '\n' + formattedSlots.join('\n');

    return `"${row}"`;
  }
}
