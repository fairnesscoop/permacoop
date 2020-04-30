import SecuredView from './SecuredView.svelte';
import {render} from '@testing-library/svelte';
import {user} from '../store';

beforeEach(() => {
  jest.resetModules();
  process.browser = true;
});

it('renders the secured view for non-authorized user', async () => {
  user.set({
    role: 'accountant'
  });

  const roles = ['cooperator', 'employee'];

  const {getByText} = render(SecuredView, {
    roles
  });

  expect(getByText('Accès interdit !')).not.toBeNull();
});

it('renders nothing for authorized user', async () => {
  user.set({
    role: 'cooperator'
  });

  const roles = ['cooperator', 'employee'];

  const {queryByText} = render(SecuredView, {
    roles
  });

  expect(queryByText('Accès interdit !')).toBeNull();
});
