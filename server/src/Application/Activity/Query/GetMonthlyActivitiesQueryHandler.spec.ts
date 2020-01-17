import {mock, instance, when, verify, deepEqual} from 'ts-mockito';
import {Project} from 'src/Domain/Project/Project.entity';
import {Activity} from 'src/Domain/Activity/Activity.entity';
import {User} from 'src/Domain/User/User.entity';
import {Task} from 'src/Domain/Task/Task.entity';
import {GetMonthlyActivitiesQueryHandler} from './GetMonthlyActivitiesQueryHandler';
import {ActivityRepository} from 'src/Infrastructure/Activity/Repository/ActivityRepository';
import {GetMonthlyActivitiesQuery} from './GetMonthlyActivitiesQuery';
import {ActivityView} from '../View/ActivityView';
import {ActivitiesByDayView} from '../View/ActivitiesByDayView';
import {DateUtilsAdapter} from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import {Customer} from 'src/Domain/Customer/Customer.entity';
import {MonthlyActivitiesView} from '../View/MonthlyActivitiesView';

describe('GetMonthlyActivitiesQueryHandler', () => {
  it('testGetActivities', async () => {
    const activityRepository = mock(ActivityRepository);
    const dateUtilsAdapter = mock(DateUtilsAdapter);
    const task = mock(Task);
    const project = mock(Project);
    const user = mock(User);
    const customer = mock(Customer);
    const queryDate = new Date('2019-12-12T17:43:14.299Z');

    when(project.getFullName()).thenReturn('Customer > Project');
    when(project.getCustomer()).thenReturn(instance(customer));
    when(task.getName()).thenReturn('Development');

    const activity1 = mock(Activity);
    when(activity1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(activity1.getTime()).thenReturn(75);
    when(activity1.getDate()).thenReturn('2019-12-12');
    when(activity1.getSummary()).thenReturn('Summary');
    when(activity1.getTask()).thenReturn(instance(task));
    when(activity1.getProject()).thenReturn(instance(project));
    when(activity1.getUser()).thenReturn(instance(user));

    const activity2 = mock(Activity);
    when(activity2.getId()).thenReturn('b9a9b094-5bb2-4d0b-b01e-231b6cb50039');
    when(activity2.getTime()).thenReturn(25);
    when(activity2.getDate()).thenReturn('2019-12-12');
    when(activity2.getSummary()).thenReturn('');
    when(activity2.getTask()).thenReturn(instance(task));
    when(activity2.getProject()).thenReturn(instance(project));
    when(activity2.getUser()).thenReturn(instance(user));

    const activity3 = mock(Activity);
    when(activity3.getId()).thenReturn('a773a25d-8028-4190-bc03-51b33a0d1528');
    when(activity3.getDate()).thenReturn('2019-12-17');
    when(activity3.getTime()).thenReturn(100);
    when(activity3.getSummary()).thenReturn('');
    when(activity3.getTask()).thenReturn(instance(task));
    when(activity3.getProject()).thenReturn(instance(project));
    when(activity3.getUser()).thenReturn(instance(user));

    when(
      activityRepository.findMonthlyActivities(
        '2019-12-12',
        '00bef1e1-cb52-4914-8887-568b17d99964',
        '12cdf1e1-aa32-1234-0912-568b17d12965'
      )
    ).thenResolve([
      instance(activity1),
      instance(activity2),
      instance(activity3)
    ]);
    when(dateUtilsAdapter.getDaysInMonth(deepEqual(queryDate))).thenReturn(31);

    for (let i = 1; i <= 31; i++) {
      const day = i < 10 ? '0' + i : i;
      const weekDays = [1, 7, 8, 14, 15, 21, 22, 28, 29];

      when(
        dateUtilsAdapter.format(
          deepEqual(new Date(`2019-12-${day}T17:43:14.299Z`)),
          'y-MM-dd'
        )
      ).thenReturn(`2019-12-${day}`);
      when(
        dateUtilsAdapter.isWeekend(
          deepEqual(new Date(`2019-12-${day}T17:43:14.299Z`))
        )
      ).thenReturn(weekDays.includes(i));
    }

    const queryHandler = new GetMonthlyActivitiesQueryHandler(
      instance(activityRepository),
      instance(dateUtilsAdapter)
    );

    const expectedResult = new MonthlyActivitiesView(200, [
      new ActivitiesByDayView('2019-12-01', true),
      new ActivitiesByDayView('2019-12-02', false),
      new ActivitiesByDayView('2019-12-03', false),
      new ActivitiesByDayView('2019-12-04', false),
      new ActivitiesByDayView('2019-12-05', false),
      new ActivitiesByDayView('2019-12-06', false),
      new ActivitiesByDayView('2019-12-07', true),
      new ActivitiesByDayView('2019-12-08', true),
      new ActivitiesByDayView('2019-12-09', false),
      new ActivitiesByDayView('2019-12-10', false),
      new ActivitiesByDayView('2019-12-11', false),
      new ActivitiesByDayView('2019-12-12', false, [
        new ActivityView(
          'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
          75,
          'Summary',
          'Customer > Project',
          'Development'
        ),
        new ActivityView(
          'b9a9b094-5bb2-4d0b-b01e-231b6cb50039',
          25,
          '',
          'Customer > Project',
          'Development'
        )
      ]),
      new ActivitiesByDayView('2019-12-13', false),
      new ActivitiesByDayView('2019-12-14', true),
      new ActivitiesByDayView('2019-12-15', true),
      new ActivitiesByDayView('2019-12-16', false),
      new ActivitiesByDayView('2019-12-17', false, [
        new ActivityView(
          'a773a25d-8028-4190-bc03-51b33a0d1528',
          100,
          '',
          'Customer > Project',
          'Development'
        )
      ]),
      new ActivitiesByDayView('2019-12-18', false),
      new ActivitiesByDayView('2019-12-19', false),
      new ActivitiesByDayView('2019-12-20', false),
      new ActivitiesByDayView('2019-12-21', true),
      new ActivitiesByDayView('2019-12-22', true),
      new ActivitiesByDayView('2019-12-23', false),
      new ActivitiesByDayView('2019-12-24', false),
      new ActivitiesByDayView('2019-12-25', false),
      new ActivitiesByDayView('2019-12-26', false),
      new ActivitiesByDayView('2019-12-27', false),
      new ActivitiesByDayView('2019-12-28', true),
      new ActivitiesByDayView('2019-12-29', true),
      new ActivitiesByDayView('2019-12-30', false),
      new ActivitiesByDayView('2019-12-31', false)
    ]);

    expect(
      await queryHandler.execute(
        new GetMonthlyActivitiesQuery(
          new Date('2019-12-12T17:43:14.299Z'),
          '00bef1e1-cb52-4914-8887-568b17d99964',
          '12cdf1e1-aa32-1234-0912-568b17d12965'
        )
      )
    ).toMatchObject(expectedResult);
    verify(
      activityRepository.findMonthlyActivities(
        '2019-12-12',
        '00bef1e1-cb52-4914-8887-568b17d99964',
        '12cdf1e1-aa32-1234-0912-568b17d12965'
      )
    ).once();
  });
});
