import { Injectable } from '@nestjs/common';
import { UserElementsView } from 'src/Application/HumanResource/Payslip/View/UserElementsView';
import { Table } from 'src/Infrastructure/Tables';
import { RowFactory } from 'src/Infrastructure/Tables/RowFactory';
import { formatFullName } from 'src/Infrastructure/Common/Utils/formatUtils';

@Injectable()
export class PayrollElementsTableFactory {
  constructor(private readonly cells: RowFactory) {}

  public create(elements: UserElementsView[]): Table {
    const columns = [
      'payroll-elements-user',
      'payroll-elements-contract',
      'payroll-elements-joiningDate',
      'payroll-elements-annualEarnings',
      'payroll-elements-monthlyEarnings',
      'payroll-elements-workingTime',
      'payroll-elements-transportFee',
      'payroll-elements-sustainableMobilityFee',
      'payroll-elements-mealTickets',
      'payroll-elements-healthInsurance',
      'payroll-elements-paidLeaves',
      'payroll-elements-unpaidLeaves',
      'payroll-elements-medicalLeaves',
      'payroll-elements-specialLeaves',
      'payroll-elements-postponedWorkedFreeDayLeaves',
      'payroll-elements-relocationLeaves'
    ];

    const rows = [];

    for (const item of elements) {
      const row = this.cells
        .createBuilder()
        .value(formatFullName(item))
        .trans('payroll-elements-contract-value', {
          contract: item.contract,
          executivePosition: item.isExecutivePosition ? 'yes' : 'no'
        })
        .trans('common-date', { date: new Date(item.joiningDate) })
        .trans('common-money', { value: item.annualEarnings })
        .trans('common-money', { value: item.monthlyEarnings })
        .trans('users-workingTime-value', {
          workingTime: item.workingTime
        })
        .trans('common-money', { value: item.transportFee })
        .trans('common-money', {
          value: item.sustainableMobilityFee
        })
        .value(item.mealTickets)
        .trans(item.healthInsurance ? 'common-yes' : 'common-no')
        .template('pages/payroll_elements/_leaves.njk', {
          leaves: item.paidLeaves
        })
        .template('pages/payroll_elements/_leaves.njk', {
          leaves: item.unpaidLeaves
        })
        .template('pages/payroll_elements/_leaves.njk', {
          leaves: item.sickLeaves
        })
        .template('pages/payroll_elements/_leaves.njk', {
          leaves: item.exceptionalLeaves
        })
        .template('pages/payroll_elements/_leaves.njk', {
          leaves: item.postponedWorkedFreeDayLeaves
        })
        .template('pages/payroll_elements/_leaves.njk', {
          leaves: item.relocationLeaves
        })
        .build();

      rows.push(row);
    }

    return new Table(columns, rows);
  }
}
