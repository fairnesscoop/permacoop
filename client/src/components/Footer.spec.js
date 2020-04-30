import Footer from './Footer.svelte';
import {render} from '@testing-library/svelte';

it('renders the footer', async () => {
  const {container} = render(Footer);

  const currentYear = new Date().getFullYear();
  expect(container.querySelector('.navbar-text').innerHTML).toContain(
    currentYear
  );
});
