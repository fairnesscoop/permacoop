import { IQuery } from 'src/Application/IQuery';

export class GetUsersElementsQuery implements IQuery {
  constructor(public readonly date: Date) {}
}
