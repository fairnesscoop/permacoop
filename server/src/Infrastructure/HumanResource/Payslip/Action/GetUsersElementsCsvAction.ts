import { Controller, Inject, Get, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiCookieAuth } from '@nestjs/swagger';
import { IQueryBus } from 'src/Application/IQueryBus';
import { GetUsersElementsQuery } from 'src/Application/HumanResource/Payslip/Query/GetUsersElementsQuery';
import { UserElementsView } from 'src/Application/HumanResource/Payslip/View/UserElementsView';
import { Response } from 'express';
import { format } from 'date-fns';
import { LeaveRequestSlotView } from 'src/Application/HumanResource/Leave/View/LeaveRequestSlotView';

const formatFrNumber = (n: number) =>
  n.toLocaleString('fr-FR').replaceAll(' ', '');

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
      'NOM',
      'Prénom',
      'Contrat',
      "Date d'entrée",
      'Salaire annuel brut',
      'Salaire mensuel brut',
      'Temps de travail',
      'Frais de transport',
      'Forfait mobilité durable',
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
        payslip.lastName.toUpperCase(),
        payslip.firstName,
        payslip.contract,
        payslip.joiningDate,
        formatFrNumber(payslip.annualEarnings),
        formatFrNumber(Math.round(payslip.monthlyEarnings * 100) / 100),
        payslip.workingTime === 'full_time' ? 'Temps plein' : 'Temps partiel',
        formatFrNumber(payslip.transportFee),
        formatFrNumber(payslip.sustainableMobilityFee),
        payslip.mealTickets,
        payslip.healthInsurance === 'yes' ? 'Oui' : 'Non',
        formatFrNumber(payslip.paidLeaves.totalDays),
        formatFrNumber(payslip.unpaidLeaves.totalDays),
        formatFrNumber(payslip.sickLeaves.totalDays),
        formatFrNumber(payslip.exceptionalLeaves.totalDays),
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
