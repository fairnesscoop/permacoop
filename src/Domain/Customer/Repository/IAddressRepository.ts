import { Address } from '../Address.entity';

export interface IAddressRepository {
  save(address: Address): Promise<Address>;
}
