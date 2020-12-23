import { mock, instance } from 'ts-mockito';
import { MealTicketRemoval } from './MealTicketRemoval.entity';
import { User } from '../User/User.entity';

describe('MealTicketRemoval.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const mealTicketRemoval = new MealTicketRemoval(
      '2020-04-26',
      'Dejeuner offert à la conférence',
      instance(user)
    );

    expect(mealTicketRemoval.getId()).toBe(undefined);
    expect(mealTicketRemoval.getDate()).toBe('2020-04-26');
    expect(mealTicketRemoval.getUser()).toBe(instance(user));
    expect(mealTicketRemoval.getComment()).toBe('Dejeuner offert à la conférence');
  });
});
