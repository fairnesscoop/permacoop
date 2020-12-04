import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { InvoiceUnits, Project } from '../Project/Project.entity';
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
  private invoiceId: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: string;

  @Column({type: 'timestamp'})
  private expiryDate: string;

  @ManyToOne(type => User, {nullable: true, onDelete: 'SET NULL'})
  private owner: User;

  @ManyToOne(type => Quote, {nullable: true, onDelete: 'SET NULL'})
  private quote: Quote;

  @ManyToOne(type => Project, {nullable: true, onDelete: 'SET NULL'})
  private project: Project;

  @OneToMany(
    type => InvoiceItem,
    invoiceItem => invoiceItem.invoice,
  )
  items: InvoiceItem[];

  constructor(
    invoiceId: string,
    status: InvoiceStatus,
    expiryDate: string,
    owner: User,
    project: Project
  ) {
    this.invoiceId = invoiceId;
    this.status = status;
    this.expiryDate = expiryDate;
    this.owner = owner;
    this.project = project;
  }

  public getId(): string {
    return this.id;
  }

  public getInvoiceId(): string {
    return this.invoiceId;
  }

  public getExpiryDate(): string {
    return this.expiryDate;
  }

  public getStatus(): InvoiceStatus {
    return this.status;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getProject(): Project {
    return this.project;
  }

  public getOwner(): User {
    return this.owner;
  }

  public getQuote(): Quote | undefined {
    return this.quote;
  }

  public getItems(): InvoiceItem[] {
    return this.items;
  }
}
