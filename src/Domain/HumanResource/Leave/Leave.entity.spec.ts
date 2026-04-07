import { instance, mock, when } from 'ts-mockito';
import { Leave } from './Leave.entity';
import { LeaveRequest, Type } from './LeaveRequest.entity';

describe('Leave.entity', () => {
  it('testGetters', () => {
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.PAID);

    const leave = new Leave(instance(leaveRequest), 100, '2019-01-06');

    expect(leave.getId()).toBe(undefined);
    expect(leave.getLeaveRequest()).toBe(instance(leaveRequest));
    expect(leave.getDate()).toBe('2019-01-06');
    expect(leave.getTime()).toBe(100);
    expect(leave.getType()).toBe('leave_paid');
  });

  it('testGetTypeForViewerShowsMenstrualForOwner', () => {
    const ownerId = '550e8400-e29b-41d4-a716-446655440000';
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.MENSTRUAL);
    when(leaveRequest.getUserId()).thenReturn(ownerId);

    const leave = new Leave(instance(leaveRequest), 840, '2019-01-06');

    // Owner should see the true menstrual type
    expect(leave.getTypeForViewer(ownerId)).toBe('leave_menstrual');
  });

  it('testGetTypeForViewerMasksMenstrualForOthers', () => {
    const ownerId = '550e8400-e29b-41d4-a716-446655440000';
    const otherId = '660e8400-e29b-41d4-a716-446655440001';
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.MENSTRUAL);
    when(leaveRequest.getUserId()).thenReturn(ownerId);

    const leave = new Leave(instance(leaveRequest), 840, '2019-01-06');

    // Other users should see it as paid leave
    expect(leave.getTypeForViewer(otherId)).toBe('leave_paid');
  });

  it('testGetTypeForViewerShowsOtherTypesForEveryone', () => {
    const ownerId = '550e8400-e29b-41d4-a716-446655440000';
    const otherId = '660e8400-e29b-41d4-a716-446655440001';
    const leaveRequest = mock(LeaveRequest);
    when(leaveRequest.getType()).thenReturn(Type.PAID);
    when(leaveRequest.getUserId()).thenReturn(ownerId);

    const leave = new Leave(instance(leaveRequest), 420, '2019-01-06');

    // Everyone should see paid leave
    expect(leave.getTypeForViewer(ownerId)).toBe('leave_paid');
    expect(leave.getTypeForViewer(otherId)).toBe('leave_paid');
  });
});
