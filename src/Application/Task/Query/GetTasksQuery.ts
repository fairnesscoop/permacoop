import { IQuery } from 'src/Application/IQuery';

export class GetTasksQuery implements IQuery {
  constructor(public readonly page: number = 1) {}
}
