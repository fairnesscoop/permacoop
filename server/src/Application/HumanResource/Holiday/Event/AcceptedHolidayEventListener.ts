import {EventsHandler} from '@nestjs/cqrs';
import {AcceptedHolidayEvent} from './AcceptedHolidayEvent';
import {HolidayToEventsConverter} from 'src/Domain/FairCalendar/Converter/HolidayToEventsConverter';

@EventsHandler(AcceptedHolidayEvent)
export class AcceptedHolidayEventListener {
  constructor(
    private readonly holidayToEventsConverter: HolidayToEventsConverter
  ) {}

  public handle(event: AcceptedHolidayEvent): void {
    this.holidayToEventsConverter.convert(event.holiday);
  }
}
