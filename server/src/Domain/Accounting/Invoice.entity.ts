import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Customer } from '../Customer/Customer.entity';
import { User } from '../HumanResource/User/User.entity';
import { InvoiceItem } from './InvoiceItem.entity';
import { Quote } from './Quote.entity';

export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PAYED = 'payed',
  CANCELED = 'canceled'
}

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', {enum: InvoiceStatus, nullable: false})
  private status: InvoiceStatus;

  @Column({type: 'varchar', nullable: false, unique: true})
  private billingId: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  @Column({type: 'timestamp'})
  private expiryDate: string;

  @ManyToOne(type => User, {nullable: false})
  private owner: User;

  @ManyToOne(type => Quote, {nullable: true})
  private quote: Quote;

  @ManyToOne(type => Customer, {nullable: false})
  private customer: Customer;

  @OneToMany(
    type => InvoiceItem,
    billingItem => billingItem.billing
  )
  items: InvoiceItem[];

  constructor(
    billingId: string,
    status: InvoiceStatus,
    expiryDate: string,
    owner: User,
    customer: Customer,
    quote?: Quote
  ) {
    this.billingId = billingId;
    this.status = status;
    this.expiryDate = expiryDate;
    this.owner = owner;
    this.customer = customer;
    this.quote = quote;
  }

  public getId(): string {
    return this.id;
  }

  public getInvoiceId(): string {
    return this.billingId;
  }

  public getExpiryDate(): string {
    return this.expiryDate;
  }

  public getStatus(): InvoiceStatus {
    return this.status;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getOwner(): User {
    return this.owner;
  }

  public getQuote(): Quote | undefined {
    return this.quote;
  }
}
