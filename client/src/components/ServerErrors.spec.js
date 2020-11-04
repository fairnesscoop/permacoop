import '@testing-library/jest-dom/extend-expect';
import ServerErrors from './ServerErrors.svelte';
import { screen, render } from '@testing-library/svelte';

it('renders nothing with no error.', () => {
  render(ServerErrors, { errors: [] });

  expect(screen.queryByText('Erreur')).not.toBeInTheDocument();
});

it('renders the given errors', () => {
  const errors = ['first error', 'second error'];
  render(ServerErrors, { errors });

  const listItems = screen.getAllByRole('listitem');
  const listItemErrors = listItems.map((item) => item.textContent);
  expect(listItems).toHaveLength(2);
  expect(listItemErrors).toMatchInlineSnapshot(`
  Array [
    "first error",
    "second error",
  ]
`);
  expect(screen.getByText(/Erreur/i)).toBeInTheDocument();
});
