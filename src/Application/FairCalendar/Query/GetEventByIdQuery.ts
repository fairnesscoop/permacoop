import { IQuery } from 'src/Application/IQuery';

export class GetEventByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
