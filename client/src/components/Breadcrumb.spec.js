import Breadcrumb from './Breadcrumb.svelte';
import {render} from '@testing-library/svelte';

it('renders the breadcrumb', async () => {
  const items = [{path: '/fairness', title: 'Fairness'}, {title: 'Anything'}];
  const {container} = render(Breadcrumb, {items});

  const breadcrumb = container.querySelector('.breadcrumb');
  expect(breadcrumb.childElementCount).toBe(3);
  expect(breadcrumb.querySelector('.active').innerHTML).toEqual('Anything');

  const list = container.querySelectorAll('.breadcrumb-item');
  expect(list[0].innerHTML).toEqual('<a href=".">Permacoop</a>');
  const secondElement = list[1].querySelector('a');
  expect(secondElement.href).toEqual('http://localhost/fairness');
  expect(secondElement.innerHTML).toEqual('Fairness');
  expect(list[2].innerHTML).toEqual('Anything');
});
