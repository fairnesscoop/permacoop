import { IQuery } from 'src/Application/IQuery';

export class GetUserAdministrativeByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
