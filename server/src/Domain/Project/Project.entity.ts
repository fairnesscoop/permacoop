import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Customer} from '../Customer/Customer.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private name: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  @ManyToOne(type => Customer, {nullable: false})
  private customer: Customer;

  constructor(name: string, customer: Customer) {
    this.name = name;
    this.customer = customer;
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

  public getCustomer(): Customer {
    return this.customer;
  }

  public updateCustomerAndName(customer: Customer, name: string): void {
    this.customer = customer;
    this.name = name;
  }
}
