import {IQuery} from './IQuery';

export interface IQueryBus {
  execute(query: IQuery): Promise<any>;
}
