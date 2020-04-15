import {mock, instance, when, verify, deepEqual} from 'ts-mockito';
import {Project} from 'src/Domain/Project/Project.entity';
import {Task} from 'src/Domain/Task/Task.entity';
import {GetMonthlyEventsQueryHandler} from './GetMonthlyEventsQueryHandler';
import {GetMonthlyEventsQuery} from './GetMonthlyEventsQuery';
import {EventView} from '../View/EventView';
import {DateUtilsAdapter} from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import {EventRepository} from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import {Event} from 'src/Domain/FairCalendar/Event.entity';
import {GetEventsOverview} from 'src/Domain/FairCalendar/GetEventsOverview';
import {MonthlyEventsView} from '../View/MonthlyEventsView';
import {IEventsOverview} from 'src/Domain/FairCalendar/IEventsOverview';
import {ProjectView} from 'src/Application/Project/View/ProjectView';
import {TaskView} from 'src/Application/Task/View/TaskView';

describe('GetMonthlyEventsQueryHandler', () => {
  it('testGetEvents', async () => {
    const eventRepository = mock(EventRepository);
    const dateUtils = mock(DateUtilsAdapter);
    const getEventsOverview = mock(GetEventsOverview);
    const task = mock(Task);
    const project = mock(Project);

    when(project.getId()).thenReturn('bf4a645c-9754-4943-baec-783361c6d814');
    when(project.getName()).thenReturn('RadioFrance');
    when(task.getId()).thenReturn('7fb77f06-2d0b-4758-886a-42bba5445fcd');
    when(task.getName()).thenReturn('Development');

    const event1 = mock(Event);
    when(event1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(event1.getType()).thenReturn('mission');
    when(event1.getTime()).thenReturn(75);
    when(event1.getDate()).thenReturn('2019-12-12');
    when(event1.getSummary()).thenReturn('Summary');
    when(event1.getTask()).thenReturn(instance(task));
    when(event1.getProject()).thenReturn(instance(project));

    const event2 = mock(Event);
    when(event2.getId()).thenReturn('b9a9b094-5bb2-4d0b-b01e-231b6cb50039');
    when(event2.getType()).thenReturn('dojo');
    when(event2.getTime()).thenReturn(25);
    when(event2.getDate()).thenReturn('2019-12-12');
    when(event2.getSummary()).thenReturn(null);
    when(event2.getTask()).thenReturn(null);
    when(event2.getProject()).thenReturn(null);

    const event3 = mock(Event);
    when(event3.getId()).thenReturn('a773a25d-8028-4190-bc03-51b33a0d1528');
    when(event3.getType()).thenReturn('holiday');
    when(event3.getDate()).thenReturn('2019-12-17');
    when(event3.getTime()).thenReturn(100);
    when(event3.getSummary()).thenReturn(null);
    when(event3.getTask()).thenReturn(null);
    when(event3.getProject()).thenReturn(null);

    const overview: IEventsOverview = {
      mission: 0.75,
      dojo: 0.25,
      formationConference: 0,
      holiday: 1,
      medicalLeave: 0,
      support: 0,
      workFree: 0,
      other: 0,
      mealTicket: 1,
      totalTimeSpent: 1
    };

    const events = [instance(event1), instance(event2), instance(event3)];

    when(
      dateUtils.format(
        deepEqual(new Date(`2019-12-12T17:43:14.299Z`)),
        'y-MM-dd'
      )
    ).thenReturn(`2019-12-12`);
    when(
      eventRepository.findMonthlyEvents(
        '2019-12-12',
        '00bef1e1-cb52-4914-8887-568b17d99964'
      )
    ).thenResolve(events);
    when(getEventsOverview.index(events)).thenReturn(overview);

    const queryHandler = new GetMonthlyEventsQueryHandler(
      instance(eventRepository),
      instance(dateUtils),
      instance(getEventsOverview)
    );

    expect(
      await queryHandler.execute(
        new GetMonthlyEventsQuery(
          new Date('2019-12-12T17:43:14.299Z'),
          '00bef1e1-cb52-4914-8887-568b17d99964'
        )
      )
    ).toMatchObject(
      new MonthlyEventsView(
        [
          new EventView(
            'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
            'mission',
            0.75,
            '2019-12-12',
            'Summary',
            new ProjectView(
              'bf4a645c-9754-4943-baec-783361c6d814',
              'RadioFrance'
            ),
            new TaskView('7fb77f06-2d0b-4758-886a-42bba5445fcd', 'Development')
          ),
          new EventView(
            'b9a9b094-5bb2-4d0b-b01e-231b6cb50039',
            'dojo',
            0.25,
            '2019-12-12',
            null,
            null,
            null
          ),
          new EventView(
            'a773a25d-8028-4190-bc03-51b33a0d1528',
            'holiday',
            1,
            '2019-12-17',
            null,
            null,
            null
          )
        ],
        overview
      )
    );
    verify(
      dateUtils.format(
        deepEqual(new Date(`2019-12-12T17:43:14.299Z`)),
        'y-MM-dd'
      )
    ).once();

    verify(
      eventRepository.findMonthlyEvents(
        '2019-12-12',
        '00bef1e1-cb52-4914-8887-568b17d99964'
      )
    ).once();
    verify(getEventsOverview.index(events)).once();
  });
});
