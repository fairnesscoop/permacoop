import { mock, instance, when, verify, deepEqual } from 'ts-mockito';
import { Project } from 'src/Domain/Project/Project.entity';
import { Task } from 'src/Domain/Task/Task.entity';
import { GetMonthlyFairCalendarQueryHandler } from './GetMonthlyFairCalendarQueryHandler';
import { GetMonthlyFairCalendarQuery } from './GetMonthlyFairCalendarQuery';
import { DateUtilsAdapter } from 'src/Infrastructure/Adapter/DateUtilsAdapter';
import { EventRepository } from 'src/Infrastructure/FairCalendar/Repository/EventRepository';
import { Event } from 'src/Domain/FairCalendar/Event.entity';
import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { TaskView } from 'src/Application/Task/View/TaskView';
import { LeaveRepository } from 'src/Infrastructure/HumanResource/Leave/Repository/LeaveRepository';
import { Leave } from 'src/Domain/HumanResource/Leave/Leave.entity';
import { FairCalendarView } from '../View/FairCalendarView';

describe('GetMonthlyFairCalendarQueryHandler', () => {
  it('testGetEvents', async () => {
    const leaveRepository = mock(LeaveRepository);
    const eventRepository = mock(EventRepository);
    const dateUtils = mock(DateUtilsAdapter);
    const task = mock(Task);
    const project = mock(Project);

    when(project.getId()).thenReturn('bf4a645c-9754-4943-baec-783361c6d814');
    when(project.getName()).thenReturn('RadioFrance');
    when(project.getDayDuration()).thenReturn(420);
    when(task.getId()).thenReturn('7fb77f06-2d0b-4758-886a-42bba5445fcd');
    when(task.getName()).thenReturn('Development');

    const event1 = mock(Event);
    when(event1.getId()).thenReturn('eb9e1d9b-dce2-48a9-b64f-f0872f3157d2');
    when(event1.getType()).thenReturn('mission');
    when(event1.isBillable()).thenReturn(true);
    when(event1.getTime()).thenReturn(90);
    when(event1.getDate()).thenReturn('2019-12-12');
    when(event1.getSummary()).thenReturn('lorem ipsum');
    when(event1.getTask()).thenReturn(instance(task));
    when(event1.getProject()).thenReturn(instance(project));

    const event2 = mock(Event);
    when(event2.getId()).thenReturn('b9a9b094-5bb2-4d0b-b01e-231b6cb50039');
    when(event2.getType()).thenReturn('dojo');
    when(event2.getTime()).thenReturn(300);
    when(event2.isBillable()).thenReturn(false);
    when(event2.getDate()).thenReturn('2019-12-12');
    when(event2.getSummary()).thenReturn('dolor sit amet');
    when(event2.getTask()).thenReturn(null);
    when(event2.getProject()).thenReturn(null);

    const leave = mock(Leave);
    when(leave.getType()).thenReturn('paid');
    when(leave.getDate()).thenReturn('2019-12-13');
    when(leave.getTime()).thenReturn(420);

    const leave2 = mock(Leave);
    when(leave2.getType()).thenReturn('special');
    when(leave2.getDate()).thenReturn('2019-12-14');
    when(leave2.getTime()).thenReturn(300);

    const events = [instance(event1), instance(event2)];
    const leaves = [instance(leave), instance(leave2)];

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
    when(
      leaveRepository.findMonthlyLeaves(
        '2019-12-12',
        '00bef1e1-cb52-4914-8887-568b17d99964'
      )
    ).thenResolve(leaves);

    const queryHandler = new GetMonthlyFairCalendarQueryHandler(
      instance(eventRepository),
      instance(leaveRepository),
      instance(dateUtils)
    );

    expect(
      await queryHandler.execute(
        new GetMonthlyFairCalendarQuery(
          new Date('2019-12-12T17:43:14.299Z'),
          '00bef1e1-cb52-4914-8887-568b17d99964'
        )
      )
    ).toMatchObject([
      new FairCalendarView(
        'mission',
        90,
        '2019-12-12',
        'lorem ipsum',
        'eb9e1d9b-dce2-48a9-b64f-f0872f3157d2',
        true,
        new ProjectView(
          'bf4a645c-9754-4943-baec-783361c6d814',
          'RadioFrance',
          420
        ),
        new TaskView('7fb77f06-2d0b-4758-886a-42bba5445fcd', 'Development')
      ),
      new FairCalendarView(
        'dojo',
        300,
        '2019-12-12',
        'dolor sit amet',
        'b9a9b094-5bb2-4d0b-b01e-231b6cb50039',
        false,
        null,
        null
      ),
      new FairCalendarView('paid', 420, '2019-12-13'),
      new FairCalendarView('special', 300, '2019-12-14')
    ]);
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
    verify(
      leaveRepository.findMonthlyLeaves(
        '2019-12-12',
        '00bef1e1-cb52-4914-8887-568b17d99964'
      )
    ).once();
  });
});
