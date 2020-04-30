import CustomersInput from './CustomersInput.svelte';
import {render, fireEvent} from '@testing-library/svelte';

it('renders the customers input select with the selected customer', async () => {
  const customerId = 12;
  const customers = [
    {id: 12, name: 'Customer 1'},
    {id: 1, name: 'Customer 2'}
  ];
  const {container} = render(CustomersInput, {customerId, customers});

  expect(container.querySelector('#customerId').value).toBe('12');
});

it('renders the customers input select, on change other customer selected', async () => {
  const customerId = 12;
  const customers = [
    {id: 12, name: 'Customer 1'},
    {id: 1, name: 'Customer 2'}
  ];
  const {container} = render(CustomersInput, {customerId, customers});

  // Switch to "customer 2"
  fireEvent.change(container.querySelector('#customerId'), {
    target: {value: 1}
  });

  expect(container.querySelector('#customerId').value).toBe('1');
});
