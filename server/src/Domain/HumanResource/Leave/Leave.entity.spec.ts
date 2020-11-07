import { instance, mock, when } from 'ts-mockito';
import { Leave } from './Leave.entity';
import { LeaveRequest, Type } from './LeaveRequest.entity';

describe('Leave.entity', () => {
  it('testGetters', () => {
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.PAID);

    const leave = new Leave(
      instance(leaveRequest),
      100,
      '2019-01-06'
    );

    expect(leave.getId()).toBe(undefined);
    expect(leave.getLeaveRequest()).toBe(instance(leaveRequest));
    expect(leave.getDate()).toBe('2019-01-06');
    expect(leave.getTime()).toBe(100);
    expect(leave.getType()).toBe('leave_paid');
  });
});
