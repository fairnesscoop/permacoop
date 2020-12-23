import { mock, instance, when, verify } from 'ts-mockito';
import { IsMealTicketRemovalAlreadyExist } from './IsMealTicketRemovalAlreadyExist';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { MealTicketRemoval } from '../MealTicketRemoval.entity';

describe('IsMealTicketRemovalAlreadyExist', () => {
  let mealTicketRemovalRepository: MealTicketRemovalRepository;
  let isMealTicketRemovalAlreadyExist: IsMealTicketRemovalAlreadyExist;
  const user = mock(User);
  const date = new Date('2020-04-29');

  beforeEach(() => {
    mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
    isMealTicketRemovalAlreadyExist = new IsMealTicketRemovalAlreadyExist(
      instance(mealTicketRemovalRepository)
    );
  });

  it('testMealTicketRemovalAlreadyExist', async () => {
    when(
      mealTicketRemovalRepository.findOneByUserAndDate(instance(user), date)
    ).thenResolve(new MealTicketRemoval('2020-04-29', 'dejeuner offert', instance(user)));
    expect(
      await isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), date)
    ).toBe(true);
    verify(mealTicketRemovalRepository.findOneByUserAndDate(instance(user), date)).once();
  });

  it('testMealTicketRemovalDoesntExist', async () => {
    when(
      mealTicketRemovalRepository.findOneByUserAndDate(instance(user), date)
    ).thenResolve(null);
    expect(
      await isMealTicketRemovalAlreadyExist.isSatisfiedBy(instance(user), date)
    ).toBe(false);
    verify(mealTicketRemovalRepository.findOneByUserAndDate(instance(user), date)).once();
  });
});
