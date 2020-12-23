import { mock, instance, when, verify, deepEqual, anything } from 'ts-mockito';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { IsMealTicketRemovalAlreadyExist } from 'src/Domain/HumanResource/MealTicket/Specification/IsMealTicketRemovalAlreadyExist';
import { CreateMealTicketRemovalCommandHandler } from './CreateMealTicketRemovalCommandHandler';
import { CreateMealTicketRemovalCommand } from './CreateMealTicketRemovalCommand';
import { MealTicketRemoval } from 'src/Domain/HumanResource/MealTicket/MealTicketRemoval.entity';
import { MealTicketRemovalAlreadyExistException } from 'src/Domain/HumanResource/MealTicket/Exception/MealTicketRemovalAlreadyExistException';

describe('CreateMealTicketRemovalCommandHandler', () => {
  let mealTicketRemovalRepository: MealTicketRemovalRepository;
  let isMealTicketRemovalAlreadyExist: IsMealTicketRemovalAlreadyExist;
  let handler: CreateMealTicketRemovalCommandHandler;

  const user = mock(User);
  const mealTicketRemoval = mock(MealTicketRemoval);
  const command = new CreateMealTicketRemovalCommand(
    '2020-04-29',
    'dejeuner offert',
    instance(user)
  );

  beforeEach(() => {
    mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
    isMealTicketRemovalAlreadyExist = mock(IsMealTicketRemovalAlreadyExist);

    handler = new CreateMealTicketRemovalCommandHandler(
      instance(mealTicketRemovalRepository),
      instance(isMealTicketRemovalAlreadyExist)
    );
  });

  it('testMealTicketRemovalSuccessfullyCreated', async () => {
    when(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(
        instance(user),
        deepEqual(new Date('2020-04-29'))
      )
    ).thenResolve(false);
    when(mealTicketRemoval.getId()).thenReturn('7c35d37c-b0e3-480d-bf6c-3dc1e094886f');
    when(
      mealTicketRemovalRepository.save(
        deepEqual(new MealTicketRemoval('2020-04-29', 'dejeuner offert', instance(user)))
      )
    ).thenResolve(instance(mealTicketRemoval));

    expect(await handler.execute(command)).toBe(
      '7c35d37c-b0e3-480d-bf6c-3dc1e094886f'
    );

    verify(
      isMealTicketRemovalAlreadyExist.isSatisfiedBy(
        instance(user),
        deepEqual(new Date('2020-04-29'))
      )
    ).once();
    verify(
      mealTicketRemovalRepository.save(
        deepEqual(new MealTicketRemoval('2020-04-29', 'dejeuner offert', instance(user)))
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

    try {
      await handler.execute(command);
    } catch (e) {
      expect(e).toBeInstanceOf(MealTicketRemovalAlreadyExistException);
      expect(e.message).toBe('human_resources.meal_ticket.meal_ticket_removal.errors.already_exist');
      verify(
        isMealTicketRemovalAlreadyExist.isSatisfiedBy(
          instance(user),
          deepEqual(new Date('2020-04-29'))
        )
      ).once();
      verify(mealTicketRemovalRepository.save(anything())).never();
    }
  });
});
