import { Controller, Inject, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCookieAuth } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetUsersElementsQuery } from 'src/Application/HumanResource/Payslip/Query/GetUsersElementsQuery';
import { UserElementsView } from 'src/Application/HumanResource/Payslip/View/UserElementsView';
import { Response } from 'express';
import { format } from 'date-fns';
import { LeaveRequestSlotView } from 'src/Application/HumanResource/Leave/View/LeaveRequestSlotView';

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

    res.attachment(`Fairness - Éléments de paie - ${month}.csv`);

    const payslips: UserElementsView[] = await this.queryBus.execute(
      new GetUsersElementsQuery(date)
    );

    const headers = [
      'Prénom',
      'Nom',
      'Contrat',
      "Date d'entrée",
      'Salaire annuel brut',
      'Salaire mensuel brut',
      'Temps de travail',
      'Frais de transport',
      'Titres restaurant',
      'Mutuelle',
      'Congés payés',
      'Congés sans solde',
      'Congés maladie',
      'Congés exceptionnels',
      'Notes'
    ];

    const paidLeavesIndex = headers.findIndex(
      value => value === 'Congés payés'
    );

    const rows: string[] = [];

    for (const payslip of payslips) {
      const row = [
        payslip.firstName,
        payslip.lastName,
        payslip.contract,
        payslip.joiningDate,
        payslip.annualEarnings,
        payslip.monthlyEarnings.toFixed(2),
        payslip.workingTime === 'full_time' ? 'Temps plein' : 'Temps partiel',
        payslip.transportFee,
        payslip.mealTickets,
        payslip.healthInsurance === 'yes' ? 'Oui' : 'Non',
        payslip.paidLeaves.totalDays,
        payslip.unpaidLeaves.totalDays,
        payslip.sickLeaves.totalDays,
        payslip.exceptionalLeaves.totalDays,
        ''
      ];

      rows.push(row.join(';'));

      for (const leave of payslip.paidLeaves.leaves) {
        const leaveRow = row.map((_, index) =>
          index === paidLeavesIndex ? this.formatLeaves(leave) : ''
        );
        rows.push(leaveRow.join(';'));
      }
    }

    const csv: string = [headers.join(';'), ...rows].join('\n');

    return res.send(csv);
  }

  private formatLeaves(leave: LeaveRequestSlotView): string {
    const formatDate = (dateString: string): string =>
      format(new Date(dateString), 'dd/MM/yyyy');

    return formatDate(leave.startDate) + ' - ' + formatDate(leave.endDate);
  }
}
