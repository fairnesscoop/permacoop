import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from '../Customer/Customer.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({type: 'varchar', nullable: false})
  private name: string;

  @Column({type: 'integer', nullable: false, default: 420, comment: 'Stored in minutes'})
  private dayDuration: number;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  @ManyToOne(type => Customer, {nullable: false})
  private customer: Customer;

  constructor(name: string, dayDuration: number, customer: Customer) {
    this.name = name;
    this.dayDuration = dayDuration;
    this.customer = customer;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getDayDuration(): number
  {
    return this.dayDuration;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getFullName(): string {
    return `[${this.customer.getName()}] ${this.getName()}`;
  }

  public update(customer: Customer, dayDuration: number, name: string): void {
    this.customer = customer;
    this.dayDuration = dayDuration;
    this.name = name;
  }
}
