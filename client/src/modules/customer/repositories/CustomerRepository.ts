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
}
