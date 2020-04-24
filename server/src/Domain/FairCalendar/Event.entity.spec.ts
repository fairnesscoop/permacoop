import {mock, instance} from 'ts-mockito';
import {Event, EventType} from './Event.entity';
import {User} from '../User/User.entity';
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
      instance(project),
      instance(task),
      'Superkaiser development'
    );

    expect(event.getType()).toBe(EventType.MISSION);
    expect(event.getUser()).toBe(instance(user));
    expect(event.getTime()).toBe(100);
    expect(event.getDate()).toBe('2019-12-12');
    expect(event.getProject()).toBe(instance(project));
    expect(event.getTask()).toBe(instance(task));
    expect(event.getSummary()).toBe('Superkaiser development');
  });
});
