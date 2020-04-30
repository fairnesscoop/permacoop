import TasksInput from './TasksInput.svelte';
import {render, fireEvent} from '@testing-library/svelte';

it('renders the taks input select with the selected task', async () => {
  const taskId = 12;
  const tasks = [
    {id: 12, name: 'Customer 1'},
    {id: 1, name: 'Customer 2'}
  ];
  const {container} = render(TasksInput, {taskId, tasks});

  expect(container.querySelector('#taskId').value).toBe('12');
});

it('renders the customers input select, on change other task selected', async () => {
  const taskId = 12;
  const tasks = [
    {id: 12, name: 'task 1'},
    {id: 1, name: 'Customer 2'}
  ];
  const {container} = render(TasksInput, {taskId, tasks});

  // Switch to "task 2"
  fireEvent.change(container.querySelector('#taskId'), {
    target: {value: 1}
  });

  expect(container.querySelector('#taskId').value).toBe('1');
});
