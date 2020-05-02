import Loader from './Loader.svelte';
import {render} from '@testing-library/svelte';

it('renders nothing when not loading footer', async () => {
  const {queryByText} = render(Loader, {loading: false});

  expect(queryByText('Loading...')).toBeNull();
});
