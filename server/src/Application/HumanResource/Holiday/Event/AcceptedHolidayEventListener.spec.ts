import {mock, instance, verify} from 'ts-mockito';
import {AcceptedHolidayEventListener} from './AcceptedHolidayEventListener';
import {HolidayToEventsConverter} from 'src/Domain/FairCalendar/Converter/HolidayToEventsConverter';
import {AcceptedHolidayEvent} from './AcceptedHolidayEvent';
import {Holiday} from 'src/Domain/HumanResource/Holiday/Holiday.entity';

describe('AcceptedHolidayEventListener', () => {
  it('testAcceptedHoliday', async () => {
    const holiday = mock(Holiday);
    const holidayToEventsConverter = mock(HolidayToEventsConverter);
    const acceptedHolidayEventListener = new AcceptedHolidayEventListener(
      instance(holidayToEventsConverter)
    );

    await acceptedHolidayEventListener.handle(
      new AcceptedHolidayEvent(instance(holiday))
    );

    verify(holidayToEventsConverter.convert(instance(holiday))).once();
  });
});
