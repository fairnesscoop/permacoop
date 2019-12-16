import {IQuery} from 'src/Application/IQuery';

export class GetProjectByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
