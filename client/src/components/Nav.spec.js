import Nav from './Nav.svelte';
import {screen, render, fireEvent} from '@testing-library/svelte';
import {user} from '../store';
import {tick} from 'svelte';
import {get} from 'svelte/store';
import {ROLE_COOPERATOR, ROLE_ACCOUNTANT} from '../constants/roles';
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
    role: ROLE_ACCOUNTANT
  });

  render(Nav, {
    segment: 'accounting'
  });

  expect(screen.queryByText('Gestion & Comptabilité')).not.toBeNull();
  expect(screen.queryByText('Boaty Mcboatface')).not.toBeNull();
  expect(screen.queryByText('Devis')).toBeNull();
  expect(screen.queryByText('TJM')).toBeNull();
});

it('renders the nav for the cooperator user', async () => {
  user.set({
    id: 12,
    firstName: 'Boaty',
    lastName: 'Mcboatface',
    role: ROLE_COOPERATOR
  });

  render(Nav, {
    segment: 'customers'
  });

  expect(screen.queryByText('Gestion & Comptabilité')).not.toBeNull();
  expect(screen.queryByText('Boaty Mcboatface')).not.toBeNull();
  expect(screen.queryByText('Devis')).not.toBeNull();
  expect(screen.queryByText('TJM')).not.toBeNull();
});

it('renders the nav and handle logout', async () => {
  user.set({
    id: 12,
    firstName: 'Boaty',
    lastName: 'Mcboatface',
    role: ROLE_COOPERATOR
  });

  render(Nav, {
    segment: 'customers'
  });

  fireEvent.click(screen.getByRole('link', {name: /Se déconnecter/i}), {});
  await tick();

  expect(get(user)).toBeNull();
  expect(TokenStorage.remove).toHaveBeenCalledTimes(1);
});
