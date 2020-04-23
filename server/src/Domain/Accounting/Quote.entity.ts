import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Customer} from '../Customer/Customer.entity';
import {Project} from '../Project/Project.entity';
import {User} from '../User/User.entity';

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

  @Column('enum', {enum: QuoteStatus, nullable: false})
  private status: QuoteStatus;

  @Column({type: 'varchar', nullable: false, unique: true})
  private quoteId: string;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  private createdAt: Date;

  @ManyToOne(type => User, {nullable: false})
  private owner: User;

  @ManyToOne(type => Customer, {nullable: false})
  private customer: Customer;

  @ManyToOne(type => Project, {nullable: true})
  private project: Project;

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
}
