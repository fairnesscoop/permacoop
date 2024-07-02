import { LeaveRequestNotFoundException } from 'src/Domain/HumanResource/Leave/Exception/LeaveRequestNotFoundException';
import {
  LeaveRequest,
  Status,
  Type
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { instance, mock, verify, when } from 'ts-mockito';
import { UserSummaryView } from '../../User/View/UserSummaryView';
import { LeaveRequestDetailView } from '../View/LeaveRequestDetailView';
import { GetLeaveRequestByIdQuery } from './GetLeaveRequestByIdQuery';
import { GetLeaveRequestByIdQueryHandler } from './GetLeaveRequestByIdQueryHandler';
import { CanLeaveRequestBeCancelled } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeCancelled';

describe('GetLeaveRequestByIdQueryHandler', () => {
  let leaveRequestRepository: LeaveRequestRepository;
  let dateUtils: DateUtilsAdapter;
  let canLeaveRequestBeCancelled: CanLeaveRequestBeCancelled;
  let queryHandler: GetLeaveRequestByIdQueryHandler;

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    dateUtils = mock(DateUtilsAdapter);
    canLeaveRequestBeCancelled = mock(CanLeaveRequestBeCancelled);
    queryHandler = new GetLeaveRequestByIdQueryHandler(
      instance(leaveRequestRepository),
      instance(dateUtils),
      instance(canLeaveRequestBeCancelled)
    );
  });

  it('testGetLeaveRequestById', async () => {
    const expectedResult = new LeaveRequestDetailView(
      '204522d3-f077-4d21-b3ee-6e0d742fca44',
      Type.PAID,
      Status.ACCEPTED,
      '2020-05-05',
      false,
      '2020-05-15',
      true,
      7.5,
      false,
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
      '2020-05-01',
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
    when(leave.getModerateAt()).thenReturn('2020-05-01');
    when(leave.getModerationComment()).thenReturn('Go go go');

    when(
      canLeaveRequestBeCancelled.isSatisfiedBy(instance(user), instance(leave))
    ).thenReturn(false);

    when(
      leaveRequestRepository.findOneById('204522d3-f077-4d21-b3ee-6e0d742fca44')
    ).thenResolve(instance(leave));

    when(
      dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-15', true)
    ).thenReturn(7.5);

    expect(
      await queryHandler.execute(
        new GetLeaveRequestByIdQuery(
          '204522d3-f077-4d21-b3ee-6e0d742fca44',
          instance(user)
        )
      )
    ).toMatchObject(expectedResult);

    verify(
      dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-15', true)
    ).once();
    verify(
      leaveRequestRepository.findOneById('204522d3-f077-4d21-b3ee-6e0d742fca44')
    ).once();
  });

  it('testLeaveNotFound', async () => {
    when(
      leaveRequestRepository.findOneById('204522d3-f077-4d21-b3ee-6e0d742fca44')
    ).thenResolve(null);

    const user = mock(User);

    try {
      await queryHandler.execute(
        new GetLeaveRequestByIdQuery(
          '204522d3-f077-4d21-b3ee-6e0d742fca44',
          user
        )
      );
    } catch (e) {
      expect(e).toBeInstanceOf(LeaveRequestNotFoundException);
      expect(e.message).toBe(
        'human_resources.leaves.requests.errors.not_found'
      );
    }
    verify(
      leaveRequestRepository.findOneById('204522d3-f077-4d21-b3ee-6e0d742fca44')
    ).once();
  });

  it('testLeaveWithoutModerator', async () => {
    const expectedResult = new LeaveRequestDetailView(
      'a3753b9c-b711-4e0e-a535-e473161bd612',
      Type.PAID,
      Status.ACCEPTED,
      '2020-05-05',
      false,
      '2020-05-15',
      true,
      7.5,
      false,
      'Country vacation',
      new UserSummaryView(
        '2402455a-4dc1-47c9-89a4-f9b859f02f5c',
        'John',
        'DOE'
      ),
      null,
      null,
      null
    );

    const user = mock(User);
    when(user.getId()).thenReturn('2402455a-4dc1-47c9-89a4-f9b859f02f5c');
    when(user.getFirstName()).thenReturn('John');
    when(user.getLastName()).thenReturn('DOE');

    const leave = mock(LeaveRequest);
    when(leave.getId()).thenReturn('a3753b9c-b711-4e0e-a535-e473161bd612');
    when(leave.getType()).thenReturn(Type.PAID);
    when(leave.getStatus()).thenReturn(Status.ACCEPTED);
    when(leave.getStartDate()).thenReturn('2020-05-05');
    when(leave.isStartsAllDay()).thenReturn(false);
    when(leave.getEndDate()).thenReturn('2020-05-15');
    when(leave.isEndsAllDay()).thenReturn(true);
    when(leave.getComment()).thenReturn('Country vacation');
    when(leave.getUser()).thenReturn(instance(user));
    when(leave.getModerator()).thenReturn(null);
    when(leave.getModerationComment()).thenReturn(null);

    when(
      canLeaveRequestBeCancelled.isSatisfiedBy(instance(user), instance(leave))
    ).thenReturn(false);

    when(
      leaveRequestRepository.findOneById('a3753b9c-b711-4e0e-a535-e473161bd612')
    ).thenResolve(instance(leave));

    when(
      dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-15', true)
    ).thenReturn(7.5);

    expect(
      await queryHandler.execute(
        new GetLeaveRequestByIdQuery(
          'a3753b9c-b711-4e0e-a535-e473161bd612',
          instance(user)
        )
      )
    ).toMatchObject(expectedResult);

    verify(
      dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-15', true)
    ).once();
    verify(
      leaveRequestRepository.findOneById('a3753b9c-b711-4e0e-a535-e473161bd612')
    ).once();
  });
});
