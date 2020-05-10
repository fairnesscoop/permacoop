import '@testing-library/jest-dom/extend-expect';
import {screen, render} from '@testing-library/svelte';
import SecuredView from './SecuredView.svelte';
import {
  ROLE_COOPERATOR,
  ROLE_EMPLOYEE,
  ROLE_ACCOUNTANT
} from '../constants/roles';
import {user} from '../store';

beforeEach(() => {
  jest.resetModules();
  process.browser = true;
});

it('renders the secured view for non-authorized user', () => {
  user.set({
    role: ROLE_ACCOUNTANT
  });

  const roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];

  render(SecuredView, {
    roles
  });

  expect(screen.getByText(/Accès interdit !/i)).toBeInTheDocument();
});

it('renders nothing for authorized user', () => {
  user.set({
    role: ROLE_COOPERATOR
  });

  const roles = [ROLE_COOPERATOR, ROLE_EMPLOYEE];

  render(SecuredView, {
    roles
  });

  expect(screen.queryByText(/Accès interdit !/i)).not.toBeInTheDocument();
});
