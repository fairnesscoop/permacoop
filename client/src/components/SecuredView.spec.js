import SecuredView from './SecuredView.svelte';
import {render} from '@testing-library/svelte';
import {user} from '../store';

beforeEach(() => {
  jest.resetModules();
  process.browser = true;
});

it('renders the secured view for non-authorized user', async () => {
  user.set({
    role: 'anonymous'
  });

  const roles = ['admin', 'user'];

  const {getByText} = render(SecuredView, {
    roles
  });

  expect(getByText('Accès interdit !')).not.toBeNull();
});

it('renders nothing for authorized user', async () => {
  user.set({
    role: 'admin'
  });

  const roles = ['admin', 'user'];

  const {queryByText} = render(SecuredView, {
    roles
  });

  expect(queryByText('Accès interdit !')).toBeNull();
});
