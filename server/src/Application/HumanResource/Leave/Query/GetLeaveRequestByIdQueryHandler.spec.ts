import { mock, instance, when, verify, deepEqual } from 'ts-mockito';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { LeaveRequestView } from '../View/LeaveRequestView';
import {
  Type,
  Status,
  LeaveRequest
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { UserSummaryView } from '../../User/View/UserSummaryView';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { GetLeaveRequestByIdQueryHandler } from './GetLeaveRequestByIdQueryHandler';
import { GetLeaveRequestByIdQuery } from './GetLeaveRequestByIdQuery';

describe('GetLeaveRequestByIdQueryHandler', () => {
  let leaveRequestRepository: LeaveRequestRepository;
  let dateUtils: DateUtilsAdapter;
  let queryHandler: GetLeaveRequestByIdQueryHandler;

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    dateUtils = mock(DateUtilsAdapter);
    queryHandler = new GetLeaveRequestByIdQueryHandler(
      instance(leaveRequestRepository),
      instance(dateUtils)
    );
  });

  it('testGetLeaveRequestById', async () => {
    const expectedResult = new LeaveRequestView(
      '204522d3-f077-4d21-b3ee-6e0d742fca44',
      Type.PAID,
      Status.ACCEPTED,
      '2020-05-05',
      '2020-05-15',
      7.5,
      'Country vacation',
      new UserSummaryView(
        '54bb15ad-56da-45f8-b594-3ca43f13d4c0',
        'Alan',
        'TURING'
      ),
      new UserSummaryView(
        '697f9cf3-ec97-492a-91db-8cc4c47daab0',
        'Ada',
        'LOVELACE'
      ),
      'Go go go'
    );

    const user = mock(User);
    when(user.getId()).thenReturn('54bb15ad-56da-45f8-b594-3ca43f13d4c0');
    when(user.getFirstName()).thenReturn('Alan');
    when(user.getLastName()).thenReturn('TURING');

    const moderator = mock(User);
    when(moderator.getId()).thenReturn('697f9cf3-ec97-492a-91db-8cc4c47daab0');
    when(moderator.getFirstName()).thenReturn('Ada');
    when(moderator.getLastName()).thenReturn('LOVELACE');

    const leave = mock(LeaveRequest);
    when(leave.getId()).thenReturn('204522d3-f077-4d21-b3ee-6e0d742fca44');
    when(leave.getType()).thenReturn(Type.PAID);
    when(leave.getStatus()).thenReturn(Status.ACCEPTED);
    when(leave.getStartDate()).thenReturn('2020-05-05');
    when(leave.isStartsAllDay()).thenReturn(false);
    when(leave.getEndDate()).thenReturn('2020-05-15');
    when(leave.isEndsAllDay()).thenReturn(true);
    when(leave.getComment()).thenReturn('Country vacation');
    when(leave.getUser()).thenReturn(instance(user));
    when(leave.getModerator()).thenReturn(instance(moderator));
    when(leave.getModerationComment()).thenReturn('Go go go');

    when(leaveRequestRepository.findOneById('204522d3-f077-4d21-b3ee-6e0d742fca44')).thenResolve(instance(leave));

    when(
      dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-15', true)
    ).thenReturn(7.5);

    expect(await queryHandler.execute(new GetLeaveRequestByIdQuery('204522d3-f077-4d21-b3ee-6e0d742fca44'))).toMatchObject(
      expectedResult
    );

    verify(dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-15', true)).once();
    verify(leaveRequestRepository.findOneById('204522d3-f077-4d21-b3ee-6e0d742fca44')).once();
  });
});
