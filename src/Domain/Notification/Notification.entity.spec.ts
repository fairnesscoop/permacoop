import { mock, when } from 'ts-mockito';
import { LeaveRequest } from '../HumanResource/Leave/LeaveRequest.entity';
import { Notification, NotificationType } from './Notification.entity';

describe('Notification.entity', () => {
  it('testGetters', () => {
    const leaveRequest = mock(LeaveRequest);

    const notification = new Notification(
      NotificationType.POST,
      'Notification message',
      'd6bd60c1-926a-46ba-bece-bdd80582380a',
      leaveRequest
    );

    expect(notification.getId()).toBe(undefined);
    expect(notification.getType()).toBe(NotificationType.POST);
    expect(notification.getMessage()).toBe('Notification message');
    expect(notification.getResourceId()).toBe(
      'd6bd60c1-926a-46ba-bece-bdd80582380a'
    );
    expect(notification.getLeaveRequest()).toBe(leaveRequest);
    expect(notification.getCreatedAt()).toBe(undefined);
  });
});
