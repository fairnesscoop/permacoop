import {Customer} from '../models/Customer';

export class CustomerFactory {
  public static create(payload: any): Customer {
    return new Customer(payload.id, payload.name);
  }
}
