import {Injectable} from '@nestjs/common';
import {QueryBus} from '@nestjs/cqrs';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {IQuery} from 'src/Application/IQuery';

@Injectable()
export class QueryBusAdapter implements IQueryBusAdapter {
  constructor(private readonly queryBus: QueryBus) {}

  public execute(query: IQuery): Promise<any> {
    return this.queryBus.execute(query);
  }
}
