import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Address } from './Address.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', nullable: false })
  private name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @ManyToOne(type => Address, { nullable: true, onDelete: 'SET NULL' })
  private address: Address;

  constructor(name: string, address: Address) {
    this.name = name;
    this.address = address;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getAddress(): Address {
    return this.address;
  }

  public updateName(name: string): void {
    this.name = name;
  }
}
