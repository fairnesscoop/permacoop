import TasksInput from './TasksInput.svelte';
import {render, fireEvent} from '@testing-library/svelte';

it('renders the taks input select with the selected task', async () => {
  const taskId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const tasks = [
    {id: '8a1dd502-c974-447e-9be3-a18e7abfebe3', name: 'Task 1'},
    {id: '14900cf1-49b1-4410-81d4-0c31086c7e6d', name: 'Task 2'}
  ];
  const {container} = render(TasksInput, {taskId, tasks});

  expect(container.querySelector('#taskId').value).toBe(
    '8a1dd502-c974-447e-9be3-a18e7abfebe3'
  );
});

it('renders the customers input select, on change other task selected', async () => {
  const taskId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const tasks = [
    {id: '8a1dd502-c974-447e-9be3-a18e7abfebe3', name: 'Task 1'},
    {id: '14900cf1-49b1-4410-81d4-0c31086c7e6d', name: 'Task 2'}
  ];
  const {container} = render(TasksInput, {taskId, tasks});

  // Switch to "task 2"
  fireEvent.change(container.querySelector('#taskId'), {
    target: {value: '14900cf1-49b1-4410-81d4-0c31086c7e6d'}
  });

  expect(container.querySelector('#taskId').value).toBe(
    '14900cf1-49b1-4410-81d4-0c31086c7e6d'
  );
});
