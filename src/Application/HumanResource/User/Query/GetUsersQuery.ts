import { IQuery } from 'src/Application/IQuery';

export class GetUsersQuery implements IQuery {
  constructor(
    public readonly withAccountant: boolean = false,
    public readonly activeOnly: boolean = false
  ) {}
}
