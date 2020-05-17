import {IQuery} from 'src/Application/IQuery';

export class GetDailyRatesQuery implements IQuery {
  constructor(public readonly page: number) {}
}
