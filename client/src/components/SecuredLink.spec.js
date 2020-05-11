import SecuredLink from './SecuredLink.svelte';
import {screen, render} from '@testing-library/svelte';
import {
  ROLE_COOPERATOR,
  ROLE_EMPLOYEE,
  ROLE_ACCOUNTANT
} from '../constants/roles';
import {user} from '../store';

beforeEach(() => {
  jest.resetModules(); // this is important - it clears the cache
  process.browser = true;
});

it('renders the secured link for authorized user', () => {
  user.set({
    firstName: 'Nicolas',
    lastName: 'Dievart',
    id: 12,
    role: ROLE_COOPERATOR
  });

  const className = 'link';
  const href = 'https://fairness.coop/';
  const roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];

  render(SecuredLink, {
    href,
    className,
    roles
  });

  const link = screen.getByRole('link');
  expect(link.href).toBe(href);
  expect(link.classList.contains('link')).toBe(true);
});

it('renders nothing for non-authorized user', () => {
  user.set({
    firstName: 'Nicolas',
    lastName: 'Dievart',
    id: 12,
    role: ROLE_ACCOUNTANT
  });

  const className = 'link';
  const href = 'https://fairness.coop/';
  const roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];

  render(SecuredLink, {
    href,
    className,
    roles
  });

  expect(screen.queryByRole('link')).toBeNull();
});
