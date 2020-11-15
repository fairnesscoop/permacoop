import {mock, instance} from 'ts-mockito';
import {Event, EventType} from './Event.entity';
import {User} from '../HumanResource/User/User.entity';
import {Project} from '../Project/Project.entity';
import {Task} from '../Task/Task.entity';

describe('Event.entity', () => {
  it('testGetters', () => {
    const user = mock(User);
    const project = mock(Project);
    const task = mock(Task);

    const event = new Event(
      EventType.MISSION,
      instance(user),
      100,
      '2019-12-12',
      true,
      instance(project),
      instance(task),
      'Superkaiser development'
    );

    expect(event.getId()).toBe(undefined);
    expect(event.getType()).toBe(EventType.MISSION);
    expect(event.getUser()).toBe(instance(user));
    expect(event.getTime()).toBe(100);
    expect(event.isBillable()).toBe(true);
    expect(event.getDate()).toBe('2019-12-12');
    expect(event.getProject()).toBe(instance(project));
    expect(event.getTask()).toBe(instance(task));
    expect(event.getSummary()).toBe('Superkaiser development');
  });

  it('testUpdate', () => {
    const user = mock(User);
    const project = mock(Project);
    const project2 = mock(Project);
    const task = mock(Task);
    const task2 = mock(Task);

    const event = new Event(
      EventType.MISSION,
      instance(user),
      100,
      '2019-12-12',
      true,
      instance(project),
      instance(task),
      'Superkaiser development'
    );
    event.update(
      EventType.DOJO,
      75,
      false,
      instance(project2),
      instance(task2),
      'Superkaiser'
    );

    expect(event.getId()).toBe(undefined);
    expect(event.getType()).toBe(EventType.DOJO);
    expect(event.getUser()).toBe(instance(user));
    expect(event.getTime()).toBe(75);
    expect(event.isBillable()).toBe(false);
    expect(event.getDate()).toBe('2019-12-12');
    expect(event.getProject()).toBe(instance(project2));
    expect(event.getTask()).toBe(instance(task2));
    expect(event.getSummary()).toBe('Superkaiser');
  });
});
