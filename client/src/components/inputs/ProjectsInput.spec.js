import ProjectsInput from './ProjectsInput.svelte';
import {render, fireEvent} from '@testing-library/svelte';

it('renders the projects input select with the selected project', async () => {
  const projectId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const projects = [
    {
      id: '8a1dd502-c974-447e-9be3-a18e7abfebe3',
      name: 'Project 1',
      customer: {name: 'Customer 1'}
    },
    {
      id: '14900cf1-49b1-4410-81d4-0c31086c7e6d',
      name: 'Project 2',
      customer: {name: 'Customer 2'}
    }
  ];
  const {container} = render(ProjectsInput, {projectId, projects});

  const select = container.querySelector('#projectId');
  expect(select.value).toBe('8a1dd502-c974-447e-9be3-a18e7abfebe3');
  expect(select.options[select.selectedIndex].innerHTML).toContain(
    'Project 1 (Customer 1)'
  );
});

it('renders the projects input select, on change other project selected', async () => {
  const projectId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const projects = [
    {
      id: '8a1dd502-c974-447e-9be3-a18e7abfebe3',
      name: 'Project 1',
      customer: {name: 'Customer 1'}
    },
    {
      id: '14900cf1-49b1-4410-81d4-0c31086c7e6d',
      name: 'Project 2',
      customer: {name: 'Customer 2'}
    }
  ];
  const {container} = render(ProjectsInput, {projectId, projects});

  // Switch to "Project 2"
  fireEvent.change(container.querySelector('#projectId'), {
    target: {value: '14900cf1-49b1-4410-81d4-0c31086c7e6d'}
  });

  expect(container.querySelector('#projectId').value).toBe(
    '14900cf1-49b1-4410-81d4-0c31086c7e6d'
  );
});
