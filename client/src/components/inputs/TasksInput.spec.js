import { fireEvent, render, screen } from '@testing-library/svelte';
import TasksInput from './TasksInput.svelte';

it('renders the taks input select with the selected task', () => {
  const taskId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const tasks = [
    { id: '8a1dd502-c974-447e-9be3-a18e7abfebe3', name: 'Task 1' },
    { id: '14900cf1-49b1-4410-81d4-0c31086c7e6d', name: 'Task 2' },
  ];
  render(TasksInput, { taskId, tasks });

  const select = screen.getByRole('combobox');
  expect(select.value).toBe('8a1dd502-c974-447e-9be3-a18e7abfebe3');

  const options = screen.getAllByRole('option');
  const optionNames = options.map((option) => option.textContent.trim());
  expect(optionNames).toMatchInlineSnapshot(`
  Array [
    "-- Choisir une mission --",
    "Task 1",
    "Task 2",
  ]
`);
});

it('renders the customers input select, on change other task selected', () => {
  const taskId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const tasks = [
    { id: '8a1dd502-c974-447e-9be3-a18e7abfebe3', name: 'Task 1' },
    { id: '14900cf1-49b1-4410-81d4-0c31086c7e6d', name: 'Task 2' },
  ];
  render(TasksInput, { taskId, tasks });
  const select = screen.getByRole('combobox');

  // Switch to "task 2"
  fireEvent.change(select, {
    target: { value: '14900cf1-49b1-4410-81d4-0c31086c7e6d' },
  });

  expect(select.value).toBe('14900cf1-49b1-4410-81d4-0c31086c7e6d');
});
