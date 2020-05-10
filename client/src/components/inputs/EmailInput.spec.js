import '@testing-library/jest-dom/extend-expect';
import {screen, render} from '@testing-library/svelte';
import EmailInput from './EmailInput.svelte';

it('renders an email input.', () => {
  const value = 'abc';
  const label = 'my email input';
  render(EmailInput, {value, label});

  expect(
    screen.getByRole('textbox', {name: /my email input/i})
  ).toBeInTheDocument();
});
