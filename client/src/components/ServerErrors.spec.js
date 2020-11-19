import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/svelte';
import { addMessages } from 'svelte-i18n';
import ServerErrors from './ServerErrors.svelte';

it('renders nothing with no error.', () => {
  render(ServerErrors, { errors: [] });

  expect(screen.queryByText('Erreur')).not.toBeInTheDocument();
});

it('renders the given errors', () => {
  addMessages('fr', {'first_error': 'Fichier non trouvé', 'second_error': 'Saisie invalide'});

  const errors = ['first_error', 'second_error'];
  render(ServerErrors, { errors });

  const listItems = screen.getAllByRole('listitem');
  const listItemErrors = listItems.map((item) => item.textContent);
  expect(listItems).toHaveLength(2);
  expect(listItemErrors).toMatchInlineSnapshot(`
  Array [
    "Fichier non trouvé",
    "Saisie invalide",
  ]
`);
  expect(screen.getByText(/Erreur/i)).toBeInTheDocument();
});
