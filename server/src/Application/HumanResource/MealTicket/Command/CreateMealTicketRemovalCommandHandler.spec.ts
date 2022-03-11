import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { IsMealTicketRemovalAlreadyExist } from 'src/Domain/HumanResource/MealTicket/Specification/IsMealTicketRemovalAlreadyExist';
import { CreateMealTicketRemovalCommandHandler } from './CreateMealTicketRemovalCommandHandler';
import { CreateMealTicketRemovalCommand } from './CreateMealTicketRemovalCommand';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { MealTicketRemovalAlreadyExistException } from 'src/Domain/HumanResource/MealTicket/Exception/MealTicketRemovalAlreadyExistException';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { NotAWorkingDateException } from 'src/Domain/HumanResource/MealTicket/Exception/NotAWorkingDateException';

describe('CreateMealTicketRemovalCommandHandler', () => {
  let mealTicketRemovalRepository: MealTicketRemovalRepository;
  let isMealTicketRemovalAlreadyExist: IsMealTicketRemovalAlreadyExist;
  let dateUtilsAdapter: DateUtilsAdapter;
  let handler: CreateMealTicketRemovalCommandHandler;

  const user = mock(User);
  const command = new CreateMealTicketRemovalCommand(
    '2020-04-29',
    instance(user),
    'dejeuner offert',
  );

  beforeEach(() => {
    mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
    isMealTicketRemovalAlreadyExist = mock(IsMealTicketRemovalAlreadyExist);
    dateUtilsAdapter = mock(DateUtilsAdapter);

    handler = new CreateMealTicketRemovalCommandHandler(
      instance(mealTicketRemovalRepository),
      instance(dateUtilsAdapter),
      instance(isMealTicketRemovalAlreadyExist),
    );
  });

  it('testMealTicketRemovalSuccessfullyCreated', async () => {
    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(
        instance(user),
        deepEqual(new Date('2020-04-29'))
      )
    ).thenResolve(false);
    when(
      dateUtilsAdapter.isAWorkingDay(deepEqual(new Date('2020-04-29')))
    ).thenReturn(true)

    expect(await handler.execute(command)).toBeUndefined();

    verify(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(
        instance(user),
        deepEqual(new Date('2020-04-29'))
      )
    ).once();
    verify(
      dateUtilsAdapter.isAWorkingDay(deepEqual(new Date('2020-04-29')))
    ).once();
    verify(
      mealTicketRemovalRepository.save(
        deepEqual([
          new MealTicketRemoval('2020-04-29', instance(user), 'dejeuner offert')
        ])
      )
    ).once();
  });

  it('testMealTicketRemovalAlreadyExist', async () => {
    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(
        instance(user),
        deepEqual(new Date('2020-04-29'))
      )
    ).thenResolve(true);
    when(
      dateUtilsAdapter.isAWorkingDay(deepEqual(new Date('2020-04-29')))
    ).thenReturn(true)

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(MealTicketRemovalAlreadyExistException);
      expect(e.message).toBe(
        'human_resources.meal_tickets.errors.already_exist'
      );
      verify(
        dateUtilsAdapter.isAWorkingDay(deepEqual(new Date('2020-04-29')))
      ).once();
      verify(
        isMealTicketRemovalAlreadyExist.isSatisfiedBy(
          instance(user),
          deepEqual(new Date('2020-04-29'))
        )
      ).once();
      verify(mealTicketRemovalRepository.save(anything())).never();
    }
  });

  it('testNotAWorkingDay', async () => {
    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(
        instance(user),
        deepEqual(new Date('2020-04-29'))
      )
    ).thenResolve(true);
    when(
      dateUtilsAdapter.isAWorkingDay(deepEqual(new Date('2020-04-29')))
    ).thenReturn(false)

    try {
      expect(await handler.execute(command)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(NotAWorkingDateException);
      expect(e.message).toBe(
        'human_resources.meal_tickets.errors.not_a_working_date'
      );
      verify(
        dateUtilsAdapter.isAWorkingDay(deepEqual(new Date('2020-04-29')))
      ).once();
      verify(
        isMealTicketRemovalAlreadyExist.isSatisfiedBy(anything(), anything())
      ).never();
      verify(mealTicketRemovalRepository.save(anything())).never();
    }
  });
});
