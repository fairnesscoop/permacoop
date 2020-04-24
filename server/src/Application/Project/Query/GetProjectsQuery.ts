import {IQuery} from 'src/Application/IQuery';

export class GetProjectsQuery implements IQuery {
  constructor(public readonly customerId?: string) {}
}
