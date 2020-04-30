import UsersInput from './UsersInput.svelte';
import {render, fireEvent} from '@testing-library/svelte';

it('renders the users input select with the selected user', async () => {
  const userId = 12;
  const users = [
    {id: 12, firstName: 'Nicolas', lastName: 'Dievart'},
    {id: 1, firstName: 'Mathieu', lastName: 'Marchois'}
  ];
  const {container} = render(UsersInput, {userId, users});

  expect(container.querySelector('#userId').value).toBe('12');
});

it('renders the users input select, on change other user selected', async () => {
  const userId = 12;
  const users = [
    {id: 12, firstName: 'Nicolas', lastName: 'Dievart'},
    {id: 1, firstName: 'Mathieu', lastName: 'Marchois'}
  ];
  const {container} = render(UsersInput, {userId, users});

  // Switch to "mathieu"
  fireEvent.change(container.querySelector('#userId'), {
    target: {value: 1}
  });

  expect(container.querySelector('#userId').value).toBe('1');
});
