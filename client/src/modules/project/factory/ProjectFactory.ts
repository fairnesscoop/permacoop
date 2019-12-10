import {Project} from '../models/Project';
import {Customer} from '../../customer/models/Customer';

export class ProjectFactory {
  public static create({id, name, customer}: any): Project {
    return new Project(id, name, new Customer(customer.id, customer.name));
  }
}
