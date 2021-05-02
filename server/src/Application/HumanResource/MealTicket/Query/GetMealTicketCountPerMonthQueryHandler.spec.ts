import { mock, instance, when } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { GetMealTicketCountPerMonthQueryHandler } from './GetMealTicketCountPerMonthQueryHandler';
import { GetMealTicketCountPerMonthQuery } from './GetMealTicketCountPerMonthQuery';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { WorkingDayOfYearByMonth } from 'src/Infrastructure/Adapter/WorkingDayOfYearByMonth';
import { MealTicketSummaryDTO } from 'src/Domain/HumanResource/MealTicket/DTO/MealTicketSummaryDTO';

describe('GetMealTicketCountPerMonthQueryHandler', () => {
  let mealTicketRemovalRepository: MealTicketRemovalRepository;
  let handler: GetMealTicketCountPerMonthQueryHandler;
  let dateUtilsAdapter: DateUtilsAdapter;

  const now = new Date();

  const user = mock(User);

  const command = new GetMealTicketCountPerMonthQuery(instance(user), now);

  beforeEach(() => {
    mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
    dateUtilsAdapter = mock(DateUtilsAdapter);

    handler = new GetMealTicketCountPerMonthQueryHandler(
      instance(dateUtilsAdapter),
      instance(mealTicketRemovalRepository)
    );
  });

  it('should return the MealTicket Count for each month of the current year', async () => {
    const workingDayByMonth1 = new WorkingDayOfYearByMonth(1, 20);

    const workingDayByMonth2 = new WorkingDayOfYearByMonth(2, 21);

    const workingDayByMonth3 = new WorkingDayOfYearByMonth(3, 23);

    const meatTicketsExceptions = [

      /*
        There are 2 meal exceptions for the month of January
      */
      {
        count: 2,
        date: new Date('1998-03-01')
      }
    ];

    const expectedResult: MealTicketSummaryDTO[] = [
      new MealTicketSummaryDTO(1, 20, 0, 20),
      new MealTicketSummaryDTO(2, 21, 0, 21),
      new MealTicketSummaryDTO(3, 23, 2, 21)
    ];

    const ticketRemoval1 = mock(MealTicketRemoval);
    when(ticketRemoval1.getDate()).thenReturn('2021-12-12');
    const ticketRemoval2 = mock(MealTicketRemoval);
    when(ticketRemoval2.getDate()).thenReturn('2021-11-12');
    when(dateUtilsAdapter.getAllWorkingDayOfYearByMonth(now)).thenReturn([
      workingDayByMonth1,
      workingDayByMonth2,
      workingDayByMonth3
    ]);

    when(
      mealTicketRemovalRepository.getAllByUserGroupedByMonth(instance(user))
    ).thenResolve(meatTicketsExceptions);

    expect(await handler.execute(command)).toStrictEqual(expectedResult);
  });

  it('should return minium 0 available meal ticket even if there are more exceptions', async () => {
    const workingDayByMonth1 = new WorkingDayOfYearByMonth(1, 20);

    const workingDayByMonth2 = new WorkingDayOfYearByMonth(2, 21);

    const workingDayByMonth3 = new WorkingDayOfYearByMonth(3, 23);

    const meatTicketsExceptions = [


      /*
        There is 1 meal exceptions for the month of january
      */
      {
        count: 1,
        date: new Date('1998-01-01')
      },


      /*
        There are 2 meal exceptions for the month of February
      */

      {
        count: 2,
        date: new Date('1998-02-01')
      },


      /*
        There are 6 meal exceptions for the month of March
      */
      {
        count: 6,
        date: new Date('1998-03-01')
      }
    ];

    const expectedResult: MealTicketSummaryDTO[] = [
      new MealTicketSummaryDTO(1, 20, 1, 19),
      new MealTicketSummaryDTO(2, 21, 2, 19),
      new MealTicketSummaryDTO(3, 23, 6, 17)
    ];

    const ticketRemoval1 = mock(MealTicketRemoval);
    when(ticketRemoval1.getDate()).thenReturn('2021-12-12');
    const ticketRemoval2 = mock(MealTicketRemoval);
    when(ticketRemoval2.getDate()).thenReturn('2021-11-12');
    when(dateUtilsAdapter.getAllWorkingDayOfYearByMonth(now)).thenReturn([
      workingDayByMonth1,
      workingDayByMonth2,
      workingDayByMonth3
    ]);

    when(
      mealTicketRemovalRepository.getAllByUserGroupedByMonth(instance(user))
    ).thenResolve(meatTicketsExceptions);

    expect(await handler.execute(command)).toStrictEqual(expectedResult);
  });
});
