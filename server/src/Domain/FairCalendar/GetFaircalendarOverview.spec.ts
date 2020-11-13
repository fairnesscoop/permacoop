import { instance, mock, when } from 'ts-mockito';
import { GetFairCalendarOverview } from './GetFairCalendarOverview';
import { Event, EventType } from './Event.entity';
import { ICalendarOverview } from './ICalendarOverview';
import { Leave } from '../HumanResource/Leave/Leave.entity';

describe('GetFairCalendarOverview', () => {
  let getFairCalendarOverview: GetFairCalendarOverview;

  beforeEach(() => {
    getFairCalendarOverview = new GetFairCalendarOverview();
  });

  it('testGetOverview', async () => {
    const event1 = mock(Event);
    when(event1.getType()).thenReturn(EventType.MISSION);
    when(event1.getTime()).thenReturn(75);
    when(event1.getDate()).thenReturn('2019-12-12');

    const event2 = mock(Event);
    when(event2.getType()).thenReturn(EventType.DOJO);
    when(event2.getTime()).thenReturn(25);
    when(event2.getDate()).thenReturn('2019-12-12');

    const event4 = mock(Event);
    when(event4.getType()).thenReturn(EventType.MISSION);
    when(event4.getTime()).thenReturn(50);
    when(event4.getDate()).thenReturn('2019-12-13');

    const event5 = mock(Event);
    when(event5.getType()).thenReturn(EventType.MISSION);
    when(event5.getTime()).thenReturn(25);
    when(event5.getDate()).thenReturn('2019-12-10');

    const event6 = mock(Event);
    when(event6.getType()).thenReturn(EventType.SUPPORT);
    when(event6.getTime()).thenReturn(75);
    when(event6.getDate()).thenReturn('2019-12-10');

    const event9 = mock(Event);
    when(event9.getType()).thenReturn(EventType.FORMATION_CONFERENCE);
    when(event9.getTime()).thenReturn(100);
    when(event9.getDate()).thenReturn('2019-12-03');

    const event10 = mock(Event);
    when(event10.getType()).thenReturn(EventType.OTHER);
    when(event10.getTime()).thenReturn(50);
    when(event10.getDate()).thenReturn('2019-12-04');

    const leave = mock(Leave);
    when(leave.getType()).thenReturn('leave_special');
    when(leave.getTime()).thenReturn(50);
    when(leave.getDate()).thenReturn('2019-12-05');

    const leave2 = mock(Leave);
    when(leave2.getType()).thenReturn('leave_paid');
    when(leave2.getTime()).thenReturn(50);
    when(leave2.getDate()).thenReturn('2019-12-06');

    const expectedResult: ICalendarOverview = {
      mission: 1.5,
      dojo: 0.25,
      formationConference: 1,
      leave: 1,
      support: 0.75,
      other: 0.5,
      mealTicket: 3
    };

    expect(
      await getFairCalendarOverview.index([
        instance(event1),
        instance(event2),
        instance(event4),
        instance(event5),
        instance(event6),
        instance(event9),
        instance(event10),
        instance(leave),
        instance(leave2),
      ])
    ).toMatchObject(expectedResult);
  });
});
