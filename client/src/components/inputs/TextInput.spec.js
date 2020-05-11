import '@testing-library/jest-dom/extend-expect';
import {screen, render} from '@testing-library/svelte';
import TextInput from './TextInput.svelte';

it('renders a text input.', () => {
  const value = 'abc';
  const label = 'my text input';
  render(TextInput, {value, label});

  expect(
    screen.getByRole('textbox', {name: /my text input/i})
  ).toBeInTheDocument();
});
