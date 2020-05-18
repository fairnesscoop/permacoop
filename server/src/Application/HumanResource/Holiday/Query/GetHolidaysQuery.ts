import {IQuery} from 'src/Application/IQuery';

export class GetHolidaysQuery implements IQuery {
  constructor(public readonly page: number) {}
}
