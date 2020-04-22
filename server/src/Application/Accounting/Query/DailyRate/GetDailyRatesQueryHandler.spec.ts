import {mock, instance, when, verify} from 'ts-mockito';
import {DailyRateRepository} from 'src/Infrastructure/Accounting/Repository/DailyRateRepository';
import {GetDailyRatesQueryHandler} from './GetDailyRatesQueryHandler';
import {DailyRateView} from '../../View/DailyRate/DailyRateView';
import {UserView} from 'src/Application/User/View/UserView';
import {TaskView} from 'src/Application/Task/View/TaskView';
import {CustomerView} from 'src/Application/Customer/View/CustomerView';
import {GetDailyRatesQuery} from './GetDailyRatesQuery';
import {DailyRate} from 'src/Domain/Accounting/DailyRate.entity';
import {User} from 'src/Domain/User/User.entity';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {Task} from 'src/Domain/Task/Task.entity';

describe('GetDailyRatesQueryHandler', () => {
  let dailyRateRepository: DailyRateRepository;

  beforeEach(() => {
    dailyRateRepository = mock(DailyRateRepository);
  });

  it('testGetDailyRates', async () => {
    const user = mock(User);
    when(user.getId()).thenReturn('deffa668-b9af-4a52-94dd-61a35401b917');
    when(user.getFirstName()).thenReturn('Mathieu');
    when(user.getLastName()).thenReturn('MARCHOIS');
    when(user.getEmail()).thenReturn('mathieu.marchois@fairness.coop');

    const customer = mock(Customer);
    when(customer.getId()).thenReturn('c6434c49-216b-41b3-a30a-79a3eb1198ec');
    when(customer.getName()).thenReturn('Radio France');

    const task = mock(Task);
    when(task.getId()).thenReturn('ade9021e-123c-4b9f-8be4-27a38164b789');
    when(task.getName()).thenReturn('Development');

    const dailyRate1 = mock(DailyRate);
    when(dailyRate1.getId()).thenReturn('d54f15d6-1a1d-47e8-8672-9f46018f9960');
    when(dailyRate1.getAmount()).thenReturn(62060);
    when(dailyRate1.getUser()).thenReturn(instance(user));
    when(dailyRate1.getCustomer()).thenReturn(instance(customer));
    when(dailyRate1.getTask()).thenReturn(instance(task));

    const task2 = mock(Task);
    when(task2.getId()).thenReturn('1cd7b031-6988-48e2-a40c-4253ced7c5df');
    when(task2.getName()).thenReturn('Formation');

    const dailyRate2 = mock(DailyRate);
    when(dailyRate2.getId()).thenReturn('b3332cd1-5631-4b7b-a5d4-ba49910cb877');
    when(dailyRate2.getAmount()).thenReturn(70000);
    when(dailyRate2.getUser()).thenReturn(instance(user));
    when(dailyRate2.getCustomer()).thenReturn(instance(customer));
    when(dailyRate2.getTask()).thenReturn(instance(task2));

    when(dailyRateRepository.findAll()).thenResolve([
      instance(dailyRate1),
      instance(dailyRate2)
    ]);

    const queryHandler = new GetDailyRatesQueryHandler(
      instance(dailyRateRepository)
    );

    const expectedResult = [
      new DailyRateView(
        'd54f15d6-1a1d-47e8-8672-9f46018f9960',
        620.6,
        new UserView(
          'deffa668-b9af-4a52-94dd-61a35401b917',
          'Mathieu',
          'MARCHOIS',
          'mathieu.marchois@fairness.coop'
        ),
        new TaskView('ade9021e-123c-4b9f-8be4-27a38164b789', 'Development'),
        new CustomerView('c6434c49-216b-41b3-a30a-79a3eb1198ec', 'Radio France')
      ),
      new DailyRateView(
        'b3332cd1-5631-4b7b-a5d4-ba49910cb877',
        700,
        new UserView(
          'deffa668-b9af-4a52-94dd-61a35401b917',
          'Mathieu',
          'MARCHOIS',
          'mathieu.marchois@fairness.coop'
        ),
        new TaskView('1cd7b031-6988-48e2-a40c-4253ced7c5df', 'Formation'),
        new CustomerView('c6434c49-216b-41b3-a30a-79a3eb1198ec', 'Radio France')
      )
    ];

    expect(await queryHandler.execute(new GetDailyRatesQuery())).toMatchObject(
      expectedResult
    );

    verify(dailyRateRepository.findAll()).once();
  });

  it('testGetEmptyDailyRates', async () => {
    when(dailyRateRepository.findAll()).thenResolve([]);

    const queryHandler = new GetDailyRatesQueryHandler(
      instance(dailyRateRepository)
    );

    expect(await queryHandler.execute(new GetDailyRatesQuery())).toMatchObject(
      []
    );

    verify(dailyRateRepository.findAll()).once();
  });
});
