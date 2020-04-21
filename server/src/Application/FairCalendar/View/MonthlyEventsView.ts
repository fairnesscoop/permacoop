import {EventView} from './EventView';
import {IEventsOverview} from 'src/Domain/FairCalendar/IEventsOverview';

export class MonthlyEventsView {
  constructor(
    public readonly events: EventView[],
    public readonly overview: IEventsOverview
  ) {}
}
