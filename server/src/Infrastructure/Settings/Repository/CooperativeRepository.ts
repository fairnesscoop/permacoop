import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICooperativeRepository } from 'src/Domain/Settings/Repository/ICooperativeRepository';
import { Cooperative } from 'src/Domain/Settings/Cooperative.entity';

@Injectable()
export class CooperativeRepository implements ICooperativeRepository {
  constructor(
    @InjectRepository(Cooperative)
    private readonly repository: Repository<Cooperative>
  ) {}

  public find(): Promise<Cooperative> {
    return this.repository
      .createQueryBuilder('cooperative')
      .select([
        'cooperative.dayDuration'
      ])
      .limit(1)
      .getOne();
  }
}
