import { IQuery } from 'src/Application/IQuery';

export class GetContactsQuery implements IQuery {
  constructor(public readonly page: number) {}
}
