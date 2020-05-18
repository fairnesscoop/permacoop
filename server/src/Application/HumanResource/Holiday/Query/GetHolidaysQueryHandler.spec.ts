import {mock, instance, when, verify, anything, deepEqual} from 'ts-mockito';
import {GetCustomersQuery} from 'src/Application/Customer/Query/GetCustomersQuery';
import {CustomerRepository} from 'src/Infrastructure/Customer/Repository/CustomerRepository';
import {GetHolidaysQueryHandler} from './GetHolidaysQueryHandler';
import {HolidayRepository} from 'src/Infrastructure/HumanResource/Holiday/Repository/HolidayRepository';
import {DateUtilsAdapter} from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import {HolidayView} from '../View/HolidayView';
import {
  HolidayLeaveType,
  HolidayStatus,
  Holiday
} from 'src/Domain/HumanResource/Holiday/Holiday.entity';
import {UserSummaryView} from '../../User/View/UserSummaryView';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {Pagination} from 'src/Application/Common/Pagination';

describe('GetHolidaysQueryHandler', () => {
  let holidayRepository: HolidayRepository;
  let dateUtils: DateUtilsAdapter;
  let queryHandler: GetHolidaysQueryHandler;

  beforeEach(() => {
    holidayRepository = mock(HolidayRepository);
    dateUtils = mock(DateUtilsAdapter);
    queryHandler = new GetHolidaysQueryHandler(
      instance(holidayRepository),
      instance(dateUtils)
    );
  });

  it('testGetHolidays', async () => {
    const expectedResult = new Pagination<HolidayView>(
      [
        new HolidayView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          HolidayLeaveType.PAID,
          HolidayStatus.PENDING,
          '2020-05-05',
          '2020-05-15',
          6.5,
          new UserSummaryView(
            'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
            'Mathieu',
            'MARCHOIS'
          )
        ),
        new HolidayView(
          '252dacfc-1db9-4112-b1bc-37d28d50ced0',
          HolidayLeaveType.SPECIAL,
          HolidayStatus.REFUSED,
          '2020-05-01',
          '2020-05-15',
          8,
          new UserSummaryView(
            'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
            'Mathieu',
            'MARCHOIS'
          )
        )
      ],
      2
    );

    const user = mock(User);
    when(user.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');

    const holiday1 = mock(Holiday);
    when(holiday1.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(holiday1.getLeaveType()).thenReturn(HolidayLeaveType.PAID);
    when(holiday1.getStatus()).thenReturn(HolidayStatus.PENDING);
    when(holiday1.getStartDate()).thenReturn('2020-05-05');
    when(holiday1.isStartsAllDay()).thenReturn(false);
    when(holiday1.getEndDate()).thenReturn('2020-05-15');
    when(holiday1.isEndsAllDay()).thenReturn(true);
    when(holiday1.getUser()).thenReturn(instance(user));
    when(user.getLastName()).thenReturn('MARCHOIS');

    const holiday2 = mock(Holiday);
    when(holiday2.getId()).thenReturn('252dacfc-1db9-4112-b1bc-37d28d50ced0');
    when(holiday2.getLeaveType()).thenReturn(HolidayLeaveType.SPECIAL);
    when(holiday2.getStatus()).thenReturn(HolidayStatus.REFUSED);
    when(holiday2.getStartDate()).thenReturn('2020-05-01');
    when(holiday2.isStartsAllDay()).thenReturn(false);
    when(holiday2.getEndDate()).thenReturn('2020-05-15');
    when(holiday2.isEndsAllDay()).thenReturn(false);
    when(holiday2.getUser()).thenReturn(instance(user));

    when(holidayRepository.findHolidays(1)).thenResolve([
      [instance(holiday1), instance(holiday2)],
      2
    ]);

    when(
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-05-05T00:00:00.000Z')),
        deepEqual(new Date('2020-05-15T00:00:00.000Z'))
      )
    ).thenReturn([
      new Date('2020-05-05T00:00:00.000Z'),
      new Date('2020-05-06T00:00:00.000Z'),
      new Date('2020-05-07T00:00:00.000Z'),
      new Date('2020-05-11T00:00:00.000Z'),
      new Date('2020-05-12T00:00:00.000Z'),
      new Date('2020-05-13T00:00:00.000Z'),
      new Date('2020-05-14T00:00:00.000Z')
    ]);

    when(
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-05-01T00:00:00.000Z')),
        deepEqual(new Date('2020-05-15T00:00:00.000Z'))
      )
    ).thenReturn([
      new Date('2020-05-01T00:00:00.000Z'),
      new Date('2020-05-04T00:00:00.000Z'),
      new Date('2020-05-05T00:00:00.000Z'),
      new Date('2020-05-06T00:00:00.000Z'),
      new Date('2020-05-07T00:00:00.000Z'),
      new Date('2020-05-11T00:00:00.000Z'),
      new Date('2020-05-12T00:00:00.000Z'),
      new Date('2020-05-13T00:00:00.000Z'),
      new Date('2020-05-14T00:00:00.000Z')
    ]);

    expect(await queryHandler.execute(new GetCustomersQuery(1))).toMatchObject(
      expectedResult
    );

    verify(
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-05-05T00:00:00.000Z')),
        deepEqual(new Date('2020-05-15T00:00:00.000Z'))
      )
    ).once();
    verify(
      dateUtils.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-05-01T00:00:00.000Z')),
        deepEqual(new Date('2020-05-15T00:00:00.000Z'))
      )
    ).once();
    verify(holidayRepository.findHolidays(1)).once();
  });
});
