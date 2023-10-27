import { Inject, Injectable } from '@nestjs/common';
import { RowFactory } from 'src/Infrastructure/Tables/RowFactory';
import { Table } from 'src/Infrastructure/Tables';
import { ICalendarOverview } from 'src/Domain/FairCalendar/ICalendarOverview';
import { EventType } from 'src/Domain/FairCalendar/Event.entity';
import { ITranslator } from 'src/Infrastructure/Translations/ITranslator';

@Injectable()
export class FairCalendarOverviewTableFactory {
  constructor(
    private readonly rowFactory: RowFactory,
    @Inject('ITranslator')
    private readonly translator: ITranslator
  ) {}

  public create(overview: ICalendarOverview): Table {
    const columns = [];
    const rowBuilder = this.rowFactory.createBuilder();

    const eventTypes: string[] = Object.values(EventType);
    eventTypes.splice(-1, 0, 'leave');

    for (const type of eventTypes) {
      columns.push(
        this.translator.translate('faircalendar-type-option', { type })
      );
      rowBuilder.template('pages/faircalendar/_overview_badge.njk', {
        type,
        days: overview[type]
      });
    }

    const row = rowBuilder.build();

    return new Table(columns, [row]);
  }
}
