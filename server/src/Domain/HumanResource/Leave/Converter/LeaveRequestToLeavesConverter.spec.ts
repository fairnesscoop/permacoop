import { instance, mock, when, verify, deepEqual, anything } from 'ts-mockito';
import { LeaveRequestToLeavesConverter } from './LeaveRequestToLeavesConverter';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRepository';
import { LeaveRequest, Type } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';

describe('LeaveRequestToLeavesConverter', () => {
  let leaveRepository: LeaveRepository;
  let dateUtilsAdapter: DateUtilsAdapter;
  let leaveRequestToLeavesConverter: LeaveRequestToLeavesConverter;

  beforeEach(() => {
    leaveRepository = mock(LeaveRepository);
    dateUtilsAdapter = mock(DateUtilsAdapter);
    leaveRequestToLeavesConverter = new LeaveRequestToLeavesConverter(
      instance(leaveRepository),
      instance(dateUtilsAdapter)
    );
  });

  it('testConvertLeaveToLeavesWithFullEnds', async () => {
    const user = mock(User);
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.MEDICAL);
    when(leaveRequest.getStartDate()).thenReturn('2020-12-24');
    when(leaveRequest.isStartsAllDay()).thenReturn(false);
    when(leaveRequest.getEndDate()).thenReturn('2021-01-04');
    when(leaveRequest.isEndsAllDay()).thenReturn(true);
    when(leaveRequest.getUser()).thenReturn(instance(user));

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

    leaveRequestToLeavesConverter.convert(instance(leaveRequest));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();

    verify(
      leaveRepository.save(deepEqual([
        new Leave(instance(leaveRequest), 50, '2020-12-24T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 100, '2020-12-28T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 100, '2020-12-29T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 100, '2020-12-30T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 100, '2020-12-31T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 100, '2021-01-04T00:00:00.000Z'),
      ]))
    ).once();
  });

  it('testConvertLeaveToLeavesWithFullStarts', async () => {
    const user = mock(User);
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.PAID);
    when(leaveRequest.getStartDate()).thenReturn('2020-12-24');
    when(leaveRequest.isStartsAllDay()).thenReturn(true);
    when(leaveRequest.getEndDate()).thenReturn('2021-01-04');
    when(leaveRequest.isEndsAllDay()).thenReturn(false);
    when(leaveRequest.getUser()).thenReturn(instance(user));

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

    leaveRequestToLeavesConverter.convert(instance(leaveRequest));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();

    verify(
      leaveRepository.save(deepEqual([
        new Leave(instance(leaveRequest), 100, '2020-12-24T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 100, '2020-12-28T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 100, '2020-12-29T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 100, '2020-12-30T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 100, '2020-12-31T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 50, '2021-01-04T00:00:00.000Z'),
      ]))
    ).once();
  });

  it('testEmptyDates', async () => {
    const user = mock(User);
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.PAID);
    when(leaveRequest.getStartDate()).thenReturn('2020-12-24');
    when(leaveRequest.isStartsAllDay()).thenReturn(true);
    when(leaveRequest.getEndDate()).thenReturn('2021-01-04');
    when(leaveRequest.isEndsAllDay()).thenReturn(false);
    when(leaveRequest.getUser()).thenReturn(instance(user));

    when(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).thenReturn([]);

    leaveRequestToLeavesConverter.convert(instance(leaveRequest));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();

    verify(leaveRepository.save(anything())).never();
  });
});
