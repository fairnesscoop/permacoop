import Breadcrumb from './Breadcrumb.svelte';
import { screen, render } from '@testing-library/svelte';

it('renders the breadcrumb', () => {
  const items = [
    { path: '/fairness', title: 'Fairness' },
    { title: 'Anything' },
  ];
  render(Breadcrumb, { items });

  // Check that current page is the one without path.
  const listItems = screen.getAllByRole('listitem');
  // needs to be trim because of whitespace from listitem and if...
  const listItemNames = listItems.map((li) => li.textContent.trim());

  expect(listItems).toHaveLength(3);
  expect(listItemNames).toMatchInlineSnapshot(`
  Array [
    "Permacoop",
    "Fairness",
    "Anything",
  ]
`);

  // Check that active item is "Anything".
  expect(screen.getByText(/anything/i).classList.contains('active')).toBe(true);
});
