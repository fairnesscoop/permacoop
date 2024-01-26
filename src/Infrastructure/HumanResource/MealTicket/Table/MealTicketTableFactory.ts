import { Injectable } from '@nestjs/common';
import { Row, Table } from 'src/Infrastructure/Tables';
import { formatFullName } from 'src/Infrastructure/Common/Utils/formatUtils';
import { RowFactory } from 'src/Infrastructure/Tables/RowFactory';
import { MealTicketsPerMonthView } from 'src/Application/HumanResource/MealTicket/Views/MealTicketsPerMonthView';

@Injectable()
export class MealTicketTableFactory {
  constructor(private rowFactory: RowFactory) {}

  public create(views: MealTicketsPerMonthView[]): Table {
    const columns = [
      'meal-tickets-user',
      'meal-tickets-num-tickets',
      'meal-tickets-num-exceptions'
    ];

    const rows = views.map(
      (view): Row =>
        this.rowFactory
          .createBuilder()
          .value(formatFullName(view))
          .value(view.mealTickets)
          .value(view.mealTicketRemovals)
          .build()
    );

    return new Table(columns, rows);
  }
}
