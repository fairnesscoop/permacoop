import {instance, mock, when, verify, deepEqual, anything} from 'ts-mockito';
import {HolidayToEventsConverter} from './HolidayToEventsConverter';
import {EventRepository} from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import {DateUtilsAdapter} from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import {
  Holiday,
  HolidayLeaveType
} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {EventType, Event} from '../Event.entity';

describe('HolidayToEventsConverter', () => {
  let eventRepository: EventRepository;
  let dateUtilsAdapter: DateUtilsAdapter;
  let holidayToEventsConverter: HolidayToEventsConverter;

  beforeEach(() => {
    eventRepository = mock(EventRepository);
    dateUtilsAdapter = mock(DateUtilsAdapter);
    holidayToEventsConverter = new HolidayToEventsConverter(
      instance(eventRepository),
      instance(dateUtilsAdapter)
    );
  });

  it('testConvertHolidayToEventsWithFullEnds', async () => {
    const type = EventType.MEDICAL_LEAVE;
    const user = mock(User);
    const holiday = mock(Holiday);
    when(holiday.getLeaveType()).thenReturn(HolidayLeaveType.MEDICAL);
    when(holiday.getStartDate()).thenReturn('2020-12-24');
    when(holiday.isStartsAllDay()).thenReturn(false);
    when(holiday.getEndDate()).thenReturn('2021-01-04');
    when(holiday.isEndsAllDay()).thenReturn(true);
    when(holiday.getUser()).thenReturn(instance(user));

    when(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).thenReturn([
      new Date('2020-12-24'),
      new Date('2020-12-28'),
      new Date('2020-12-29'),
      new Date('2020-12-30'),
      new Date('2020-12-31'),
      new Date('2021-01-04')
    ]);

    holidayToEventsConverter.convert(instance(holiday));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();

    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 50, '2020-12-24T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2020-12-28T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2020-12-29T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2020-12-30T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2020-12-31T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2021-01-04T00:00:00.000Z')
        )
      )
    ).once();
  });

  it('testConvertHolidayToEventsWithFullStarts', async () => {
    const type = EventType.HOLIDAY;
    const user = mock(User);
    const holiday = mock(Holiday);
    when(holiday.getLeaveType()).thenReturn(HolidayLeaveType.PAID);
    when(holiday.getStartDate()).thenReturn('2020-12-24');
    when(holiday.isStartsAllDay()).thenReturn(true);
    when(holiday.getEndDate()).thenReturn('2021-01-04');
    when(holiday.isEndsAllDay()).thenReturn(false);
    when(holiday.getUser()).thenReturn(instance(user));

    when(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).thenReturn([
      new Date('2020-12-24'),
      new Date('2020-12-28'),
      new Date('2020-12-29'),
      new Date('2020-12-30'),
      new Date('2020-12-31'),
      new Date('2021-01-04')
    ]);

    holidayToEventsConverter.convert(instance(holiday));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();

    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2020-12-24T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2020-12-28T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2020-12-29T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2020-12-30T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 100, '2020-12-31T00:00:00.000Z')
        )
      )
    ).once();
    verify(
      eventRepository.save(
        deepEqual(
          new Event(type, instance(user), 50, '2021-01-04T00:00:00.000Z')
        )
      )
    ).once();
  });

  it('testEmptyDates', async () => {
    const user = mock(User);
    const holiday = mock(Holiday);
    when(holiday.getLeaveType()).thenReturn(HolidayLeaveType.PAID);
    when(holiday.getStartDate()).thenReturn('2020-12-24');
    when(holiday.isStartsAllDay()).thenReturn(true);
    when(holiday.getEndDate()).thenReturn('2021-01-04');
    when(holiday.isEndsAllDay()).thenReturn(false);
    when(holiday.getUser()).thenReturn(instance(user));

    when(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).thenReturn([]);

    holidayToEventsConverter.convert(instance(holiday));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();

    verify(eventRepository.save(anything())).never();
  });
});
