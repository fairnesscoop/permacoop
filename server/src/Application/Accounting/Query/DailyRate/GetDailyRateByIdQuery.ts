import {IQuery} from 'src/Application/IQuery';

export class GetDailyRateByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
