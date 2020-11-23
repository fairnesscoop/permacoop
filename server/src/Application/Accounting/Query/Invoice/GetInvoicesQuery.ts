import { IQuery } from 'src/Application/IQuery';

export class GetInvoicesQuery implements IQuery {
  constructor(public readonly page: number) {}
}
