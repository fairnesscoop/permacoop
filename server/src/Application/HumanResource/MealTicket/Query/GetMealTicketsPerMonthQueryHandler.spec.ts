import { mock, instance, when, verify, anything } from 'ts-mockito';
import { GetMealTicketsPerMonthQueryHandler } from './GetMealTicketsPerMonthQueryHandler';
import { GetMealTicketsPerMonthQuery } from './GetMealTicketsPerMonthQuery';
import { MealTicketRemovalRepository } from 'src/Infrastructure/HumanResource/MealTicket/Repository/MealTicketRemovalRepository';
import { CooperativeRepository } from 'src/Infrastructure/Settings/Repository/CooperativeRepository';
import { EventRepository } from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import { UserRepository } from 'src/Infrastructure/HumanResource/User/Repository/UserRepository';
import { CooperativeNotFoundException } from 'src/Domain/Settings/Repository/CooperativeNotFoundException';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';
import { User } from 'src/Domain/HumanResource/User/User.entity';
import { MealTicketsPerMonthView } from '../Views/MealTicketsPerMonthView';

describe('GetMealTicketsPerMonthQueryHandler', () => {
  let mealTicketRemovalRepository: MealTicketRemovalRepository;
  let userRepository: UserRepository;
  let eventRepository: EventRepository;
  let cooperativeRepository: CooperativeRepository;
  let queryHandler: GetMealTicketsPerMonthQueryHandler;

  const date = new Date();
  const query = new GetMealTicketsPerMonthQuery(date);

  beforeEach(() => {
    mealTicketRemovalRepository = mock(MealTicketRemovalRepository);
    userRepository = mock(UserRepository);
    eventRepository = mock(EventRepository);
    cooperativeRepository = mock(CooperativeRepository);

    queryHandler = new GetMealTicketsPerMonthQueryHandler(
      instance(mealTicketRemovalRepository),
      instance(userRepository),
      instance(eventRepository),
      instance(cooperativeRepository),
    );
  });

  it('testCooperativeNotFound', async () => {
    when(cooperativeRepository.find()).thenResolve(null);

    try {
      expect(await queryHandler.execute(query)).toBeUndefined();
    } catch (e) {
      expect(e).toBeInstanceOf(CooperativeNotFoundException);
      expect(e.message).toBe('settings.errors.cooperative_not_found');
      verify(
        userRepository.findUsers(anything())
      ).never();
      verify(
        mealTicketRemovalRepository.findByMonth(anything())
      ).never();
      verify(
        eventRepository.findAllEventsByMonth(anything())
      ).never();
    }
  });

  it('testGetMealTicketsPerMonth', async () => {
    const cooperative = mock(Cooperative);
    when(cooperative.getDayDuration()).thenReturn(420); // One day

    when(cooperativeRepository.find())
      .thenResolve(instance(cooperative));

    const user = mock(User);
    when(user.getId()).thenReturn('b1e67870-f2bd-4cdc-8467-e13568550eb8');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');

    const user2 = mock(User);
    when(user2.getId()).thenReturn('86ca8576-3283-4702-84b1-ee0d8c5f5ca8');
    when(user2.getFirstName()).thenReturn('Hélène');
    when(user2.getLastName()).thenReturn('MARCHOIS');

    when(userRepository.findUsers(false, true))
      .thenResolve([instance(user), instance(user2)]);

    when(mealTicketRemovalRepository.findByMonth(date))
      .thenResolve([
        { id: 'b1e67870-f2bd-4cdc-8467-e13568550eb8', count: 1 },
      ]);

    when(eventRepository.findAllEventsByMonth(date))
      .thenResolve([
        {
          date: '2022-03-22',
          user: 'b1e67870-f2bd-4cdc-8467-e13568550eb8',
          duration: 420
        },
        {
          date: '2022-03-21',
          user: 'b1e67870-f2bd-4cdc-8467-e13568550eb8',
          duration: 420
        },
        {

          date: '2022-03-20',
          user: 'b1e67870-f2bd-4cdc-8467-e13568550eb8',
          duration: 120
        },
        {
          date: '2022-03-22',
          user: '86ca8576-3283-4702-84b1-ee0d8c5f5ca8',
          duration: 420
        },
      ]);

    expect(await queryHandler.execute(query)).toMatchObject(
      [
        new MealTicketsPerMonthView(
          'b1e67870-f2bd-4cdc-8467-e13568550eb8',
          'Mathieu',
          'MARCHOIS',
          1,
          1
        ),
        new MealTicketsPerMonthView(
          '86ca8576-3283-4702-84b1-ee0d8c5f5ca8',
          'Hélène',
          'MARCHOIS',
          1,
          0
        )
      ]
    );

    verify(
      userRepository.findUsers(false, true)
    ).once();
    verify(
      mealTicketRemovalRepository.findByMonth(date)
    ).once();
    verify(
      eventRepository.findAllEventsByMonth(date)
    ).once();
  });
});
