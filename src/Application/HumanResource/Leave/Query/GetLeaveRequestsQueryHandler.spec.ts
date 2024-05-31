import { mock, instance, when, verify } from 'ts-mockito';
import { GetLeaveRequestsQueryHandler } from './GetLeaveRequestsQueryHandler';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { LeaveRequestView } from '../View/LeaveRequestView';
import {
  Type,
  Status,
  LeaveRequest
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { UserSummaryView } from '../../User/View/UserSummaryView';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { Pagination } from 'src/Application/Common/Pagination';
import { LeaveRequestRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRequestRepository';
import { GetLeaveRequestsQuery } from './GetLeaveRequestsQuery';
import { UserRepository } from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import { CanLeaveRequestBeCancelled } from 'src/Domain/HumanResource/Leave/Specification/CanLeaveRequestBeCancelled';

describe('GetLeaveRequestsQueryHandler', () => {
  let leaveRequestRepository: LeaveRequestRepository;
  let userRepository: UserRepository;
  let dateUtils: DateUtilsAdapter;
  let canLeaveRequestBeCancelled: CanLeaveRequestBeCancelled;
  let queryHandler: GetLeaveRequestsQueryHandler;

  beforeEach(() => {
    leaveRequestRepository = mock(LeaveRequestRepository);
    userRepository = mock(UserRepository);
    dateUtils = mock(DateUtilsAdapter);
    canLeaveRequestBeCancelled = mock(CanLeaveRequestBeCancelled);
    queryHandler = new GetLeaveRequestsQueryHandler(
      instance(leaveRequestRepository),
      instance(userRepository),
      instance(dateUtils),
      instance(canLeaveRequestBeCancelled)
    );
  });

  it('testGetLeaveRequests', async () => {
    const expectedResult = new Pagination<LeaveRequestView>(
      [
        new LeaveRequestView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          Type.PAID,
          Status.PENDING,
          '2020-05-05',
          '2020-05-15',
          6.5,
          false,
          null,
          new UserSummaryView(
            'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
            'Mathieu',
            'MARCHOIS'
          )
        ),
        new LeaveRequestView(
          '252dacfc-1db9-4112-b1bc-37d28d50ced0',
          Type.SPECIAL,
          Status.REFUSED,
          '2020-05-01',
          '2020-05-15',
          8,
          false,
          null,
          new UserSummaryView(
            'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
            'Mathieu',
            'MARCHOIS'
          )
        ),
        new LeaveRequestView(
          'd54f15d6-1a1d-47e8-8672-9f46018f9960',
          Type.PAID,
          Status.ACCEPTED,
          '2020-05-08',
          '2020-05-15',
          4,
          true,
          null,
          new UserSummaryView(
            'abcffaa9-cdc5-40fa-a71c-0e93eadd61fd',
            'John',
            'DOE'
          )
        )
      ],
      3
    );

    const user = mock(User);
    when(user.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');

    const loggedUser = mock(User);
    when(loggedUser.getId()).thenReturn('abcffaa9-cdc5-40fa-a71c-0e93eadd61fd');
    when(loggedUser.getFirstName()).thenReturn('John');
    when(loggedUser.getLastName()).thenReturn('DOE');

    const leave1 = mock(LeaveRequest);
    when(leave1.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(leave1.getType()).thenReturn(Type.PAID);
    when(leave1.getStatus()).thenReturn(Status.PENDING);
    when(leave1.getStartDate()).thenReturn('2020-05-05');
    when(leave1.isStartsAllDay()).thenReturn(false);
    when(leave1.getEndDate()).thenReturn('2020-05-15');
    when(leave1.isEndsAllDay()).thenReturn(true);
    when(leave1.getUser()).thenReturn(instance(user));
    when(user.getLastName()).thenReturn('MARCHOIS');

    when(
      canLeaveRequestBeCancelled.isSatisfiedBy(
        instance(loggedUser),
        instance(leave1)
      )
    ).thenReturn(false);

    const leave2 = mock(LeaveRequest);
    when(leave2.getId()).thenReturn('252dacfc-1db9-4112-b1bc-37d28d50ced0');
    when(leave2.getType()).thenReturn(Type.SPECIAL);
    when(leave2.getStatus()).thenReturn(Status.REFUSED);
    when(leave2.getStartDate()).thenReturn('2020-05-01');
    when(leave2.isStartsAllDay()).thenReturn(false);
    when(leave2.getEndDate()).thenReturn('2020-05-15');
    when(leave2.isEndsAllDay()).thenReturn(false);
    when(leave2.getUser()).thenReturn(instance(user));

    when(
      canLeaveRequestBeCancelled.isSatisfiedBy(
        instance(loggedUser),
        instance(leave2)
      )
    ).thenReturn(false);

    const leave3 = mock(LeaveRequest);
    when(leave3.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(leave3.getType()).thenReturn(Type.PAID);
    when(leave3.getStatus()).thenReturn(Status.ACCEPTED);
    when(leave3.getStartDate()).thenReturn('2020-05-08');
    when(leave3.isStartsAllDay()).thenReturn(true);
    when(leave3.getEndDate()).thenReturn('2020-05-15');
    when(leave3.isEndsAllDay()).thenReturn(true);
    when(leave3.getUser()).thenReturn(instance(loggedUser));

    when(
      canLeaveRequestBeCancelled.isSatisfiedBy(
        instance(loggedUser),
        instance(leave3)
      )
    ).thenReturn(true);

    when(leaveRequestRepository.findLeaveRequests(1, null)).thenResolve([
      [instance(leave1), instance(leave2), instance(leave3)],
      3
    ]);

    when(
      userRepository.findOneById('abcffaa9-cdc5-40fa-a71c-0e93eadd61fd')
    ).thenResolve(instance(loggedUser));

    when(
      dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-15', true)
    ).thenReturn(6.5);

    when(
      dateUtils.getLeaveDuration('2020-05-01', false, '2020-05-15', false)
    ).thenReturn(8);

    when(
      dateUtils.getLeaveDuration('2020-05-08', true, '2020-05-15', true)
    ).thenReturn(4);

    expect(
      await queryHandler.execute(
        new GetLeaveRequestsQuery(
          'abcffaa9-cdc5-40fa-a71c-0e93eadd61fd',
          1,
          null
        )
      )
    ).toMatchObject(expectedResult);

    verify(
      dateUtils.getLeaveDuration('2020-05-05', false, '2020-05-15', true)
    ).once();
    verify(
      dateUtils.getLeaveDuration('2020-05-01', false, '2020-05-15', false)
    ).once();
    verify(
      dateUtils.getLeaveDuration('2020-05-08', true, '2020-05-15', true)
    ).once();
    verify(leaveRequestRepository.findLeaveRequests(1, null)).once();
  });
});
