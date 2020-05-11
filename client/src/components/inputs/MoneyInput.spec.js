import '@testing-library/jest-dom/extend-expect';
import {screen, render} from '@testing-library/svelte';
import MoneyInput from './MoneyInput.svelte';

it('renders a money input.', () => {
  const value = 'abc';
  const label = 'my money input';
  render(MoneyInput, {value, label});

  expect(
    screen.getByRole('spinbutton', {name: /my money input/i})
  ).toBeInTheDocument();
});
