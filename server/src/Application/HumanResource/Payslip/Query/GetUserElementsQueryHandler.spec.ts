import { mock, instance, when, verify, deepEqual } from 'ts-mockito';
import { UserRepository } from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import { GetUsersElementsQuery } from './GetUsersElementsQuery';
import { GetUsersElementsQueryHandler } from './GetUsersElementsQueryHandler';
import { LeaveRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRepository';
import { MealTicketsPerMonthView } from '../../MealTicket/Views/MealTicketsPerMonthView';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { ContractType, UserAdministrative, WorkingTimeType } from 'src/Domain/HumanResource/User/UserAdministrative.entity';
import { UserElementsView } from '../View/UserElementsView';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { GetMealTicketsPerMonthQueryHandler } from '../../MealTicket/Query/GetMealTicketsPerMonthQueryHandler';
import { GetMealTicketsPerMonthQuery } from '../../MealTicket/Query/GetMealTicketsPerMonthQuery';

describe('GetUserElementsQueryHandler', () => {
  let mealTicketRemovalRepository: MealTicketRemovalRepository;
  let userRepository: UserRepository;
  let leaveRepository: LeaveRepository;
  let mealTicketsQueryHandler: GetMealTicketsPerMonthQueryHandler;
  let queryHandler: GetUsersElementsQueryHandler;

  const date = new Date();
  const query = new GetUsersElementsQuery(date);

  beforeEach(() => {
    mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
    userRepository = mock(UserRepository);
    leaveRepository = mock(LeaveRepository);
    mealTicketsQueryHandler = mock(GetMealTicketsPerMonthQueryHandler);

    queryHandler = new GetUsersElementsQueryHandler(
      instance(userRepository),
      instance(leaveRepository),
      instance(mealTicketsQueryHandler),
    );
  });

  it('testGetUserElements', async () => {
    const user = mock(User);
    const earnings = 2000000;
    const rawTransportFee = 7500;
    const userAdministrative = mock(UserAdministrative);
    when(userAdministrative.getContract()).thenReturn(ContractType.CDI);
    when(userAdministrative.isExecutivePosition()).thenReturn(true);
    when(userAdministrative.getJoiningDate()).thenReturn(date.toISOString());
    when(userAdministrative.getAnnualEarnings()).thenReturn(earnings);
    when(userAdministrative.getAnnualEarnings()).thenReturn(earnings);
    when(userAdministrative.getWorkingTime()).thenReturn(WorkingTimeType.FULL_TIME);
    when(userAdministrative.getTransportFee()).thenReturn(rawTransportFee);
    when(userAdministrative.haveHealthInsurance()).thenReturn(true);

    when(user.getId()).thenReturn("3b8a1954-2ade-44a2-a03c-338985c327ef");
    when(user.getFirstName()).thenReturn("John");
    when(user.getLastName()).thenReturn("Doe");

    when(user.getUserAdministrative()).thenReturn(instance(userAdministrative));

    when(userRepository.findUsersWithPayslipInfo()).thenResolve(
      [
        instance(user)
      ]
    );
    when(leaveRepository.findAllMonthlyLeaves(date)).thenResolve(null);
    when(mealTicketsQueryHandler.execute(deepEqual(new GetMealTicketsPerMonthQuery(date))))
      .thenResolve(
        [
          new MealTicketsPerMonthView(
            "3b8a1954-2ade-44a2-a03c-338985c327ef",
            "John",
            "Doe",
            5,
            0
          )
        ]
      )

      const monthlyEarnings = earnings / 1200;
      const yearlyEarning = earnings * 0.01;
      const transportFee = rawTransportFee * 0.01;

      expect(await queryHandler.execute(query)).toMatchObject([
        new UserElementsView(
          "John",
          "Doe",
          ContractType.CDI,
          true,
          date.toISOString(),
          yearlyEarning,
          monthlyEarnings,
          WorkingTimeType.FULL_TIME,
          transportFee,
          5,
          'yes',
          0,
          0,
          0,
          0,
        )
      ]);

      verify(
        userRepository.findUsersWithPayslipInfo()
      ).once();

      verify(
        leaveRepository.findAllMonthlyLeaves(date)
      ).once();

      verify(
        mealTicketsQueryHandler.execute(deepEqual(new GetMealTicketsPerMonthQuery (date)))
      ).once();
  });
});
