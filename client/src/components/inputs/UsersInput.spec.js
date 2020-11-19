import { fireEvent, render, screen } from '@testing-library/svelte';
import UsersInput from './UsersInput.svelte';

it('renders the users input select with the selected user', () => {
  const userId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const users = [
    {
      id: '8a1dd502-c974-447e-9be3-a18e7abfebe3',
      firstName: 'Nicolas',
      lastName: 'Dievart',
    },
    {
      id: '14900cf1-49b1-4410-81d4-0c31086c7e6d',
      firstName: 'Mathieu',
      lastName: 'Marchois',
    },
  ];
  render(UsersInput, { userId, users });

  const select = screen.getByRole('combobox');
  expect(select.value).toBe('8a1dd502-c974-447e-9be3-a18e7abfebe3');
  const options = screen.getAllByRole('option');
  const optionNames = options.map((option) => option.textContent.trim());
  expect(optionNames).toMatchInlineSnapshot(`
  Array [
    "-- Choisir un coopérateur - salarié --",
    "Nicolas Dievart",
    "Mathieu Marchois",
  ]
`);
});

it('renders the users input select, on change other user selected', () => {
  const userId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const users = [
    {
      id: '8a1dd502-c974-447e-9be3-a18e7abfebe3',
      firstName: 'Nicolas',
      lastName: 'Dievart',
    },
    {
      id: '14900cf1-49b1-4410-81d4-0c31086c7e6d',
      firstName: 'Mathieu',
      lastName: 'Marchois',
    },
  ];
  render(UsersInput, { userId, users });
  const select = screen.getByRole('combobox');

  // Switch to "mathieu"
  fireEvent.change(select, {
    target: { value: '14900cf1-49b1-4410-81d4-0c31086c7e6d' },
  });

  expect(select.value).toBe('14900cf1-49b1-4410-81d4-0c31086c7e6d');
});
