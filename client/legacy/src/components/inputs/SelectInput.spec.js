import '@testing-library/jest-dom/extend-expect';
import { screen, render } from '@testing-library/svelte';
import SelectInput from './SelectInput.svelte';

it('renders a select', () => {
  const value = 'abc';
  const label = 'label';
  render(SelectInput, { value, label });

  expect(screen.getByRole('combobox')).toBeInTheDocument();
});
