import { instance, mock } from 'ts-mockito';
import { LeaveRequest, Status, Type } from './LeaveRequest.entity';
import { User} from '../User/User.entity';

describe('LeaveRequest.entity', () => {
  it('testGetters', () => {
    const user = mock(User);

    const leaverequest = new LeaveRequest(
      instance(user),
      Type.PAID,
      '2019-01-04',
      true,
      '2019-01-06',
      true,
      'H&M wedding'
    );

    expect(leaverequest.getId()).toBe(undefined);
    expect(leaverequest.getUser()).toBe(instance(user));
    expect(leaverequest.getStartDate()).toBe('2019-01-04');
    expect(leaverequest.getEndDate()).toBe('2019-01-06');
    expect(leaverequest.getStatus()).toBe(Status.PENDING);
    expect(leaverequest.getType()).toBe(Type.PAID);
    expect(leaverequest.getComment()).toBe('H&M wedding');
    expect(leaverequest.isStartsAllDay()).toBe(true);
    expect(leaverequest.isEndsAllDay()).toBe(true);
  });

  it('testRefuse', () => {
    const user = mock(User);
    const user2 = mock(User);

    const leaverequest = new LeaveRequest(
      instance(user),
      Type.PAID,
      '2019-01-04',
      true,
      '2019-01-06',
      true,
      'H&M wedding'
    );
    leaverequest.refuse(instance(user2), '2020-01-01', 'Too much leaverequests');

    expect(leaverequest.getId()).toBe(undefined);
    expect(leaverequest.getUser()).toBe(instance(user));
    expect(leaverequest.getStartDate()).toBe('2019-01-04');
    expect(leaverequest.getEndDate()).toBe('2019-01-06');
    expect(leaverequest.getStatus()).toBe(Status.REFUSED);
    expect(leaverequest.getType()).toBe(Type.PAID);
    expect(leaverequest.getComment()).toBe('H&M wedding');
    expect(leaverequest.isStartsAllDay()).toBe(true);
    expect(leaverequest.isEndsAllDay()).toBe(true);
    expect(leaverequest.getModerator()).toBe(instance(user2));
    expect(leaverequest.getModerateAt()).toBe('2020-01-01');
    expect(leaverequest.getModerationComment()).toBe('Too much leaverequests');
  });

  it('testAccept', () => {
    const user = mock(User);
    const user2 = mock(User);

    const leaverequest = new LeaveRequest(
      instance(user),
      Type.PAID,
      '2019-01-04',
      true,
      '2019-01-06',
      true,
      'H&M wedding'
    );
    leaverequest.accept(instance(user2), '2020-01-01', 'Enjoy');

    expect(leaverequest.getId()).toBe(undefined);
    expect(leaverequest.getUser()).toBe(instance(user));
    expect(leaverequest.getStartDate()).toBe('2019-01-04');
    expect(leaverequest.getEndDate()).toBe('2019-01-06');
    expect(leaverequest.getStatus()).toBe(Status.ACCEPTED);
    expect(leaverequest.getType()).toBe(Type.PAID);
    expect(leaverequest.getComment()).toBe('H&M wedding');
    expect(leaverequest.isStartsAllDay()).toBe(true);
    expect(leaverequest.isEndsAllDay()).toBe(true);
    expect(leaverequest.getModerator()).toBe(instance(user2));
    expect(leaverequest.getModerateAt()).toBe('2020-01-01');
    expect(leaverequest.getModerationComment()).toBe('Enjoy');
  });
});
