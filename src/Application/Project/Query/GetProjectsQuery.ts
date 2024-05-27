import { IQuery } from 'src/Application/IQuery';

export class GetProjectsQuery implements IQuery {
  constructor(
    public readonly page: number | null,
    public readonly activeOnly = true,
    public readonly customerId?: string
  ) {}
}
