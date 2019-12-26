import {ICustomer} from '../../customer/models/ICustomer';

export interface IProject {
  id: string;
  name: string;
  customer?: ICustomer;
}
