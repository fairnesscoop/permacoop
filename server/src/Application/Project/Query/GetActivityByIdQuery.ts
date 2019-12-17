import {IQuery} from 'src/Application/IQuery';

export class GetActivityByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
