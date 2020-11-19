import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Address } from '../Customer/Address.entity';

@Entity()
export class Cooperative {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private name: string;

  @Column({type: 'integer', nullable: false, default: 420, comment: 'Stored in minutes'})
  private dayDuration: number;

  @ManyToOne(type => Address, {nullable: false})
  private address: Address;

  constructor(name: string, dayDuration: number, address: Address) {
    this.name = name;
    this.dayDuration = dayDuration;
    this.address = address;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDayDuration(): number {
    return this.dayDuration;
  }

  public getAddress(): Address {
    return this.address;
  }
}
