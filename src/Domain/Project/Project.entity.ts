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

  @Column('enum', { enum: InvoiceUnits, nullable: false })
  private invoiceUnit: InvoiceUnits;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @Column({ type: 'boolean', nullable: false, default: true })
  private active: boolean;

  @ManyToOne(type => Customer, { nullable: false, onDelete: 'CASCADE' })
  private customer: Customer;

  constructor(
    name: string,
    invoiceUnit: InvoiceUnits,
    active: boolean,
    customer: Customer
  ) {
    this.name = name;
    this.invoiceUnit = invoiceUnit;
    this.customer = customer;
    this.active = active;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
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

  public isActive(): boolean {
    return this.active;
  }

  public update(
    customer: Customer,
    invoiceUnit: InvoiceUnits,
    name: string,
    active: boolean
  ): void {
    this.customer = customer;
    this.invoiceUnit = invoiceUnit;
    this.name = name;
    this.active = active;
  }
}
