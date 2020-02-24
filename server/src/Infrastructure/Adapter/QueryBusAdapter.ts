import {Injectable} from '@nestjs/common';
import {QueryBus} from '@nestjs/cqrs';
import {IQueryBus} from 'src/Application/IQueryBus';
import {IQuery} from 'src/Application/IQuery';

@Injectable()
export class QueryBusAdapter implements IQueryBus {
  constructor(private readonly queryBus: QueryBus) {}

  public execute(query: IQuery): Promise<any> {
    return this.queryBus.execute(query);
  }
}
