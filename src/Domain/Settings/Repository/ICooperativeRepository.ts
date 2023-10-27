import { Cooperative } from '../Cooperative.entity';

export interface ICooperativeRepository {
  find(): Promise<Cooperative>;
}
