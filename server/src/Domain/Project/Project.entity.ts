import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Customer } from '../Customer/Customer.entity';

export enum InvoiceUnits {
  DAY = 'day',
  HOUR = 'hour'
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', nullable: false })
  private name: string;

  @Column({
    type: 'integer',
    nullable: false,
    default: 420,
    comment: 'Stored in minutes'
  })
  private dayDuration: number;

  @Column('enum', { enum: InvoiceUnits, nullable: false })
  private invoiceUnit: InvoiceUnits;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @ManyToOne(type => Customer, { nullable: false, onDelete: 'CASCADE' })
  private customer: Customer;

  constructor(
    name: string,
    dayDuration: number,
    invoiceUnit: InvoiceUnits,
    customer: Customer
  ) {
    this.name = name;
    this.dayDuration = dayDuration;
    this.invoiceUnit = invoiceUnit;
    this.customer = customer;
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

  public getInvoiceUnit(): InvoiceUnits {
    return this.invoiceUnit;
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

  public update(
    customer: Customer,
    dayDuration: number,
    invoiceUnit: InvoiceUnits,
    name: string
  ): void {
    this.customer = customer;
    this.dayDuration = dayDuration;
    this.invoiceUnit = invoiceUnit;
    this.name = name;
  }
}
