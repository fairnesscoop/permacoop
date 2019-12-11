import {client as axios} from '../../../utils/axios';
import {Customer} from '../models/Customer';

export class CustomerRepository {
  public static async findCustomers(): Promise<Customer[]> {
    const response = await axios.get('customers');
    const customers: Customer[] = [];

    for (const {id, name} of response.data) {
      customers.push(new Customer(id, name));
    }

    return customers;
  }

  public static async save(payload: Customer): Promise<Customer> {
    let response;

    if (payload.id) {
      response = await axios.put(`customers/${payload.id}`, payload);
    } else {
      response = await axios.post('customers', payload);
    }

    const {id, name} = response.data;

    return new Customer(id, name);
  }
}
