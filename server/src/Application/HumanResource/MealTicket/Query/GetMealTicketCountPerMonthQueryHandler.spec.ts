import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { IsMealTicketRemovalAlreadyExist } from 'src/Domain/HumanResource/MealTicket/Specification/IsMealTicketRemovalAlreadyExist';

import { GetMealTicketCountPerMonthQueryHandler } from './GetMealTicketCountPerMonthQueryHandler';
import { GetMealTicketCountPerMonthQuery } from './GetMealTicketCountPerMonthQuery';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';

describe('GetMealTicketCountPerMonthQueryHandler', () => {
  let mealTicketRemovalRepository: MealTicketRemovalRepository;
  let isMealTicketRemovalAlreadyExist: IsMealTicketRemovalAlreadyExist;
  let handler: GetMealTicketCountPerMonthQueryHandler;
  let dateUtilsAdapter: DateUtilsAdapter;

  const now = new Date();

  const user = mock(User);

  const command = new GetMealTicketCountPerMonthQuery(instance(user), now);

  beforeEach(() => {
    mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
    isMealTicketRemovalAlreadyExist = mock(IsMealTicketRemovalAlreadyExist);
    dateUtilsAdapter = mock(DateUtilsAdapter);

    handler = new GetMealTicketCountPerMonthQueryHandler(
      instance(dateUtilsAdapter),
      instance(mealTicketRemovalRepository)
    );
  });

  it('should return the MealTicket Count for each month of the current year', async () => {
    const workingDaysByMonth = {
      '1': [
        new Date('1998-01-01'),
        new Date('1998-01-01'),
        new Date('1998-01-01')
      ],

      '2': [new Date('1998-02-01'), new Date('1998-02-01')]
    };

    const meatTicketsExceptions = [
      {
        count: 1,
        date: new Date('1998-01-01')
      },

      {
        count: 2,
        date: new Date('1998-02-01')
      }
    ];

    const expectedResult = {
      '1': 2,
      '2': 0
    };

    const ticketRemoval1 = mock(MealTicketRemoval);
    when(ticketRemoval1.getDate()).thenReturn('2021-12-12');
    const ticketRemoval2 = mock(MealTicketRemoval);
    when(ticketRemoval2.getDate()).thenReturn('2021-11-12');
    when(dateUtilsAdapter.getAllWorkingDayOfYearByMonth(now)).thenReturn(
      workingDaysByMonth
    );

    when(
      mealTicketRemovalRepository.getAllByUserGroupedByDate(instance(user))
    ).thenResolve(meatTicketsExceptions);

    expect(await handler.execute(command)).toStrictEqual(expectedResult);
  });
});
