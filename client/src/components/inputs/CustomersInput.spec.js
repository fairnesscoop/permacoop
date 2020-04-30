import CustomersInput from './CustomersInput.svelte';
import {render, fireEvent} from '@testing-library/svelte';

it('renders the customers input select with the selected customer', async () => {
  const customerId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const customers = [
    {id: '8a1dd502-c974-447e-9be3-a18e7abfebe3', name: 'Customer 1'},
    {id: '14900cf1-49b1-4410-81d4-0c31086c7e6d', name: 'Customer 2'}
  ];
  const {container} = render(CustomersInput, {customerId, customers});

  expect(container.querySelector('#customerId').value).toBe(
    '8a1dd502-c974-447e-9be3-a18e7abfebe3'
  );
});

it('renders the customers input select, on change other customer selected', async () => {
  const customerId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const customers = [
    {id: '8a1dd502-c974-447e-9be3-a18e7abfebe3', name: 'Customer 1'},
    {id: '14900cf1-49b1-4410-81d4-0c31086c7e6d', name: 'Customer 2'}
  ];
  const {container} = render(CustomersInput, {customerId, customers});

  // Switch to "customer 2"
  fireEvent.change(container.querySelector('#customerId'), {
    target: {value: '14900cf1-49b1-4410-81d4-0c31086c7e6d'}
  });

  expect(container.querySelector('#customerId').value).toBe(
    '14900cf1-49b1-4410-81d4-0c31086c7e6d'
  );
});
