import { instance, mock, when } from 'ts-mockito';
import { LeaveRequest, Type } from './LeaveRequest.entity';
import { UserLeavesCollection } from './UserLeavesCollection';

describe('UserLeavesCollection', () => {
  it('testDistributeLeavesByType', () => {
    const paidLeave = mock(LeaveRequest);
    when(paidLeave.getType()).thenReturn(Type.PAID);
    const unpaidLeave = mock(LeaveRequest);
    when(unpaidLeave.getType()).thenReturn(Type.UNPAID);
    const specialLeave = mock(LeaveRequest);
    when(specialLeave.getType()).thenReturn(Type.SPECIAL);
    const medicalLeave = mock(LeaveRequest);
    when(medicalLeave.getType()).thenReturn(Type.MEDICAL);
    const postponedWorkedFreeDayLeave = mock(LeaveRequest);
    when(postponedWorkedFreeDayLeave.getType()).thenReturn(
      Type.POSTPONED_WORKED_FREE_DAY
    );
    const relocationLeave = mock(LeaveRequest);
    when(relocationLeave.getType()).thenReturn(Type.RELOCATION);

    const userLeaves = new UserLeavesCollection([
      instance(paidLeave),
      instance(unpaidLeave),
      instance(specialLeave),
      instance(medicalLeave),
      instance(postponedWorkedFreeDayLeave),
      instance(relocationLeave)
    ]);
    expect(userLeaves.paid[0].getType()).toBe(Type.PAID);
    expect(userLeaves.unpaid[0].getType()).toBe(Type.UNPAID);
    expect(userLeaves.special[0].getType()).toBe(Type.SPECIAL);
    expect(userLeaves.medical[0].getType()).toBe(Type.MEDICAL);
    expect(userLeaves.postponedWorkedFreeDay[0].getType()).toBe(
      Type.POSTPONED_WORKED_FREE_DAY
    );
    expect(userLeaves.relocation[0].getType()).toBe(Type.RELOCATION);
  });
});
