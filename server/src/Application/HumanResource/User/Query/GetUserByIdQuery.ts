import { IQuery } from 'src/Application/IQuery';

export class GetUserByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
