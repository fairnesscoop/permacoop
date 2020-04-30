import UsersInput from './UsersInput.svelte';
import {render, fireEvent} from '@testing-library/svelte';

it('renders the users input select with the selected user', async () => {
  const userId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const users = [
    {
      id: '8a1dd502-c974-447e-9be3-a18e7abfebe3',
      firstName: 'Nicolas',
      lastName: 'Dievart'
    },
    {
      id: '14900cf1-49b1-4410-81d4-0c31086c7e6d',
      firstName: 'Mathieu',
      lastName: 'Marchois'
    }
  ];
  const {container} = render(UsersInput, {userId, users});

  expect(container.querySelector('#userId').value).toBe(
    '8a1dd502-c974-447e-9be3-a18e7abfebe3'
  );
});

it('renders the users input select, on change other user selected', async () => {
  const userId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const users = [
    {
      id: '8a1dd502-c974-447e-9be3-a18e7abfebe3',
      firstName: 'Nicolas',
      lastName: 'Dievart'
    },
    {
      id: '14900cf1-49b1-4410-81d4-0c31086c7e6d',
      firstName: 'Mathieu',
      lastName: 'Marchois'
    }
  ];
  const {container} = render(UsersInput, {userId, users});

  // Switch to "mathieu"
  fireEvent.change(container.querySelector('#userId'), {
    target: {value: '14900cf1-49b1-4410-81d4-0c31086c7e6d'}
  });

  expect(container.querySelector('#userId').value).toBe(
    '14900cf1-49b1-4410-81d4-0c31086c7e6d'
  );
});
