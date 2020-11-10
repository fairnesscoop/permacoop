import { ICalendarOverview} from 'src/Domain/FairCalendar/ICalendarOverview';
import { FairCalendarView } from './FairCalendarView';

export class MonthlyEventsView {
  constructor(
    public readonly events: FairCalendarView[],
    public readonly overview: ICalendarOverview
  ) {}
}
