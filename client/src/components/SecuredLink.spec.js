import SecuredLink from './SecuredLink.svelte';
import {render} from '@testing-library/svelte';
import {user} from '../store';

beforeEach(() => {
  jest.resetModules(); // this is important - it clears the cache
  process.browser = true;
});

it('renders the secured link for authorized user', async () => {
  user.set({
    firstName: 'Nicolas',
    lastName: 'Dievart',
    id: 12,
    role: 'cooperator'
  });

  const className = 'link';
  const href = 'https://fairness.coop/';
  const roles = ['cooperator', 'employee'];

  const {container} = render(SecuredLink, {
    href,
    className,
    roles
  });

  const link = container.querySelector('a');
  expect(link.href).toBe(href);
  expect(link.classList.contains('link')).toBe(true);
});

it('renders nothing for non-authorized user', async () => {
  user.set({
    firstName: 'Nicolas',
    lastName: 'Dievart',
    id: 12,
    role: 'accountant'
  });

  const className = 'link';
  const href = 'https://fairness.coop/';
  const roles = ['cooperator', 'employee'];

  const {container} = render(SecuredLink, {
    href,
    className,
    roles
  });

  const link = container.querySelector('a');
  expect(link).toBeNull();
});
