import ServerErrors from './ServerErrors.svelte';
import {render, getByText} from '@testing-library/svelte';

it('renders nothing with no error.', async () => {
  const {queryByText} = render(ServerErrors, {errors: []});

  expect(queryByText('Une erreur est survenue !')).toBeNull();
});

it('renders the given errors', async () => {
  const errors = ['first error', 'second error'];
  const {getByText, queryByText, container} = render(ServerErrors, {errors});

  expect(queryByText('Une erreur est survenue !')).not.toBeNull();
  expect(container.querySelector('ul').childElementCount).toBe(2);
  expect(getByText('first error'));
  expect(getByText('second error'));
});
