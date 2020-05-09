import '@testing-library/jest-dom/extend-expect';
import Footer from './Footer.svelte';
import {screen, render} from '@testing-library/svelte';

it('renders the footer', async () => {
  render(Footer);

  const currentYear = new Date().getFullYear();
  const footerText = `Copyright © ${currentYear}`;
  expect(screen.getByText(footerText)).toBeInTheDocument();
});
