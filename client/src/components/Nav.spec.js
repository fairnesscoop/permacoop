import Nav from './Nav.svelte';
import {render, fireEvent} from '@testing-library/svelte';
import {user} from '../store';
import {tick} from 'svelte';
import {get} from 'svelte/store';
import {TokenStorage} from '../utils/tokenStorage';
jest.mock('../utils/tokenStorage');

beforeEach(() => {
  jest.resetModules();
  process.browser = true;
  TokenStorage.mockClear();
});

it('renders the nav for the accounting user', async () => {
  user.set({
    id: 12,
    firstName: 'Boaty',
    lastName: 'Mcboatface',
    role: 'accounting'
  });

  const {queryByText} = render(Nav, {
    segment: 'accounting'
  });

  expect(queryByText('Comptabilité')).not.toBeNull();
  expect(queryByText('Boaty Mcboatface')).not.toBeNull();
  expect(queryByText('Devis')).toBeNull();
  expect(queryByText('TJM')).toBeNull();
});

it('renders the nav for the cooperator user', async () => {
  user.set({
    id: 12,
    firstName: 'Boaty',
    lastName: 'Mcboatface',
    role: 'cooperator'
  });

  const {queryByText} = render(Nav, {
    segment: 'customers'
  });

  expect(queryByText('Comptabilité')).not.toBeNull();
  expect(queryByText('Boaty Mcboatface')).not.toBeNull();
  expect(queryByText('Devis')).not.toBeNull();
  expect(queryByText('TJM')).not.toBeNull();
});

it('renders the nav and handle logout', async () => {
  user.set({
    id: 12,
    firstName: 'Boaty',
    lastName: 'Mcboatface',
    role: 'cooperator'
  });

  const {container} = render(Nav, {
    segment: 'customers'
  });

  fireEvent.click(container.querySelector('[data-logout-button]'), {});
  await tick();

  expect(get(user)).toBeNull();
  expect(TokenStorage.remove).toHaveBeenCalledTimes(1);
});
