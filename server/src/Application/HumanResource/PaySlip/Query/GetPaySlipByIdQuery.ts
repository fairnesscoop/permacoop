import {IQuery} from 'src/Application/IQuery';

export class GetPaySlipByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
