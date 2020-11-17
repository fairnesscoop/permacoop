import { instance, mock, when, verify, deepEqual, anything } from 'ts-mockito';
import { LeaveRequestToLeavesConverter } from './LeaveRequestToLeavesConverter';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRepository';
import { LeaveRequest, Type } from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { CooperativeRepository } from 'src/Infrastructure/Settings/Repository/CooperativeRepository';
import { CooperativeNotFoundException } from 'src/Domain/Settings/Repository/CooperativeNotFoundException';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';

describe('LeaveRequestToLeavesConverter', () => {
  let leaveRepository: LeaveRepository;
  let cooperativeRepository: CooperativeRepository;
  let dateUtilsAdapter: DateUtilsAdapter;
  let leaveRequestToLeavesConverter: LeaveRequestToLeavesConverter;

  const user = mock(User);
  const cooperative = mock(Cooperative);

  beforeEach(() => {
    leaveRepository = mock(LeaveRepository);
    cooperativeRepository = mock(CooperativeRepository);
    dateUtilsAdapter = mock(DateUtilsAdapter);
    leaveRequestToLeavesConverter = new LeaveRequestToLeavesConverter(
      instance(leaveRepository),
      instance(cooperativeRepository),
      instance(dateUtilsAdapter)
    );
  });

  it('testConvertLeaveToLeavesWithFullEnds', async () => {
    when(cooperative.getDayDuration()).thenReturn(420);

    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.MEDICAL);
    when(leaveRequest.getStartDate()).thenReturn('2020-12-24');
    when(leaveRequest.isStartsAllDay()).thenReturn(false);
    when(leaveRequest.getEndDate()).thenReturn('2021-01-04');
    when(leaveRequest.isEndsAllDay()).thenReturn(true);
    when(leaveRequest.getUser()).thenReturn(instance(user));

    when(cooperativeRepository.find()).thenResolve(instance(cooperative));
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

    await leaveRequestToLeavesConverter.convert(instance(leaveRequest));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();
    verify(
      leaveRepository.save(deepEqual([
        new Leave(instance(leaveRequest), 210, '2020-12-24T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 420, '2020-12-28T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 420, '2020-12-29T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 420, '2020-12-30T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 420, '2020-12-31T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 420, '2021-01-04T00:00:00.000Z'),
      ]))
    ).once();
    verify(cooperativeRepository.find()).once();
  });

  it('testConvertLeaveToLeavesWithFullStarts', async () => {
    when(cooperative.getDayDuration()).thenReturn(420);

    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.PAID);
    when(leaveRequest.getStartDate()).thenReturn('2020-12-24');
    when(leaveRequest.isStartsAllDay()).thenReturn(true);
    when(leaveRequest.getEndDate()).thenReturn('2021-01-04');
    when(leaveRequest.isEndsAllDay()).thenReturn(false);
    when(leaveRequest.getUser()).thenReturn(instance(user));
    when(cooperativeRepository.find()).thenResolve(instance(cooperative));
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

    await leaveRequestToLeavesConverter.convert(instance(leaveRequest));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();
    verify(cooperativeRepository.find()).once();
    verify(
      leaveRepository.save(deepEqual([
        new Leave(instance(leaveRequest), 420, '2020-12-24T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 420, '2020-12-28T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 420, '2020-12-29T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 420, '2020-12-30T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 420, '2020-12-31T00:00:00.000Z'),
        new Leave(instance(leaveRequest), 210, '2021-01-04T00:00:00.000Z'),
      ]))
    ).once();
  });

  it('testEmptyDates', async () => {
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

    await leaveRequestToLeavesConverter.convert(instance(leaveRequest));

    verify(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).once();
    verify(cooperativeRepository.find()).never();
    verify(leaveRepository.save(anything())).never();
  });

  it('testCooperativeNotFound', async () => {
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.PAID);
    when(leaveRequest.getStartDate()).thenReturn('2020-12-24');
    when(leaveRequest.isStartsAllDay()).thenReturn(true);
    when(leaveRequest.getEndDate()).thenReturn('2021-01-04');
    when(leaveRequest.isEndsAllDay()).thenReturn(false);
    when(leaveRequest.getUser()).thenReturn(instance(user));

    when(cooperativeRepository.find()).thenResolve(null);
    when(
      dateUtilsAdapter.getWorkedDaysDuringAPeriod(
        deepEqual(new Date('2020-12-24')),
        deepEqual(new Date('2021-01-04'))
      )
    ).thenReturn([]);

    try {
      await leaveRequestToLeavesConverter.convert(instance(leaveRequest));
    } catch (e) {
      expect(e).toBeInstanceOf(CooperativeNotFoundException);
      expect(e.message).toBe('settings.errors.cooperative_not_found');
      verify(cooperativeRepository.find()).once();
      verify(
        dateUtilsAdapter.getWorkedDaysDuringAPeriod(
          deepEqual(new Date('2020-12-24')),
          deepEqual(new Date('2021-01-04'))
        )
      ).once();
      verify(leaveRepository.save(anything())).never();
    }
  });
});
