import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Customer } from '../Customer/Customer.entity';
import { Project } from '../Project/Project.entity';
import { User } from '../HumanResource/User/User.entity';
import { QuoteItem } from './QuoteItem.entity';

export enum QuoteStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  REFUSED = 'refused',
  ACCEPTED = 'accepted',
  CANCELED = 'canceled'
}

@Entity()
export class Quote {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column('enum', { enum: QuoteStatus, nullable: false })
  private status: QuoteStatus;

  @Column({ type: 'varchar', nullable: false, unique: true })
  private quoteId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  private createdAt: Date;

  @ManyToOne(type => User, { nullable: false })
  private owner: User;

  @ManyToOne(type => Customer, { nullable: false, onDelete: 'CASCADE' })
  private customer: Customer;

  @ManyToOne(type => Project, { nullable: true, onDelete: 'CASCADE' })
  private project: Project;

  @OneToMany(
    type => QuoteItem,
    quoteItem => quoteItem.quote
  )
  items: QuoteItem[];

  constructor(
    quoteId: string,
    status: QuoteStatus,
    owner: User,
    customer: Customer,
    project?: Project | null
  ) {
    this.quoteId = quoteId;
    this.status = status;
    this.owner = owner;
    this.customer = customer;
    this.project = project;
  }

  public getId(): string {
    return this.id;
  }

  public getQuoteId(): string {
    return this.quoteId;
  }

  public getStatus(): QuoteStatus {
    return this.status;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getProject(): Project | undefined {
    return this.project;
  }

  public getOwner(): User {
    return this.owner;
  }

  public getItems(): QuoteItem[] {
    return this.items;
  }
}
