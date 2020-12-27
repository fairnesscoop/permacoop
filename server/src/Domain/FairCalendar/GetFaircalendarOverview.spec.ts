import { instance, mock, when } from 'ts-mockito';
import { GetFairCalendarOverview } from './GetFairCalendarOverview';
import { EventType } from './Event.entity';
import { ICalendarOverview } from './ICalendarOverview';
import { CooperativeRepository } from 'src/Infrastructure/Settings/Repository/CooperativeRepository';
import { Cooperative } from '../Settings/Cooperative.entity';
import { FairCalendarView } from 'src/Application/FairCalendar/View/FairCalendarView';
import { ProjectView } from 'src/Application/Project/View/ProjectView';
import { Type } from '../HumanResource/Leave/LeaveRequest.entity';
import { CooperativeNotFoundException } from '../Settings/Repository/CooperativeNotFoundException';

describe('GetFairCalendarOverview', () => {
  let getFairCalendarOverview: GetFairCalendarOverview;
  let cooperativeRepository: CooperativeRepository;


  beforeEach(() => {
    cooperativeRepository = mock(CooperativeRepository);
    getFairCalendarOverview = new GetFairCalendarOverview(instance(cooperativeRepository));
  });

  it('testCooperativeNotFoundOverview', async () => {
    when(cooperativeRepository.find()).thenResolve(null);

    const project = new ProjectView('bd86391b-4ee2-45db-9fc0-66078845a8b6', 'RadioFrance', 420);
    const event1 = new FairCalendarView(EventType.MISSION, 300, '2019-12-12', null, null, true, project);

    try {
      await getFairCalendarOverview.index([event1]);
    } catch (e) {
      expect(e).toBeInstanceOf(CooperativeNotFoundException);
      expect(e.message).toBe('settings.errors.cooperative_not_found');
    }
  });

  it('testGetOverview', async () => {
    const cooperative = mock(Cooperative);
    when(cooperative.getDayDuration()).thenReturn(480);
    when(cooperativeRepository.find()).thenResolve(instance(cooperative));

    const project = new ProjectView('bd86391b-4ee2-45db-9fc0-66078845a8b6', 'RadioFrance', 420);

    const event1 = new FairCalendarView(EventType.MISSION, 300, '2019-12-12', null, null, true, project);
    const event2 = new FairCalendarView(EventType.DOJO, 120, '2019-12-12');
    const event3 = new FairCalendarView(EventType.MISSION, 210, '2019-12-13', null, null, true, project);
    const event5 = new FairCalendarView(EventType.MISSION, 240, '2019-12-10', null, null, true, project);
    const event6 = new FairCalendarView(EventType.SUPPORT, 240, '2019-12-10');
    const event7 = new FairCalendarView(EventType.FORMATION_CONFERENCE, 480, '2019-12-03');
    const event8 = new FairCalendarView(EventType.OTHER, 240, '2019-12-04');
    const leave = new FairCalendarView(`leave_${Type.SPECIAL}`, 240, '2019-12-05');
    const leave2 = new FairCalendarView(`leave_${Type.PAID}`, 240, '2019-12-06');

    const expectedResult: ICalendarOverview = {
      mission: 1.78,
      dojo: 0.25,
      formationConference: 1,
      leave: 1,
      support: 0.5,
      other: 0.5
    };

    expect(
      await getFairCalendarOverview.index([
        event1,
        event2,
        event3,
        event5,
        event6,
        event7,
        event8,
        leave,
        leave2,
      ])
    ).toMatchObject(expectedResult);
  });
});
