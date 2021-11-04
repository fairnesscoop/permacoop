import { IQuery } from 'src/Application/IQuery';

export class GetContactByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
