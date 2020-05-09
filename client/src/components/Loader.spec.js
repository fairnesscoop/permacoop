import '@testing-library/jest-dom/extend-expect';
import {screen, render} from '@testing-library/svelte';
import Loader from './Loader.svelte';

it('renders nothing when not loading footer', async () => {
  render(Loader, {loading: false});

  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

it('renders loader on loading', async () => {
  render(Loader, {loading: true});

  expect(screen.getByRole('status')).toBeInTheDocument();
});
