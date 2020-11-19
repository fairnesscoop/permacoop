import { fireEvent, render, screen } from '@testing-library/svelte';
import ProjectsInput from './ProjectsInput.svelte';

it('renders the projects input select with the selected project', () => {
  const projectId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const projects = [
    {
      id: '8a1dd502-c974-447e-9be3-a18e7abfebe3',
      name: 'Project 1',
      customer: { name: 'Customer 1' },
    },
    {
      id: '14900cf1-49b1-4410-81d4-0c31086c7e6d',
      name: 'Project 2',
      customer: { name: 'Customer 2' },
    },
  ];
  render(ProjectsInput, { projectId, projects });

  const select = screen.getByRole('combobox');
  const options = screen.getAllByRole('option');
  expect(select.value).toBe('8a1dd502-c974-447e-9be3-a18e7abfebe3');
  expect(options[select.selectedIndex].textContent).toContain(
    'Project 1 (Customer 1)'
  );
});

it('renders the projects input select, on change other project selected', () => {
  const projectId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const projects = [
    {
      id: '8a1dd502-c974-447e-9be3-a18e7abfebe3',
      name: 'Project 1',
      customer: { name: 'Customer 1' },
    },
    {
      id: '14900cf1-49b1-4410-81d4-0c31086c7e6d',
      name: 'Project 2',
      customer: { name: 'Customer 2' },
    },
  ];
  render(ProjectsInput, { projectId, projects });
  const select = screen.getByRole('combobox');

  // Switch to "Project 2"
  fireEvent.change(select, {
    target: { value: '14900cf1-49b1-4410-81d4-0c31086c7e6d' },
  });

  expect(select.value).toBe('14900cf1-49b1-4410-81d4-0c31086c7e6d');
});
