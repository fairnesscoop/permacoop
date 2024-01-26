import { LeaveRequest } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { instance, mock, verify, when, deepEqual } from 'ts-mockito';
import { GetLeavesCalendarQuery } from './GetLeavesCalendarQuery';
import { GetLeavesCalendarQueryHandler } from './GetLeavesCalendarQueryHandler';

describe('GetLeavesCalendarQueryHandler', () => {
  let dateUtilsAdapter: DateUtilsAdapter;
  let leaveRequestRepository: LeaveRequestRepository;
  let queryHandler: GetLeavesCalendarQueryHandler;

  beforeEach(() => {
    dateUtilsAdapter = mock(DateUtilsAdapter);
    leaveRequestRepository = mock(LeaveRequestRepository);

    queryHandler = new GetLeavesCalendarQueryHandler(
      instance(dateUtilsAdapter),
      instance(leaveRequestRepository)
    );
  });

  it('testGetLeavesCalendar', async () => {
    const user = mock(User);
    when(user.getFullName()).thenReturn('Jane Dean');

    const uuid = '3008a48d-99db-44c4-bf3a-75e95c47bd1a';
    const startDate = new Date(
      'Thu Nov 03 2022 12:00:00 GMT+0100 (Central European Standard Time)'
    );
    const endDate = new Date(
      'Sat Nov 05 2022 12:00:00 GMT+0100 (Central European Standard Time)'
    );
    const eventEndDate = new Date(
      'Sat Nov 06 2022 12:00:00 GMT+0100 (Central European Standard Time)'
    );

    when(dateUtilsAdapter.addDaysToDate(deepEqual(endDate), 1)).thenReturn(
      eventEndDate
    );
    when(dateUtilsAdapter.format(deepEqual(startDate), 'yyyyMMdd')).thenReturn(
      '20221103'
    );
    when(
      dateUtilsAdapter.format(deepEqual(eventEndDate), 'yyyyMMdd')
    ).thenReturn('20221106');

    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getId()).thenReturn(uuid);
    when(leaveRequest.getStartDate()).thenReturn(startDate.toISOString());
    when(leaveRequest.getEndDate()).thenReturn(endDate.toISOString());
    when(leaveRequest.getUser()).thenReturn(instance(user));

    when(leaveRequestRepository.findAcceptedLeaveRequests()).thenResolve([
      instance(leaveRequest)
    ]);

    const result = await queryHandler.execute(new GetLeavesCalendarQuery());

    const lines = result.split('\r\n');

    expect(lines.shift()).toBe('BEGIN:VCALENDAR');
    expect(lines.shift()).toBe('VERSION:2.0');
    expect(lines.shift()).toBe('PRODID:-//Fairness//Permacoop//FR');
    expect(lines.shift()).toBe('CALSCALE:GREGORIAN');
    expect(lines.shift()).toBe('X-WR-CALNAME:Congés Fairness');
    expect(lines.shift()).toBe('NAME:Congés Fairness');
    expect(lines.shift()).toBe('X-APPLE-CALENDAR-COLOR:#00CA9E');

    expect(lines.shift()).toBe('BEGIN:VEVENT');
    expect(lines.shift()).toBe('UID:3008a48d-99db-44c4-bf3a-75e95c47bd1a');
    expect(lines.shift()).toBe('DTSTART;VALUE=DATE:20221103');
    expect(lines.shift()).toBe('DTEND;VALUE=DATE:20221106');
    expect(lines.shift()).toBe('SUMMARY:Congés Jane Dean');
    expect(lines.shift()).toBe('END:VEVENT');

    expect(lines.shift()).toBe('END:VCALENDAR');

    expect(lines).toHaveLength(0);

    verify(leaveRequestRepository.findAcceptedLeaveRequests()).once();
  });
});
