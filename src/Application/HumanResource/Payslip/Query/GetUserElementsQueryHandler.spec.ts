import { mock, instance, when, verify, deepEqual } from 'ts-mockito';
import { UserRepository } from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import { GetUsersElementsQuery } from './GetUsersElementsQuery';
import { GetUsersElementsQueryHandler } from './GetUsersElementsQueryHandler';
import { MealTicketsPerMonthView } from '../../MealTicket/Views/MealTicketsPerMonthView';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import {
  ContractType,
  UserAdministrative,
  WorkingTimeType
} from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import { UserElementsView } from '../View/UserElementsView';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { GetMealTicketsPerMonthQueryHandler } from '../../MealTicket/Query/GetMealTicketsPerMonthQueryHandler';
import { GetMealTicketsPerMonthQuery } from '../../MealTicket/Query/GetMealTicketsPerMonthQuery';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { IDateUtils } from 'src/Application/IDateUtils';
import { GetLeavesByMonthQueryHandler } from '../../Leave/Query/GetLeavesByMonthQueryHandler';
import { GetLeavesByMonthQuery } from '../../Leave/Query/GetLeavesByMonthQuery';
import { UserLeavesView } from '../View/UserLeavesView';
import { LeavesCollection } from 'src/Domain/HumanResource/Leave/LeavesCollection';
import {
  LeaveRequest,
  Type
} from 'src/Domain/HumanResource/Leave/LeaveRequest.entity';
import { MonthDate } from 'src/Application/Common/MonthDate';
import { LeaveRequestSlotView } from '../../Leave/View/LeaveRequestSlotView';

describe('GetUserElementsQueryHandler', () => {
  let mealTicketRemovalRepository: MealTicketRemovalRepository;
  let userRepository: UserRepository;
  let leavesByMonthQueryHandler: GetLeavesByMonthQueryHandler;
  let mealTicketsQueryHandler: GetMealTicketsPerMonthQueryHandler;
  let dateUtilsAdapter: IDateUtils;
  let queryHandler: GetUsersElementsQueryHandler;

  const date = new Date();
  const query = new GetUsersElementsQuery(date);

  beforeEach(() => {
    mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
    userRepository = mock(UserRepository);
    leavesByMonthQueryHandler = mock(GetLeavesByMonthQueryHandler);
    mealTicketsQueryHandler = mock(GetMealTicketsPerMonthQueryHandler);
    dateUtilsAdapter = mock(DateUtilsAdapter);

    queryHandler = new GetUsersElementsQueryHandler(
      instance(userRepository),
      instance(leavesByMonthQueryHandler),
      instance(mealTicketsQueryHandler),
      instance(dateUtilsAdapter)
    );
  });

  it('testGetUserElements', async () => {
    const user = mock(User);
    const earnings = 2000000;
    const rawTransportFee = 7500;
    const rawSustainableMobilityFee = 7000;
    const userAdministrative = mock(UserAdministrative);
    when(userAdministrative.getContract()).thenReturn(ContractType.CDI);
    when(userAdministrative.isExecutivePosition()).thenReturn(true);
    when(userAdministrative.getJoiningDate()).thenReturn(date.toISOString());
    when(userAdministrative.getAnnualEarnings()).thenReturn(earnings);
    when(userAdministrative.getAnnualEarnings()).thenReturn(earnings);
    when(userAdministrative.getWorkingTime()).thenReturn(
      WorkingTimeType.FULL_TIME
    );
    when(userAdministrative.getTransportFee()).thenReturn(rawTransportFee);
    when(userAdministrative.getSustainableMobilityFee()).thenReturn(
      rawSustainableMobilityFee
    );
    when(userAdministrative.haveHealthInsurance()).thenReturn(true);

    when(user.getId()).thenReturn('3b8a1954-2ade-44a2-a03c-338985c327ef');
    when(user.getFirstName()).thenReturn('John');
    when(user.getLastName()).thenReturn('Doe');

    when(user.getUserAdministrative()).thenReturn(instance(userAdministrative));

    when(userRepository.findUsersWithPayslipInfo()).thenResolve([
      instance(user)
    ]);

    when(dateUtilsAdapter.getMonth(date)).thenReturn(new MonthDate(2022, 5));

    const createLeaveRequestMock = (
      startDate: string,
      endDate: string
    ): LeaveRequest => {
      const leaveRequest = mock(LeaveRequest);
      when(leaveRequest.getUser()).thenReturn(instance(user));
      when(leaveRequest.getType()).thenReturn(Type.PAID);
      when(leaveRequest.getStartDate()).thenReturn(startDate);
      when(leaveRequest.isStartsAllDay()).thenReturn(false);
      when(leaveRequest.getEndDate()).thenReturn(endDate);
      when(leaveRequest.isEndsAllDay()).thenReturn(false);

      return leaveRequest;
    };
    const startDate1 = '2022-05-09';
    const endDate1 = '2022-05-11';
    const leaveRequest1 = createLeaveRequestMock(startDate1, endDate1);
    const leaveRequestSlot1 = new LeaveRequestSlotView(startDate1, endDate1);
    const startDate2 = '2022-04-25';
    const endDate2 = '2022-05-02';
    const leaveRequest2 = createLeaveRequestMock(startDate2, endDate2);
    const leaveRequestSlot2 = new LeaveRequestSlotView(
      '2022-05-01T00:00:00.000Z',
      endDate2
    );
    const startDate3 = '2022-05-29';
    const endDate3 = '2022-06-05';
    const leaveRequest3 = createLeaveRequestMock(startDate3, endDate3);
    const leaveRequestSlot3 = new LeaveRequestSlotView(
      startDate3,
      '2022-05-31T00:00:00.000Z'
    );

    when(
      leavesByMonthQueryHandler.execute(
        deepEqual(new GetLeavesByMonthQuery(date))
      )
    ).thenResolve(
      new LeavesCollection([
        instance(leaveRequest1),
        instance(leaveRequest2),
        instance(leaveRequest3)
      ])
    );
    when(
      mealTicketsQueryHandler.execute(
        deepEqual(new GetMealTicketsPerMonthQuery(date))
      )
    ).thenResolve([
      new MealTicketsPerMonthView(
        '3b8a1954-2ade-44a2-a03c-338985c327ef',
        'John',
        'Doe',
        5,
        0
      )
    ]);

    const monthlyEarnings = earnings / 1200;
    const yearlyEarning = earnings * 0.01;
    const transportFee = rawTransportFee * 0.01;
    const sustainableMobilityFee = rawSustainableMobilityFee * 0.01;

    expect(await queryHandler.execute(query)).toMatchObject([
      new UserElementsView(
        'John',
        'Doe',
        ContractType.CDI,
        true,
        date.toISOString(),
        yearlyEarning,
        monthlyEarnings,
        WorkingTimeType.FULL_TIME,
        transportFee,
        sustainableMobilityFee,
        5,
        true,
        new UserLeavesView(0, [
          leaveRequestSlot1,
          leaveRequestSlot2,
          leaveRequestSlot3
        ]),
        new UserLeavesView(0, []),
        new UserLeavesView(0, []),
        new UserLeavesView(0, []),
        new UserLeavesView(0, []),
        new UserLeavesView(0, [])
      )
    ]);

    verify(userRepository.findUsersWithPayslipInfo()).once();

    verify(
      leavesByMonthQueryHandler.execute(
        deepEqual(new GetLeavesByMonthQuery(date))
      )
    ).once();

    verify(
      mealTicketsQueryHandler.execute(
        deepEqual(new GetMealTicketsPerMonthQuery(date))
      )
    ).once();
  });
});
