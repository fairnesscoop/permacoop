import { Task } from './Task.entity';

describe('Task.entity', () => {
  it('testGetters', () => {
    const task = new Task('Development');
    expect(task.getId()).toBe(undefined);
    expect(task.getName()).toBe('Development');
  });

  it('testUpdate', () => {
    const task = new Task('Development');
    task.updateName('Formation');

    expect(task.getId()).toBe(undefined);
    expect(task.getName()).toBe('Formation');
  });
});
