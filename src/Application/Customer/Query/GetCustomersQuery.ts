import { IQuery } from 'src/Application/IQuery';

export class GetCustomersQuery implements IQuery {
  constructor(public readonly page: number | null) {}
}
