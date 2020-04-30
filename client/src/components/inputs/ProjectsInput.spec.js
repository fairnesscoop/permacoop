import ProjectsInput from './ProjectsInput.svelte';
import {render, fireEvent} from '@testing-library/svelte';

it('renders the projects input select with the selected project', async () => {
  const projectId = 12;
  const projects = [
    {id: 12, name: 'Project 1', customer: {name: 'Customer 1'}},
    {id: 1, name: 'Project 2', customer: {name: 'Customer 2'}}
  ];
  const {container} = render(ProjectsInput, {projectId, projects});

  const select = container.querySelector('#projectId');
  expect(select.value).toBe('12');
  expect(select.options[select.selectedIndex].innerHTML).toContain(
    'Project 1 (Customer 1)'
  );
});

it('renders the projects input select, on change other project selected', async () => {
  const projectId = 12;
  const projects = [
    {id: 12, name: 'Project 1', customer: {name: 'Customer 1'}},
    {id: 1, name: 'Project 2', customer: {name: 'Customer 2'}}
  ];
  const {container} = render(ProjectsInput, {projectId, projects});

  // Switch to "Project 2"
  fireEvent.change(container.querySelector('#projectId'), {
    target: {value: 1}
  });

  expect(container.querySelector('#projectId').value).toBe('1');
});
