import {Task} from './Task.entity';

describe('Task.entity', () => {
  it('testGetters', () => {
    const task = new Task('Development');
    expect(task.getName()).toBe('Development');
  });
});
