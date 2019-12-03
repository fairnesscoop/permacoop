import {IQuery} from 'src/Application/IQuery';

export class GetCustomerByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
