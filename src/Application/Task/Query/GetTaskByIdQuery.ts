import { IQuery } from 'src/Application/IQuery';

export class GetTaskByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
