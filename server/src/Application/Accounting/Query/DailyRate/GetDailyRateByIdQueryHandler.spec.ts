import {mock, instance, when, verify} from 'ts-mockito';
import {GetDailyRateByIdQueryHandler} from './GetDailyRateByIdQueryHandler';
import {GetDailyRateByIdQuery} from './GetDailyRateByIdQuery';
import {Task} from 'src/Domain/Task/Task.entity';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {DailyRateRepository} from 'src/Infrastructure/Accounting/Repository/DailyRateRepository';
import {DailyRateView} from '../../View/DailyRate/DailyRateView';
import {UserSummaryView} from 'src/Application/HumanResource/User/View/UserSummaryView';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {DailyRate} from 'src/Domain/Accounting/DailyRate.entity';
import {DailyRateNotFoundException} from 'src/Domain/Accounting/Exception/DailyRateNotFoundException';

describe('GetDailyRateByIdQueryHandler', () => {
  const query = new GetDailyRateByIdQuery(
    'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2'
  );

  it('testGetDailyRate', async () => {
    const dailyRateRepository = mock(DailyRateRepository);
    const queryHandler = new GetDailyRateByIdQueryHandler(
      instance(dailyRateRepository)
    );

    const expectedResult = new DailyRateView(
      'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
      620.6,
      new UserSummaryView(
        'deffa668-b9af-4a52-94dd-61a35401b917',
        'Mathieu',
        'MARCHOIS'
      ),
      new TaskView('d54f15d6-1a1d-47e8-8672-9f46018f9960', 'Development'),
      new CustomerView('c6434c49-216b-41b3-a30a-79a3eb1198ec', 'Radio France')
    );

    const user = mock(User);
    when(user.getId()).thenReturn('deffa668-b9af-4a52-94dd-61a35401b917');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');
    when(user.getEmail()).thenReturn('mathieu.marchois@fairness.coop');

    const customer = mock(Customer);
    when(customer.getId()).thenReturn('c6434c49-216b-41b3-a30a-79a3eb1198ec');
    when(customer.getName()).thenReturn('Radio France');

    const task = mock(Task);
    when(task.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(task.getName()).thenReturn('Development');

    const dailyRate1 = mock(DailyRate);
    when(dailyRate1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(dailyRate1.getAmount()).thenReturn(62060);
    when(dailyRate1.getUser()).thenReturn(instance(user));
    when(dailyRate1.getCustomer()).thenReturn(instance(customer));
    when(dailyRate1.getTask()).thenReturn(instance(task));

    when(
      dailyRateRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(instance(dailyRate1));

    expect(await queryHandler.execute(query)).toMatchObject(expectedResult);

    verify(
      dailyRateRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).once();
  });

  it('testGetDailyRateNotFound', async () => {
    const dailyrateRepository = mock(DailyRateRepository);
    const queryHandler = new GetDailyRateByIdQueryHandler(
      instance(dailyrateRepository)
    );
    when(
      dailyrateRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
    ).thenResolve(null);

    try {
      await queryHandler.execute(query);
    } catch (e) {
      expect(e).toBeInstanceOf(DailyRateNotFoundException);
      expect(e.message).toBe('accounting.errors.daily_rate_not_found');
      verify(
        dailyrateRepository.findOneById('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2')
      ).once();
    }
  });
});
