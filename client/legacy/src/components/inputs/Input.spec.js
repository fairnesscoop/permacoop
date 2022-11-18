import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/svelte';
import Input from './Input.svelte';

it('renders an email input.', () => {
  const value = 'abc';
  const label = 'my email input';
  const type = 'email';

  render(Input, { value, label, type });

  expect(
    screen.getByRole('textbox', { name: /my email input/i })
  ).toBeInTheDocument();
});
