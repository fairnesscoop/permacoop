import { IQuery } from 'src/Application/IQuery';

export class GetQuotesQuery implements IQuery {
  constructor(public readonly page: number) {}
}
