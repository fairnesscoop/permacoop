import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {IAddressRepository} from 'src/Domain/Customer/Repository/IAddressRepository';
import {Address} from 'src/Domain/Customer/Address.entity';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @InjectRepository(Address)
    private readonly repository: Repository<Address>
  ) {}

  public save(address: Address): Promise<Address> {
    return this.repository.save(address);
  }
}
