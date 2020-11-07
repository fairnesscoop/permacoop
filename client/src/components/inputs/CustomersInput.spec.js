import CustomersInput from './CustomersInput.svelte';
import { screen, render, fireEvent } from '@testing-library/svelte';

it('renders the customers input select with the selected customer', () => {
  const customerId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const customers = [
    { id: '8a1dd502-c974-447e-9be3-a18e7abfebe3', name: 'Customer 1' },
    { id: '14900cf1-49b1-4410-81d4-0c31086c7e6d', name: 'Customer 2' },
  ];
  render(CustomersInput, { customerId, customers });

  expect(screen.getByRole('combobox').value).toBe(
    '8a1dd502-c974-447e-9be3-a18e7abfebe3'
  );

  const options = screen.getAllByRole('option');
  const optionNames = options.map((option) => option.textContent.trim());
  expect(optionNames).toMatchInlineSnapshot(`
  Array [
    "-- Choisir un client --",
    "Customer 1",
    "Customer 2",
  ]
`);
});

it('renders the customers input select, on change other customer selected', () => {
  const customerId = '8a1dd502-c974-447e-9be3-a18e7abfebe3';
  const customers = [
    { id: '8a1dd502-c974-447e-9be3-a18e7abfebe3', name: 'Customer 1' },
    { id: '14900cf1-49b1-4410-81d4-0c31086c7e6d', name: 'Customer 2' },
  ];
  render(CustomersInput, { customerId, customers });

  const select = screen.getByRole('combobox');

  // Switch to "customer 2"
  fireEvent.change(select, {
    target: { value: '14900cf1-49b1-4410-81d4-0c31086c7e6d' },
  });

  expect(select.value).toBe('14900cf1-49b1-4410-81d4-0c31086c7e6d');
});
